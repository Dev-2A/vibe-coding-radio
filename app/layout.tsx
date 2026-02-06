import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/src/components/layout/Header';
import Sidebar from '@/src/components/layout/Sidebar';
import StoreHydration from '@/src/components/layout/StoreHydration';
import PlayerBar from '@/src/components/music/PlayerBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Vibe Coding Radio',
  description: 'Pomodoro timer + music player for vibe coding sessions',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="dark">
      <body className={inter.className}>
        <StoreHydration />
        <Header />
        <Sidebar />
        <main className="pt-14 pl-16 min-h-screen pb-20">
          <div className="p-6">
            {children}
          </div>
        </main>
        <PlayerBar />
      </body>
    </html>
  );
}
