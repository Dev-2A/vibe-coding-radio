'use client';

import { TimerMode } from "@/src/types";

interface ModeSelectorProps {
  currentMode: TimerMode;
  onSelect: (mode: TimerMode) => void;
  disabled?: boolean;
}

const MODES: { key: TimerMode; label: string; emoji: string }[] = [
  { key: 'focus', label: 'Focus', emoji: '🍅' },
  { key: 'shortBreak', label: 'Short Break', emoji: '☕' },
  { key: 'longBreak', label: 'Long Break', emoji: '🌴' },
]

export default function ModeSelector({ currentMode, onSelect, disabled }: ModeSelectorProps) {
  return (
    <div className="flex gap-1 rounded-xl bg-[#1A1726] p-1">
      {MODES.map(({ key, label, emoji }) => {
        const isActive = currentMode === key;
        return (
          <button
            key={key}
            onClick={() => onSelect(key)}
            disabled={disabled}
            className={`
              flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium
              transition-all duration-200
              ${
                isActive
                  ? 'bg-[#242136] text-white shadow-md'
                  : 'text-[#9B97B0] hover:text-white'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <span>{emoji}</span>
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
