'use client';

import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';
import { TimerStatus } from '@/src/types';

interface TimerControlsProps {
  status: TimerStatus;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
  onSkip: () => void;
}

export default function TimerControls({
  status,
  onStart,
  onPause,
  onResume,
  onReset,
  onSkip,
}: TimerControlsProps) {
  return (
    <div className='flex items-center gap-3'>
      {/* 리셋 */}
      <button
        onClick={onReset}
        disabled={status === 'idle'}
        className='flex h-11 w-11 items-center justify-center rounded-full
          bg-[#242136] text-[#9B97B0] transition-all
          hover:bg-[#2E2B3F] hover:text-white
          disabled:opacity-30 disabled:cursor-not-allowed'
        title='Reset'
      >
        <RotateCcw className='h-4 w-4' />
      </button>

      {/* 메인 버튼 (시작/일시정지/재개) */}
      {status === 'idle' && (
        <button
          onClick={onStart}
          className='flex h-16 w-16 items-center justify-center rounded-full
            bg-violet-600 text-white shadow-lg shadow-violet-600/30
            transition-all hover:bg-violet-500 hover:scale-105
            active:scale-95'
          title='Start'
        >
          <Play className='h-7 w-7 ml-1' />
        </button>
      )}
      {status === 'running' && (
        <button
          onClick={onPause}
          className='flex h-16 w-16 items-center justify-center rounded-full
            bg-amber-500 text-white shadow-lg shadow-amber-500/30
            transition-all hover:bg-amber-400 hover:scale-105
            active:scale-95'
          title='Pause'
        >
          <Pause className='h-7 w-7' />
        </button>
      )}
      {status === 'paused' && (
        <button
          onClick={onResume}
          className='flex h-16 w-16 items-center justify-center rounded-full
            bg-emerald-500 text-white shadow-lg shadow-emerald-500/30
            transition-all hover:bg-emerald-400 hover:scale-105
            active:scale-95'
          title='Resume'
        >
          <Play className='h-7 w-7 ml-1' />
        </button>
      )}

      {/* 스킵 */}
      <button
        onClick={onSkip}
        className='flex h-11 w-11 items-center justify-center rounded-full
          bg-[#242136] text-[#9B97B0] transition-all
          hover:bg-[#2E2B3F] hover:text-white'
        title='Skip'
      >
        <SkipForward className='h-4 w-4' />
      </button>
    </div>
  );
}
