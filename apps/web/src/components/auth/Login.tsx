'use client';

import { useFormLogin } from '@repo/hooks/schemas';

export const Login = () => {
  const { register, handleSubmit } = useFormLogin();

  return (
    <form
      onSubmit={handleSubmit((data) => {
        alert(data);
      })}
    ></form>
  );
};
