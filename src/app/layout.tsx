import type { Metadata } from "next";
import { Inconsolata } from 'next/font/google';
import "./globals.css";

const fnt = Inconsolata({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Chat time",
  description: "App for chatting with friends",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fnt.className}>
        {children}
      </body>
    </html>
  );
}
