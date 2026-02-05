import { create } from 'zustand';
import { TimerMode, TimerStatus, TimerConfig } from '@/src/types';
import { DEFAULT_TIMER_CONFIG } from '@/src/lib/constants';

interface TimerState {
  // 상태
  mode: TimerMode;
  status: TimerStatus;
  secondsLeft: number;
  completedPomodoros: number;
  config: TimerConfig;
  totalSeconds: number;

  // 콜백 (세션 연동용)
  onPomodoroComplete: (() => void) | null;

  // 액션
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  skip: () => void;
  tick: () => void;
  setConfig: (config: Partial<TimerConfig>) => void;
  setMode: (mode: TimerMode) => void;
  setOnPomodoroComplete: (callback: (() => void) | null) => void;
}

function getModeSeconds(mode: TimerMode, config: TimerConfig): number {
  const map: Record<TimerMode, number> = {
    focus: config.focus * 60,
    shortBreak: config.shortBreak * 60,
    longBreak: config.longBreak * 60,
  };
  return map[mode];
}

function getNextMode(
  currentMode: TimerMode,
  completedPomodoros: number,
  longBreakInterval: number
): TimerMode {
  if (currentMode === 'focus') {
    return (completedPomodoros + 1) % longBreakInterval === 0
      ? 'longBreak'
      : 'shortBreak';
  }
  return 'focus';
}

export const useTimerStore = create<TimerState>((set, get) => {
  const initialSeconds = getModeSeconds('focus', DEFAULT_TIMER_CONFIG);

  return {
    mode: 'focus',
    status: 'idle',
    secondsLeft: initialSeconds,
    completedPomodoros: 0,
    config: DEFAULT_TIMER_CONFIG,
    totalSeconds: initialSeconds,
    onPomodoroComplete: null,

    start: () => {
      const { mode, config } = get();
      const total = getModeSeconds(mode, config);
      set({
        status: 'running',
        secondsLeft: total,
        totalSeconds: total,
      });
    },

    pause: () => {
      set({ status: 'paused' });
    },

    resume: () => {
      set({ status: 'running' });
    },

    reset: () => {
      const { mode, config } = get();
      const total = getModeSeconds(mode, config);
      set({
        status: 'idle',
        secondsLeft: total,
        totalSeconds: total,
      });
    },

    skip: () => {
      const { mode, completedPomodoros, config, onPomodoroComplete } = get();

      // focus 모드를 스킵하면 뽀모도로 완료로 처리
      if (mode === 'focus' && onPomodoroComplete) {
        onPomodoroComplete();
      }

      const nextMode = getNextMode(mode, completedPomodoros, config.longBreakInterval);
      const newCompleted = mode === 'focus' ? completedPomodoros + 1 : completedPomodoros;
      const total = getModeSeconds(nextMode, config);

      set({
        mode: nextMode,
        status: 'idle',
        secondsLeft: total,
        totalSeconds: total,
        completedPomodoros: newCompleted,
      });
    },

    tick: () => {
      const { secondsLeft, mode, completedPomodoros, config, onPomodoroComplete } = get();

      if (secondsLeft <= 1) {
        // 뽀모도로 완료 콜백 (focus 모드일 때만)
        if (mode === 'focus' && onPomodoroComplete) {
          onPomodoroComplete();
        }

        const nextMode = getNextMode(mode, completedPomodoros, config.longBreakInterval);
        const newCompleted = mode === 'focus' ? completedPomodoros + 1 : completedPomodoros;
        const total = getModeSeconds(nextMode, config);

        set({
          mode: nextMode,
          status: 'idle',
          secondsLeft: total,
          totalSeconds: total,
          completedPomodoros: newCompleted,
        });

        return;
      }

      set({ secondsLeft: secondsLeft - 1 });
    },

    setConfig: (partial) => {
      const { config, mode, status } = get();
      const newConfig = { ...config, ...partial };
      const total = getModeSeconds(mode, newConfig);

      set({
        config: newConfig,
        ...(status === 'idle' ? { secondsLeft: total, totalSeconds: total } : {}),
      });
    },

    setMode: (mode) => {
      const { config } = get();
      const total = getModeSeconds(mode, config);
      set({
        mode,
        status: 'idle',
        secondsLeft: total,
        totalSeconds: total,
      });
    },

    setOnPomodoroComplete: (callback) => {
      set({ onPomodoroComplete: callback });
    },
  };
});
