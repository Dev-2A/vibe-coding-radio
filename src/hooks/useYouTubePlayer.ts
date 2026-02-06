'use client';

import { useEffect, useRef, useCallback, useState } from "react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface UseYouTubePlayerOptions {
  containerId: string;
  onReady?: () => void;
  onStateChange?: (state: number) => void;
  onEnd?: () => void;
}

// YT.PlayerState 상수
export const YT_STATE = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5,
} as const;

export function useYouTubePlayer({
  containerId,
  onReady,
  onStateChange,
  onEnd,
}: UseYouTubePlayerOptions) {
  const playerRef = useRef<any>(null);
  const [isAPIReady, setIsAPIReady] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const callbacksRef = useRef({ onReady, onStateChange, onEnd });

  // 콜백 최신 상태 유지
  useEffect(() => {
    callbacksRef.current = { onReady, onStateChange, onEnd };
  }, [onReady, onStateChange, onEnd]);

  // YouTube IFrame API 스크립트 로드
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      setIsAPIReady(true);
      return;
    }

    // 이미 스크립트가 로드 중이면 기다리기만
    const existing = document.querySelector('script[src*="youtube.com/iframe_api"]');
    if (existing) {
      const originalCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        originalCallback?.();
        setIsAPIReady(true);
      };
      return;
    }

    window.onYouTubeIframeAPIReady = () => {
      setIsAPIReady(true);
    };

    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // API 준비되면 플레이어 생성
  useEffect(() => {
    if (!isAPIReady) return;

    const container = document.getElementById(containerId);
    if (!container) return;

    // 이미 플레이어가 있으면 파괴 후 재생성
    if (playerRef.current) {
      try {
        playerRef.current.destroy();
      } catch {}
    }

    playerRef.current = new window.YT.Player(containerId, {
      height: '0',
      width: '0',
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        rel: 0,
        origin: window.location.origin,
      },
      events: {
        onReady: () => {
          setIsPlayerReady(true);
          callbacksRef.current.onReady?.();
        },
        onStateChange: (event: any) => {
          callbacksRef.current.onStateChange?.(event.data);
          if (event.data === YT_STATE.ENDED) {
            callbacksRef.current.onEnd?.();
          }
        },
      },
    });

    return () => {
      try {
        playerRef.current?.destroy();
      } catch {}
      playerRef.current = null;
      setIsPlayerReady(false);
    };
  }, [isAPIReady, containerId]);

  // 플레이어 제어 함수들
  const loadVideo = useCallback((videoId: string) => {
    if (!playerRef.current || !isPlayerReady) return;
    playerRef.current.loadVideoById(videoId);
  }, [isPlayerReady]);

  const play = useCallback(() => {
    playerRef.current?.playVideo();
  }, []);

  const pause = useCallback(() => {
    playerRef.current?.pauseVideo();
  }, []);

  const setVolume = useCallback((volume: number) => {
    playerRef.current?.setVolume(volume);
  }, []);

  const seekTo = useCallback((seconds: number) => {
    playerRef.current?.seekTo(seconds, true);
  }, []);

  const getDuration = useCallback((): number => {
    return playerRef.current?.getDuration?.() || 0;
  }, []);

  const getCurrentTime = useCallback((): number => {
    return playerRef.current?.getCurrentTime?.() || 0;
  }, []);

  return {
    isReady: isPlayerReady,
    loadVideo,
    play,
    pause,
    setVolume,
    seekTo,
    getDuration,
    getCurrentTime,
  };
}
