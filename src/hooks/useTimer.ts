'use client';

import { useEffect, useRef, useCallback } from "react";
import { useTimerStore } from "../stores/timerStore";
import { formatTime } from "../lib/utils";
import { TimerMode } from "../types";

const MODE_LABELS: Record<TimerMode, string> = {
  focus: '🍅 Focus',
  shortBreak: '☕ Break',
  longBreak: '🌴 Long Break',
};

export function useTimer() {
  const store = useTimerStore();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const prevModeRef = useRef<TimerMode>(store.mode);

  // 알림음 재생
  const playNotification = useCallback(() => {
    try {
      // Web Audio API로 간단한 비프음 생성
      const audioCtx = new AudioContext();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      gainNode.gain.value = 0.3;

      oscillator.start();

      // 0.5초 후 페이드 아웃
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
      oscillator.stop(audioCtx.currentTime + 0.5);
    } catch {
      // AudioContext 지원 안 되면 무시
    }
  }, []);

  // 모드가 바뀌면 알림음 재싱 (idle 상태에서 모드 전환 = 타이머 완료)
  useEffect(() => {
    if (prevModeRef.current !== store.mode && store.status === 'idle') {
      playNotification();

      // 브라우저 Notification (권한 있으면)
      if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
        const label = MODE_LABELS[store.mode];
        new Notification('Vibe Coding Radio', {
          body: store.mode === 'focus'
            ? '☕ 쉬는 시간 끝! 다시 집중하자!'
            : '🍅 수고했어! 잠시 쉬어가자.',
          icon: '/favicon.ico',
        });
      }
    }
    prevModeRef.current = store.mode;
  }, [store.mode, store.status, playNotification]);

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

  // 브라우저 탭 타이틀 업데이트
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
    // 상태
    mode: store.mode,
    status: store.status,
    secondsLeft: store.secondsLeft,
    completedPomodoros: store.completedPomodoros,
    config: store.config,
    progress,

    // 포맷된 값
    timeDisplay: formatTime(store.secondsLeft),
    modeLabel: MODE_LABELS[store.mode],

    // 액션
    start: store.start,
    pause: store.pause,
    resume: store.resume,
    reset: store.reset,
    skip: store.skip,
    setConfig: store.setConfig,
    setMode: store.setMode,
  };
}
