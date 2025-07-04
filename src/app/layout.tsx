import './globals.css';
import { Inconsolata } from 'next/font/google';
import type { Metadata } from 'next';
import Provider from './providers';
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
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={fnt.className}>
        <Provider>
          <Header />
          <Main>{children}</Main>
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
