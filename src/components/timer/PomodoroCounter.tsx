'use client';

interface PomodoroCounterProps {
  completed: number;
  longBreakInterval: number;
}

export default function PomodoroCounter({
  completed,
  longBreakInterval,
}: PomodoroCounterProps) {
  // 현재 사이클 내에서 몇 번째인지
  const currentInCycle = completed % longBreakInterval;

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1.5">
        {Array.from({ length: longBreakInterval }).map((_, i) => (
          <div
            key={i}
            className={`
              h-2.5 w-2.5 rounded-full transition-all duration-300
              ${
                i < currentInCycle
                  ? 'bg-violet-500 shadow-sm shadow-violet-500/50'
                  : 'bg-[#2E2B3F]'
              }
            `}
          />
        ))}
      </div>
      <span className="text-xs text-[#9B97B0]">
        #{completed} done
      </span>
    </div>
  );
}
