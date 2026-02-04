import { create } from 'zustand';
import { TimerMode, TimerStatus, TimerConfig } from '../types';
import { DEFAULT_TIMER_CONFIG } from '../lib/constants';

interface TimerState {
  // 상태
  mode: TimerMode;
  status: TimerStatus;
  secondsLeft: number;
  completedPomodoros: number;
  config: TimerConfig;

  // 계산된 값
  totalSeconds: number;

  // 액션
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  skip: () => void;
  tick: () => void;
  setConfig: (config: Partial<TimerConfig>) => void;
  setMode: (mode: TimerMode) => void;
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
    // focus 완료 후: longBreak 간격에 도달하면 longBreak, 아니면 shortBreak
    return (completedPomodoros + 1) % longBreakInterval === 0
      ? 'longBreak'
      : 'shortBreak';
  }
  // 쉬는 시간 끝나면 다시 focus
  return 'focus';
}

export const useTimerStore = create<TimerState>((set, get) => {
  const initialSeconds = getModeSeconds('focus', DEFAULT_TIMER_CONFIG);

  return {
    // 초기 상태
    mode: 'focus',
    status: 'idle',
    secondsLeft: initialSeconds,
    completedPomodoros: 0,
    config: DEFAULT_TIMER_CONFIG,
    totalSeconds: initialSeconds,

    // 액션
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
      const { mode, completedPomodoros, config } = get();
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
      const { secondsLeft, mode, completedPomodoros, config } = get();

      if (secondsLeft <= 1) {
        // 타이머 종료!
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

        return; // 컴포넌트에서 이걸 감지해서 알림음 재생
      }

      set ({ secondsLeft: secondsLeft - 1 });
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
  };
});
