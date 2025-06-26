import { getAuthSession } from '@/lib/getSession';
import { redirect } from 'next/navigation';
import LoginForm from '@/components/LoginForm';

export default async function Login() {
  const session = await getAuthSession();

  if (session) {
    redirect('/');
  }

  return (
    <div>
      <main className="login">
        <LoginForm />
      </main>
    </div>
  );
}
