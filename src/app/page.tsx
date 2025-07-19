import { getAuthSession } from '@/lib/getSession';
import { redirect } from 'next/navigation';
import Messages from '@/components/Messages';

export default async function Home() {
  const session = await getAuthSession();
  if (!session) return redirect('/login');
  return <Messages session={session} />;
}
