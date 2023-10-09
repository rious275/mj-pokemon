import RecoilRootProvider from '@/libs/recoil/recoilRootProvider';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'mj-pokemon',
  description: 'Pokemon Encyclopedia',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="kor">
      <body className={inter.className}>
        <RecoilRootProvider>{children}</RecoilRootProvider>
      </body>
    </html>
  );
}
