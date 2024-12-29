'use client';

import { useFormRegister } from '@repo/hooks/schemas';

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormRegister();

  return (
    <form
      onSubmit={handleSubmit(() => {
        alert('submitted');
      })}
    >
      <label title="name">
        Name
        <input
          className="border block px-2 py-1 rounded"
          {...register('name')}
          placeholder="Name"
        />
        <div className="text-red-400">{errors.name?.message}</div>
      </label>
      <label title="Email">
        Email
        <input
          className="border block px-2 py-1 rounded"
          {...register('email')}
          placeholder="Email"
        />
        <div className="text-red-400">{errors.email?.message}</div>
      </label>
      Password
      <label>
        <input
          className="border block px-2 py-1 rounded"
          title="Password"
          {...register('password')}
          placeholder="*****"
        />
        <div className="text-red-400">{errors.password?.message}</div>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
