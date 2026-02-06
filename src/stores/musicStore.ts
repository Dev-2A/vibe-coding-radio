import { create } from "zustand";
import { persist } from "zustand/middleware";
import { YouTubeVideo } from "../lib/youtube";

interface MusicState {
  // 현재 재생
  currentVideo: YouTubeVideo | null;
  isPlaying: boolean;
  volume: number; // 0 ~ 100

  // 재생 목록
  queue: YouTubeVideo[];
  queueIndex: number;

  // 즐겨찾기
  favorites: YouTubeVideo[];

  // 최근 검색어
  recentSearches: string[];

  // 액션
  playVideo: (video: YouTubeVideo) => void;
  playQueue: (videos: YouTubeVideo[], startIndex?: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setVolume: (volume: number) => void;
  toggleFavorite: (video: YouTubeVideo) => void;
  isFavorite: (videoId: string) => boolean;
  addRecentSearch: (query: string) => void;
  clearQueue: () => void;
}

export const useMusicStore = create<MusicState>()(
  persist(
    (set, get) => ({
      currentVideo: null,
      isPlaying: false,
      volume: 70,
      queue: [],
      queueIndex: -1,
      favorites: [],
      recentSearches: [],

      playVideo: (video) => {
        set({
          currentVideo: video,
          isPlaying: true,
          queue: [video],
          queueIndex: 0,
        });
      },

      playQueue: (videos, startIndex = 0) => {
        if (videos.length === 0) return;
        set({
          queue: videos,
          queueIndex: startIndex,
          currentVideo: videos[startIndex],
          isPlaying: true,
        });
      },

      nextTrack: () => {
        const { queue, queueIndex } = get();
        if (queueIndex < queue.length - 1) {
          const nextIndex = queueIndex + 1;
          set({
            queueIndex: nextIndex,
            currentVideo: queue[nextIndex],
            isPlaying: true,
          });
        }
      },

      prevTrack: () => {
        const { queue, queueIndex } = get();
        if (queueIndex > 0) {
          const prevIndex = queueIndex - 1;
          set({
            queueIndex: prevIndex,
            currentVideo: queue[prevIndex],
            isPlaying: true,
          });
        }
      },

      setIsPlaying: (isPlaying) => set({ isPlaying }),

      setVolume: (volume) => set({ volume: Math.max(0, Math.min(100, volume)) }),

      toggleFavorite: (video) => {
        const { favorites } = get();
        const exists = favorites.some((f) => f.id === video.id);
        set({
          favorites: exists
            ? favorites.filter((f) => f.id !== video.id)
            : [video, ...favorites].slice(0, 50), // 최대 50개
        });
      },

      isFavorite: (videoId) => {
        return get().favorites.some((f) => f.id === videoId);
      },

      addRecentSearch: (query) => {
        const { recentSearches } = get();
        const trimmed = query.trim();
        if (!trimmed) return;
        set({
          recentSearches: [
            trimmed,
            ...recentSearches.filter((s) => s !== trimmed),
          ].slice(0, 10), // 최대 10개
        });
      },

      clearQueue: () => {
        set({
          queue: [],
          queueIndex: -1,
          currentVideo: null,
          isPlaying: false,
        });
      },
    }),
    {
      name: 'vibe-music',
      skipHydration: true,
      partialize: (state) => ({
        favorites: state.favorites,
        recentSearches: state.recentSearches,
        volume: state.volume,
      }),
    }
  )
);
