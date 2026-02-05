'use client';

import { Minus, Plus } from 'lucide-react';

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

export default function NumberInput({
  label,
  value,
  onChange,
  min = 1,
  max = 120,
  step = 1,
  unit = 'min',
}: NumberInputProps) {
  const decrease = () => onChange(Math.max(min, value - step));
  const increase = () => onChange(Math.min(max, value + step));

  return (
    <div className='flex items-center justify-between'>
      <span className='text-sm text-[#9B97B0]'>{label}</span>
      <div className='flex items-center gap-2'>
        <button
          onClick={decrease}
          disabled={value <= min}
          className='flex h-8 w-8 items-center justify-center rounded-lg
            bg-[#242136] text-[#9B97B0] transition-all
            hover:bg-[#2E2B3F] hover:text-white
            disabled:opacity-30 disabled:cursor-not-allowed'
        >
          <Minus className='h-3.5 w-3.5' />
        </button>
        <span className='w-14 text-center text-sm font-semibold text-white tabular-nums'>
          {value} {unit}
        </span>
        <button
          onClick={increase}
          disabled={value >= max}
          className='flex h-8 w-8 items-center justify-center rounded-lg
            bg-[#242136] text-[#9B97B0] transition-all
            hover:bg-[#2E2B3F] hover:text-white
            disabled:opacity-30 disabled:cursor-not-allowed'
        >
          <Plus className='h-3.5 w-3.5' />
        </button>
      </div>
    </div>
  );
}
