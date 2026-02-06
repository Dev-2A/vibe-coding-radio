'use client';

import { useEffect, useRef } from 'react';
import { useTimerStore } from '@/src/stores/timerStore';
import { useSessionStore } from '@/src/stores/sessionStore';
import { useMusicStore } from '@/src/stores/musicStore';
import { useSettingsStore } from '@/src/stores/settingsStore';
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
  const { activeSession, addPomodoro } = useSessionStore();
  const { currentVideo, isPlaying, setIsPlaying } = useMusicStore();
  const { autoPlayMusicOnStart, autoPauseMusicOnBreak, showNotifications } = useSettingsStore();
  const { play } = useSound();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const prevModeRef = useRef<TimerMode>(store.mode);
  const prevStatusRef = useRef(store.status);

  // 뽀모도로 완료 시 세션에 기록
  useEffect(() => {
    const handlePomodoroComplete = () => {
      if (activeSession) {
        addPomodoro(store.config.focus);
      }
    };

    store.setOnPomodoroComplete(handlePomodoroComplete);

    return () => {
      store.setOnPomodoroComplete(null);
    };
  }, [activeSession, addPomodoro, store.config.focus, store.setOnPomodoroComplete]);

  // 타이머 시작 시 음악 자동 재생
  useEffect(() => {
    if (
      prevStatusRef.current === 'idle' &&
      store.status === 'running' &&
      store.mode === 'focus' &&
      autoPlayMusicOnStart &&
      currentVideo &&
      !isPlaying
    ) {
      setIsPlaying(true);
    }
    prevStatusRef.current = store.status;
  }, [store.status, store.mode, autoPlayMusicOnStart, currentVideo, isPlaying, setIsPlaying]);

  // 모드가 바뀌면 알림음 재생 + 음악 제어
  useEffect(() => {
    if (prevModeRef.current !== store.mode && store.status === 'idle') {
      if (prevModeRef.current === 'focus') {
        play('focusEnd');
        // Break 시작 → 음악 일시정지
        if (autoPauseMusicOnBreak && isPlaying) {
          setIsPlaying(false);
        }
      } else {
        play('breakEnd');
        // Focus 시작 → 음악 재개
        if (autoPlayMusicOnStart && currentVideo && !isPlaying) {
          setIsPlaying(true);
        }
      }

      // 브라우저 Notification
      if (showNotifications && typeof Notification !== 'undefined' && Notification.permission === 'granted') {
        new Notification('Vibe Coding Radio', {
          body: store.mode === 'focus'
            ? '☕ 쉬는 시간 끝! 다시 집중하자!'
            : '🍅 수고했어! 잠시 쉬어가자.',
          icon: '/favicon.ico',
        });
      }
    }
    prevModeRef.current = store.mode;
  }, [store.mode, store.status, play, autoPauseMusicOnBreak, autoPlayMusicOnStart, currentVideo, isPlaying, setIsPlaying, showNotifications]);

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
