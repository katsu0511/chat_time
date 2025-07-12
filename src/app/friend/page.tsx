import { getAuthSession } from '@/lib/getSession';
import { redirect } from 'next/navigation';
import SearchUsers from '@/components/searchUsers';

export default async function Friend() {
  const session = await getAuthSession();
  if (!session) return redirect('/login');
  return <SearchUsers />;
}
