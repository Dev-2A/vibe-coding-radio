'use client';

import { useTimer } from "@/src/hooks/useTimer";
import CircleProgress from "./CircleProgress";
import ModeSelector from "./ModeSelector";
import TimerControls from "./TimerControls";
import PomodoroCounter from "./PomodoroCounter";
import { TimerMode } from "@/src/types";

const MODE_COLORS: Record<TimerMode, string> = {
  focus: '#8B5CF6',
  shortBreak: '#06B6D4',
  longBreak: '#10B981',
};

export default function TimerWidget() {
  const {
    mode,
    status,
    timeDisplay,
    modeLabel,
    progress,
    completedPomodoros,
    config,
    start,
    pause,
    resume,
    reset,
    skip,
    setMode,
  } = useTimer();

  const isRunning = status === 'running';
  const color = MODE_COLORS[mode];

  return (
    <div className="flex flex-col items-center gap-6">
      {/* 모드 선택 탭 */}
      <ModeSelector
        currentMode={mode}
        onSelect={setMode}
        disabled={isRunning}
      />

      {/* 원형 타이머 */}
      <div className="relative">
        {/* 배경 글로우 */}
        <div
          className="absolute inset-0 rounded-full blur-3xl opacity-10 transition-colors duration-500"
          style={{ backgroundColor: color }}
        />

        <CircleProgress
          progress={progress}
          size={280}
          strokeWidth={6}
          color={color}
        >
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs font-medium text-[#9B97B0]">
              {modeLabel}
            </span>
            <span
              className="text-5xl font-bold tracking-tight text-white tabular-nums"
              style={{ fontVariantNumeric: 'tabular-nums' }}
            >
              {timeDisplay}
            </span>
            {status === 'paused' && (
              <span className="text-xs text-amber-400 animate-pulse">
                paused
              </span>
            )}
          </div>
        </CircleProgress>
      </div>

      {/* 컨트롤 버튼 */}
      <TimerControls
        status={status}
        onStart={start}
        onPause={pause}
        onResume={resume}
        onReset={reset}
        onSkip={skip}
      />

      {/* 뽀모도로 카운터 */}
      <PomodoroCounter
        completed={completedPomodoros}
        longBreakInterval={config.longBreakInterval}
      />
    </div>
  );
}
