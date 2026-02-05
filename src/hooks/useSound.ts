'use client';

import { useCallback } from "react";

type SoundType = 'focusEnd' | 'breakEnd' | 'click';

const SOUND_CONFIG: Record<SoundType, { freq: number; duration: number; count: number }> = {
  focusEnd: { freq: 660, duration: 0.15, count: 3 },    // 높은 톤 3번
  breakEnd: { freq: 440, duration: 0.2, count: 2 },     // 중간 톤 2번
  click: { freq: 1000, duration: 0.05, count: 1 },      // 짧은 클릭
};

export function useSound() {
  const play = useCallback((type: SoundType) => {
    try {
      const { freq, duration, count } = SOUND_CONFIG[type];
      const audioCtx = new AudioContext();

      for (let i = 0; i < count; i++) {
        const startTime = audioCtx.currentTime + i * (duration + 0.1);

        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.frequency.value = freq;
        oscillator.type = 'sine';

        // 페이드 인 / 아웃
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.25, startTime + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
      }
    } catch {
      // AudioContext 미지원 환경
    }
  }, []);

  return { play };
}
