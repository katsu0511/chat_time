import './globals.css';
import { Inconsolata } from 'next/font/google';
import type { Metadata } from 'next';
import { getAuthSession } from '@/lib/getSession';
import Provider from './providers';
import { ThemeProviderWrapper } from '@/components/ThemeProviderWrapper';
import Header from '@/components/Header';
import Main from '@/components/Main';
import Footer from '@/components/Footer';

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
    <html lang='en' className='select-none' suppressHydrationWarning>
      <body className={fnt.className}>
        <Provider session={session}>
          <ThemeProviderWrapper>
            <Header />
            <Main>{children}</Main>
            <Footer />
          </ThemeProviderWrapper>
        </Provider>
      </body>
    </html>
  );
}
