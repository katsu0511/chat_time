import { getAuthSession } from '@/lib/getSession';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getAuthSession();

  if (!session) {
    return redirect('/login');
  }

  return (
    <div>
      <main className="h-screen">
        <div className="flex justify-center w-[1200px] h-full mx-auto my-0">
          <div className="chat_rooms w-3/10 h-full bg-white border-blue-500 border-x-4"></div>
          <div className="w-7/10 h-full">
            <div className="chat_screen bg-blue-100 w-full h-9/10"></div>
            <div className="w-full h-1/10">
              <input type="text" className="bg-white border-blue-500 border-2 px-2 py-1" />
              <input type="button" value="Send" className="relative bg-blue-500 text-white h-6 w-10 duration-300 hover:opacity-60 active:top-[1px] cursor-pointer" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
