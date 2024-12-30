'use client';

import { useFormRegister } from '@repo/hooks/schemas';
import { signIn } from 'next-auth/react';
import { Label } from '../atoms/label';
import { Input } from '../atoms/input';
import { Button } from '../atoms/button';
import Link from 'next/link';
import { AuthLayout } from '../organisms/authLayout';

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormRegister();
  return (
    <AuthLayout title="Sign In">
      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit((data) => {
          console.log('data', data);
          signIn('credentials', {
            email: data.email,
            password: data.password,
            callbackUrl: '/',
          });
        })}
      >
        <Label title="Email">
          <Input {...register('email')} placeholder="Email" />
          <div className="text-red-300">{errors.email?.message} </div>
        </Label>
        <Label title="Password">
          <Input
            type="password"
            {...register('password')}
            placeholder="******"
          />
          <div className="text-red-300">{errors.password?.message} </div>
        </Label>

        <Button type="submit">Submit</Button>
      </form>
      <div className="flex flex-col items-center gap-2 my-6">
        <div>
          New to application?{' '}
          <Link href="/sign-up" className="font-semibold">
            Register.
          </Link>
        </div>
        <div className="h-[1px] bg-black/20 w-36 my-2" />
        <button
          onClick={() => {
            signIn('google', { callbackUrl: '/' });
          }}
          className="text-lg hover:shadow-lg transition-shadow flex items-center justify-center w-8 h-8 border border-[#ea4335] rounded-full"
        >
          G
        </button>
      </div>
    </AuthLayout>
  );
};
