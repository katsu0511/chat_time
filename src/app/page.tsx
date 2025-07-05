import { getAuthSession } from '@/lib/getSession';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getAuthSession();

  if (!session) {
    return redirect('/login');
  }

  return (
    <div className='flex w-full h-full border-blue-500 border-x-4'>
      <div className='w-3/10 h-full'></div>
      <div className='w-7/10 h-full'>
        <div className='bg-blue-100 w-full h-19/20'></div>
        <div className='flex w-full h-1/20'>
          <input type='text' className='block border-blue-400 border-2 w-9/10 h-full px-2 py-1 outline-none appearance-none' />
          <input type='button' className='block relative bg-blue-400 text-white w-1/10 h-full duration-300 hover:opacity-60 active:top-[2px] cursor-pointer' value='Send' />
        </div>
      </div>
    </div>
  );
}
