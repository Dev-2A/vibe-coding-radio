'use client';

import { useEffect, useRef, useState, useCallback } from "react";
import { useMusicStore } from "@/src/stores/musicStore";
import { useYouTubePlayer, YT_STATE } from "@/src/hooks/useYouTubePlayer";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Heart,
  ListMusic,
} from 'lucide-react';

export default function PlayerBar() {
  const {
    currentVideo,
    isPlaying,
    volume,
    queue,
    queueIndex,
    setIsPlaying,
    setVolume,
    nextTrack,
    prevTrack,
    toggleFavorite,
    isFavorite,
  } = useMusicStore();

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showVolume, setShowVolume] = useState(false);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  const handleStateChange = useCallback((state: number) => {
    if (state === YT_STATE.PLAYING) {
      setIsPlaying(true);
    } else if (state === YT_STATE.PAUSED) {
      setIsPlaying(false);
    }
  }, [setIsPlaying]);

  const handleEnd = useCallback(() => {
    nextTrack();
  }, [nextTrack]);

  const {
    isReady,
    loadVideo,
    play,
    pause,
    setVolume: setPlayerVolume,
    seekTo,
    getDuration,
    getCurrentTime: getPlayerCurrentTime,
  } = useYouTubePlayer({
    containerId: 'yt-player',
    onStateChange: handleStateChange,
    onEnd: handleEnd,
  });

  // 영상 로드
  useEffect(() => {
    if (isReady && currentVideo) {
      loadVideo(currentVideo.id);
    }
  }, [isReady, currentVideo, loadVideo]);

  // 볼륨 동기화
  useEffect(() => {
    if (isReady) {
      setPlayerVolume(volume);
    }
  }, [isReady, volume, setPlayerVolume]);

  // 진행 상태 업데이트
  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        const dur = getDuration();
        const cur = getPlayerCurrentTime();
        setDuration(dur);
        setCurrentTime(cur);
        setProgress(dur > 0 ? cur / dur : 0);
      }, 500);
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [isPlaying, getDuration, getPlayerCurrentTime]);

  // 시간 포맷
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // 프로그레스 바 클릭
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const newTime = ratio * duration;
    seekTo(newTime);
    setProgress(ratio);
  };

  // 재생할 곡이 없으면 표시 안 함
  if (!currentVideo) return <div id="yt-player" className="hidden" />;

  const liked = isFavorite(currentVideo.id);
  const hasNext = queueIndex < queue.length - 1;
  const hasPrev = queueIndex > 0;

  return (
    <>
      {/* 숨겨진 YouTube 플레이어 */}
      <div id="yt-player" className="hidden" />

      {/* 하단 플레이어 바 */}
      <div className="fixed bottom-0 left-16 right-0 z-50 border-t border-[#2E2B3F] bg-[#1A1726]/96 backdrop-blur-md">
        {/* 프로그레스 바 */}
        <div
          className="h-1 cursor-pointer group"
          onClick={handleProgressClick}
        >
          <div className="h-full bg-[#2E2B3F] relative">
            <div
              className="absolute inset-y-0 left-0 bg-violet-500 transition-all duration-300"
              style={{ width: `${progress * 100}%`}}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: `${progress * 100}%`, transform: `translate(-50%, -50%)` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between h-16 px-4">
          {/* 좌측: 트랙 정보 */}
          <div className="flex items-center gap-3 min-w-0 w-1/3">
            <img
              src={currentVideo.thumbnail}
              alt={currentVideo.title}
              className="h-10 w-10 rounded-lg object-cover shrink-0"
            />
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {currentVideo.title}
              </p>
              <p className="text-xs text-[#9B97B0] truncate">
                {currentVideo.channelTitle}
              </p>
            </div>
            <button
              onClick={() => toggleFavorite(currentVideo)}
              className={`shrink-0 p-1.5 rounded-lg transition-colors ${
                liked
                  ? 'text-red-400 hover:text-red-300'
                  : 'text-[#9B97B0] hover:text-white'
              }`}
            >
              <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* 중앙: 컨트롤 */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevTrack}
              disabled={!hasPrev}
              className="p-2 text-[#9B97B0] hover:text-white disabled:opacity-30 transition-colors"
            >
              <SkipBack className="h-4 w-4" />
            </button>

            <button
              onClick={isPlaying ? pause: play}
              className="flex h-10 w-10 items-center justify-center rounded-full
                bg-white text-black transition-transform hover:scale-105 active:scale-95"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5 ml-0.5" />
              )}
            </button>

            <button
              onClick={nextTrack}
              disabled={!hasNext}
              className="p-2 text-[#9B97B0] hover:text-white disabled:opacity-30 transition-colors"
            >
              <SkipForward className="h-4 w-4" />
            </button>
          </div>

          {/* 우측: 시간 + 볼륨 */}
          <div className="flex items-center gap-3 w-1/3 justify-end">
            <span className="text-xs text-[#9B97B0] tabular-nums whitespace-nowrap">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            {/* 볼륨 */}
            <div className="relative flex items-center">
              <button
                onClick={() => setShowVolume(!showVolume)}
                className="p-1.5 text-[#9B97B0] hover:text-white transition-colors"
              >
                {volume === 0 ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </button>

              {showVolume && (
                <div className="absolute bottom-full right-0 mb-2 p-3 rounded-xl bg-[#242136] border border-[#2E2B3F] shadow-xl">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-24 accent-violet-500"
                  />
                  <p className="text-[10px] text-[#9B97B0] text-center mt-1">{volume}%</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
