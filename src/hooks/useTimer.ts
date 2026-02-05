'use client';

import { useEffect, useRef } from 'react';
import { useTimerStore } from '@/src/stores/timerStore';
import { useSound } from '@/src/hooks/useSound';
import { formatTime } from '@/src/lib/utils';
import { TimerMode } from '@/src/types';

const MODE_LABELS: Record<TimerMode, string> = {
  focus: '🍅 Focus',
  shortBreak: '☕ Break',
  longBreak: '🌴 Long Break',
};

export function useTimer() {
  const store = useTimerStore();
  const { play } = useSound();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const prevModeRef = useRef<TimerMode>(store.mode);

  // 모드가 바뀌면 알림음 재생
  useEffect(() => {
    if (prevModeRef.current !== store.mode && store.status === 'idle') {
      // 이전 모드가 focus였으면 = focus 끝남
      if (prevModeRef.current === 'focus') {
        play('focusEnd');
      } else {
        play('breakEnd');
      }

      // 브라우저 Notification
      if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
        new Notification('Vibe Coding Radio', {
          body: store.mode === 'focus'
            ? '☕ 쉬는 시간 끝! 다시 집중하자!'
            : '🍅 수고했어! 잠시 쉬어가자.',
          icon: '/favicon.ico',
        });
      }
    }
    prevModeRef.current = store.mode;
  }, [store.mode, store.status, play]);

  // 1초 인터벌
  useEffect(() => {
    if (store.status === 'running') {
      intervalRef.current = setInterval(() => {
        store.tick();
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [store.status, store.tick]);

  // 브라우저 탭 타이틀
  useEffect(() => {
    if (store.status === 'running' || store.status === 'paused') {
      document.title = `${formatTime(store.secondsLeft)} — ${MODE_LABELS[store.mode]}`;
    } else {
      document.title = 'Vibe Coding Radio';
    }

    return () => {
      document.title = 'Vibe Coding Radio';
    };
  }, [store.secondsLeft, store.mode, store.status]);

  // Notification 권한 요청
  useEffect(() => {
    if (typeof Notification !== 'undefined' && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // 진행률 (0 ~ 1)
  const progress =
    store.totalSeconds > 0
      ? (store.totalSeconds - store.secondsLeft) / store.totalSeconds
      : 0;

  return {
    mode: store.mode,
    status: store.status,
    secondsLeft: store.secondsLeft,
    completedPomodoros: store.completedPomodoros,
    config: store.config,
    progress,
    timeDisplay: formatTime(store.secondsLeft),
    modeLabel: MODE_LABELS[store.mode],
    start: store.start,
    pause: store.pause,
    resume: store.resume,
    reset: store.reset,
    skip: store.skip,
    setConfig: store.setConfig,
    setMode: store.setMode,
  };
}
