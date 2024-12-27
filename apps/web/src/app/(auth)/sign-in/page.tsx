import { formatDate } from '@repo/utility';
import { Login } from 'src/components/auth/Login';

export default function SignIn() {
  const date = formatDate(new Date());

  return (
    <main>
      <h1>{`Signed in at - ${date}`}</h1>
      <Login />
    </main>
  );
}
