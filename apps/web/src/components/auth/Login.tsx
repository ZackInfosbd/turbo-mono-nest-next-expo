'use client';

import { useFormLogin } from '@repo/hooks/schemas';
import { signIn } from 'next-auth/react';

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormLogin();

  const onSubmitHandler = async (data: { email: string; password: string }) => {
    await signIn('credentials', {
      email: data.email,
      password: data.password,
      callbackUrl: '/',
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <label title="Email">
        <input {...register('email')} placeholder="Email" />
        <div className="text-red-400">{errors.email?.message}</div>
      </label>
      <label title="Password">
        <input {...register('password')} placeholder="*****" />
        <div className="text-red-400">{errors.password?.message}</div>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
