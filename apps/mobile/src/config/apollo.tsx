import React, { ReactNode } from 'react';
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider as Provider,
} from '@apollo/client';

export interface IApolloProviderProps {
  children: ReactNode;
}

// export const ApolloProvider = ({ children }: IApolloProviderProps) => {
//   const apolloClient = new ApolloClient({
//     uri: `http://localhost:3000/graphql`,
//     cache: new InMemoryCache(),
//   });

//   return <Provider client={apolloClient}>{children}</Provider>;
// };

const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: `http://localhost:3000/graphql`,
    headers: {
      // Add any custom headers if needed
    },
  }),
  cache: new InMemoryCache(),
});

export const ApolloProvider = ({ children }: IApolloProviderProps) => {
  return <Provider client={apolloClient}>{children}</Provider>;
};
