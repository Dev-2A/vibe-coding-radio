'use client';

import { Mood } from '@/src/types';
import { MOODS } from '@/src/lib/constants';

interface MoodSelectorProps {
  value: Mood;
  onChange: (mood: Mood) => void;
}

export default function MoodSelector({ value, onChange }: MoodSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-[#9B97B0]">
        오늘 코딩 기분은?
      </label>
      <div className="grid grid-cols-5 gap-1.5">
        {MOODS.map(({ emoji, label }) => {
          const isSelected = value === emoji;
          return (
            <button
              key={emoji}
              type="button"
              onClick={() => onChange(emoji as Mood)}
              className={`
                flex flex-col items-center gap-0.5 rounded-lg px-1 py-2
                transition-all duration-200
                ${
                  isSelected
                    ? 'bg-violet-600/20 border-2 border-violet-500'
                    : 'bg-[#242136] border-2 border-transparent hover:border-[#3D3A50]'
                }
              `}
              title={label}
            >
              <span className="text-xl">{emoji}</span>
              <span className="text-[9px] text-[#9B97B0] leading-tight">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
