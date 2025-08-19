import { getAuthSession } from '@/lib/getSession';
import { redirect } from 'next/navigation';
import SearchUsers from '@/components/searchUsers';
import { getFriendIds } from '@/lib/getter';

export default async function Friend() {
  const session = await getAuthSession();
  if (!session) return redirect('/login');
  const friendIds = await getFriendIds(Number(session.user.id));
  return <SearchUsers session={session} friendIds={friendIds} />;
}
