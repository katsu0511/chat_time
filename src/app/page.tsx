import { getAuthSession } from '@/lib/getSession';
import { redirect } from 'next/navigation';
import { getFriends } from '@/lib/getter';
import SendMessage from '@/components/SendMessage';

export default async function Home() {
  const session = await getAuthSession();
  if (!session) return redirect('/login');

  const friendInfos = await getFriends(session.user.id as unknown as number);
  const friends: React.ReactNode[] = friendInfos.map(info => (
    <li key={info.id} className='w-full h-[96px]'>
      <button className='w-full h-full p-2 cursor-pointer duration-300 hover:bg-blue-300 hover:shadow-xl'>
        <p className='w-full h-1/2 text-2xl leading-[40px] text-left'>{info.name}</p>
        <p className='w-full h-1/2 text-lg leading-[40px] text-left'>{info.userId}</p>
      </button>
    </li>
  ));

  return (
    <div className='flex w-full h-full border-blue-500 border-x-4'>
      <div className='w-3/10 h-full'>
        <ul>{friends}</ul>
      </div>
      <div className='w-7/10 h-full'>
        <div className='bg-blue-100 w-full h-19/20'></div>
        <SendMessage />
      </div>
    </div>
  );
}
