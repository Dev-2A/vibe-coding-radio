'use client';

import { useMusicStore } from "@/src/stores/musicStore";
import { YouTubeVideo } from "@/src/lib/youtube";
import { Play, Pause, Heart } from "lucide-react";

interface MusicTrackItemProps {
  video: YouTubeVideo;
  index: number;
  allVideos: YouTubeVideo[];
}

export default function MusicTrackItem({ video, index, allVideos }: MusicTrackItemProps) {
  const {
    currentVideo,
    isPlaying,
    playQueue,
    setIsPlaying,
    toggleFavorite,
    isFavorite,
  } = useMusicStore();

  const isCurrentTrack = currentVideo?.id === video.id;
  const liked = isFavorite(video.id);

  const handlePlay = () => {
    if (isCurrentTrack && isPlaying) {
      setIsPlaying(false);
    } else if (isCurrentTrack) {
      setIsPlaying(true);
    } else {
      playQueue(allVideos, index);
    }
  };

  return (
    <div
      className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors cursor-pointer
        ${isCurrentTrack ? 'bg-violet-600/10' : 'hover:bg-[#242136]'}
      `}
      onClick={handlePlay}
    >
      {/* 썸네일 + 재생 오버레이 */}
      <div className="relative h-10 w-10 rounded-lg overflow-hidden shrink-0">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
          {isCurrentTrack && isPlaying ? (
            <Pause className="h-4 w-4 text-white" />
          ) : (
            <Play className="h-4 w-4 text-white ml-0.5" />
          )}
        </div>
        {/* 현재 재생 중 인디케이터 */}
        {isCurrentTrack && isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <div className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 bg-violet-400 animate-bounce" style={{ animationDelay: '0ms', height: '60%' }} />
              <span className="w-0.5 bg-violet-400 animate-bounce" style={{ animationDelay: '150ms', height: '100%' }} />
              <span className="w-0.5 bg-violet-400 animate-bounce" style={{ animationDelay: '300ms', height: '40%' }} />
            </div>
          </div>
        )}
      </div>

      {/* 트랙 정보 */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm truncate ${isCurrentTrack ? 'text-violet-300 font-medium' : 'text-white'}`}>
          {video.title}
        </p>
        <p className="text-xs text-[#9B97B0] truncate">
          {video.channelTitle}
        </p>
      </div>

      {/* 좋아요 */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(video);
        }}
        className={`shrink-0 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all
          ${liked ? 'opacity-100 text-red-400' : 'text-[#9B97B0] hover:text-white'}
        `}
      >
        <Heart className={`h-3.5 w-3.5 ${liked ? 'fill-current' : ''}`} />
      </button>
    </div>
  );
}
