import './globals.css';
import { Inconsolata } from 'next/font/google';
import type { Metadata } from 'next';
import { getAuthSession } from '@/lib/getSession';
import Provider from './providers';
import Link from 'next/link';
import LogoutButton from '@/components/LogoutButton';
import FooterLink from '@/components/FooterLink';

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
    <html lang='en' suppressHydrationWarning>
      <body className={fnt.className}>
        <Provider>
          <header className='bg-blue-500 w-full h-10'>
            <div className='flex justify-between max-w-screen-xl w-full h-full px-4 mx-auto'>
              {session
                ? <Link href='/' className='text-white text-3xl font-bold leading-10 duration-300 hover:opacity-60'>Chat Time</Link>
                : <h1 className='text-white text-3xl font-bold leading-10'>Chat Time</h1>
              }
              {session && <LogoutButton />}
            </div>
          </header>
          <main className='w-full h-[calc(100dvh-80px)]'>
            <div className='max-w-screen-xl w-full h-full px-4 mx-auto'>
              {children}
            </div>
          </main>
          <footer className='bg-blue-500 w-full h-10'>
            {session
              ? <div className='flex justify-center max-w-screen-xl w-full h-full px-4 mx-auto'>
                  <FooterLink display='Chat' url='/'/>
                  <FooterLink display='Friends' url='/friends'/>
                  <FooterLink display='Settings' url='/settings'/>
                </div>
              : <div className='text-white text-xl max-w-screen-xl w-full h-full leading-10 text-center px-4 mx-auto'>&copy;Chat time</div>
            }
          </footer>
        </Provider>
      </body>
    </html>
  );
}
