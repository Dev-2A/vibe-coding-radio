'use client';

import { Radio, Github } from 'lucide-react';

export default function Header() {
  return (
    <header className='fixed top-0 left-0 right-0 z-50 h-14 border-b border-[#2E2B3F] bg-[#1A1726]/80 backdrop-blur-md'>
      <div className='flex h-full items-center justify-between px-6'>
        {/* 로고 */}
        <div className='flex items-center gap-3'>
          <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600'>
            <Radio className='h-4 w-4 text-white' />
          </div>
          <div>
            <h1 className='text-sm font-bold tracking-tight text-white'>
              Vibe Coding Radio
            </h1>
            <p className='text-[10px] text-[#9B97B0]'>coding with good vibes</p>
          </div>
        </div>

        {/* 우측 영역 */}
        <div className='flex items-center gap-4'>
          {/* 라이브 인디케이터 */}
          <div className='flex items-center gap-2 rounded-full bg-[#242136] px-3 py-1'>
            <span className='relative flex h-2 w-2'>
              <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75' />
              <span className='relative inline-flex h-2 w-2 rounded-full bg-emerald-500' />
            </span>
            <span className='text-xs text-emerald-400'>ON AIR</span>
          </div>

          {/* GitHub 링크 */}

          <a
            href='https://github.com'
            target='_blank'
            rel='noopener noreferrer'
            className='text-[#9B97B0] transition-colors hover:text-white'
          >
            <Github className='h-5 w-5' />
          </a>
        </div>
      </div>
    </header>
  );
}
