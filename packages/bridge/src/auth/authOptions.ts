import { MAX_AGE } from '@repo/utility';
import { sign, verify } from 'jsonwebtoken';
import { getServerSession, NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { fetchGraphqlStatic } from '../fetch/fetch-config';
import {
  AuthProviderType,
  LoginDocument,
  RegisterWithProvidersDocument,
  UserDocument,
} from '../queries/generated';

export const authOptions: NextAuthOptions = {
  providers: [
    // Google Provider Configuration
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),

    // Credentials Provider Configuration
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { email, password } = credentials;
        if (!email || !password) {
          throw new Error('Email and password are required');
        }

        console.log('Lopg from authOption', email, password);

        const { data, error } = await fetchGraphqlStatic({
          document: LoginDocument,
          variables: { loginInput: { email, password } },
        });

        console.log('Lopg from authOption', data, error);

        if (!data?.login || error) {
          throw new Error(
            'Authentication failed: Invalid credentials or user not found',
          );
        }
        const user = data.login.user;

        console.log('Lopg from authOption', user);

        return {
          id: user.uid,
          name: user.name,
          image: user.image,
          email: user.email,
        };
      },
    }),
  ],
  debug: true,
  session: {
    strategy: 'jwt',
    maxAge: MAX_AGE,
  },

  jwt: {
    maxAge: MAX_AGE,
    encode({ token, secret }): string {
      if (!token) {
        throw new Error('Token is undefined');
      }
      const { uid, picture, ...tokenProps } = token;

      const nowInSeconds = Math.floor(Date.now() / 1000);
      const expirationTimestamp = nowInSeconds + MAX_AGE;

      return sign(
        {
          uid: uid,
          image: picture,
          ...tokenProps,
          exp: expirationTimestamp,
        },
        secret,
        { algorithm: 'HS256' },
      );
    },

    decode({ token, secret }): JWT | null {
      if (!token) {
        throw new Error('Token is undefined');
      }
      try {
        const decodedToken = verify(token, secret, {
          algorithms: ['HS256'],
        });

        return decodedToken as JWT;
      } catch (error) {
        return null;
      }
    },
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        const { id, name, image } = user;

        const existingUser = await fetchGraphqlStatic({
          document: UserDocument,
          variables: { where: { uid: id } },
        });

        if (!existingUser.data) {
          await fetchGraphqlStatic({
            document: RegisterWithProvidersDocument,
            variables: {
              registerWithProviderInput: {
                type: AuthProviderType.Google,
                uid: id,
                image,
                name,
              },
            },
          });
        }
      }

      return true;
    },

    session({ token, session }) {
      if (token) {
        session.user = {
          name: token.name,
          email: token.email,
          image: token.picture,
          uid: token.sub ?? '',
        };
      }

      return session;
    },
  },

  pages: {
    signIn: '/signIn',
  },
};

export const getAuth = async () => getServerSession(authOptions);
