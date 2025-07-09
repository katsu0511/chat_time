import { getAuthSession } from '@/lib/getSession';
import { redirect } from 'next/navigation';
import SendMessage from '@/components/SendMessage';

export default async function Home() {
  const session = await getAuthSession();
  if (!session) return redirect('/login');

  return (
    <div className='flex w-full h-full border-blue-500 border-x-4'>
      <div className='w-3/10 h-full'></div>
      <div className='w-7/10 h-full'>
        <div className='bg-blue-100 w-full h-19/20'></div>
        <SendMessage />
      </div>
    </div>
  );
}
