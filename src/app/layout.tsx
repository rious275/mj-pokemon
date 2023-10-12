import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Provider from './Provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '포켓몬 도감',
  description: 'pokemon api를 기반으로한 포켓몬 도감',
  keywords: ['pokemon', 'pokemon dex', '포켓몬', '포켓몬 도감', '포켓몬 이름', '포켓몬 서식지'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
