'use client';

import { useState } from 'react';
import MusicSearch from '@/src/components/music/MusicSearch';
import FavoritesList from '@/src/components/music/FavoritesList';
import QueueList from '@/src/components/music/QueueList';

type Tab = 'search' | 'favorites' | 'queue';

export default function MusicPage() {
  const [tab, setTab] = useState<Tab>('search');

  return (
    <div className="max-w-2xl mx-auto">
      {/* 헤더 */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">🎵 Music</h2>
        <p className="text-sm text-[#9B97B0] mt-1">코딩할 때 듣는 음악</p>
      </div>

      {/* 탭 */}
      <div className="flex gap-1 rounded-xl bg-[#1A1726] border border-[#2E2B3F] p-1 mb-6">
        <button
          onClick={() => setTab('search')}
          className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all
            ${tab === 'search' ? 'bg-[#242136] text-white' : 'text-[#9B97B0] hover:text-white'}
          `}
        >
          🔍 Search
        </button>
        <button
          onClick={() => setTab('queue')}
          className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all
            ${tab === 'queue' ? 'bg-[#242136] text-white' : 'text-[#9B97B0] hover:text-white'}
          `}
        >
          📋 Queue
        </button>
        <button
          onClick={() => setTab('favorites')}
          className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all
            ${tab === 'favorites' ? 'bg-[#242136] text-white' : 'text-[#9B97B0] hover:text-white'}
          `}
        >
          ❤️ Favorites
        </button>
      </div>

      {/* 콘텐츠 */}
      {tab === 'search' && <MusicSearch />}
      {tab === 'queue' && <QueueList />}
      {tab === 'favorites' && <FavoritesList />}
    </div>
  );
}
