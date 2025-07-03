import Link from 'next/link';
import LogoutButton from '@/components/LogoutButton';
import { getAuthSession } from '@/lib/getSession';
import type { Metadata } from 'next';
import { Inconsolata } from 'next/font/google';
import './globals.css';

const fnt = Inconsolata({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Chat time',
  description: 'App for chatting with friends',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getAuthSession();

  return (
    <html lang="en">
      <body className={fnt.className}>
        <header className="bg-blue-500 w-full h-10">
          <div className="flex justify-between w-[1200px] mx-auto my-0">
            {session
              ? <Link href="/" className="text-white text-3xl font-bold leading-10 duration-300 hover:opacity-60">Chat Time</Link>
              : <h1 className="text-white text-3xl font-bold leading-10">Chat Time</h1>
            }
            {session && <LogoutButton />}
          </div>
        </header>
        <main className="w-full h-[calc(100lvh-80px)]">
          <div className="w-[1200px] h-full mx-auto my-0">
            {children}
          </div>
        </main>
        <footer className="bg-blue-500 w-full h-10">
          <div className="flex justify-center w-[1200px] mx-auto my-0">
            <Link href="" className="block bg-white text-blue-500 border-blue-500 border-l-4 border-r-2 border-y-4 text-lg font-bold text-center h-10 w-50 duration-300 hover:bg-blue-500 hover:text-white">Chat</Link>
            <Link href="" className="block bg-white text-blue-500 border-blue-500 border-x-2 border-y-4 text-lg font-bold text-center h-10 w-50 duration-300 hover:bg-blue-500 hover:text-white">Friends</Link>
            <Link href="" className="block bg-white text-blue-500 border-blue-500 border-r-4 border-l-2 border-y-4 text-lg font-bold text-center h-10 w-50 duration-300 hover:bg-blue-500 hover:text-white">Settings</Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
