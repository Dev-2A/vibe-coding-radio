'use client';

import { useMusicStore } from "@/src/stores/musicStore";
import MusicTrackItem from "./MusicTrackItem";
import { Heart } from "lucide-react";

export default function FavoritesList() {
  const { favorites } = useMusicStore();

  if (favorites.length === 0) {
    return (
      <div className="text-center py-8">
        <Heart className="h-8 w-8 text-[#2E2B3F] mx-auto mb-2" />
        <p className="text-sm text-[#9B97B0]">아직 즐겨찾기한 곡이 없어요</p>
        <p className="text-xs text-[#6B7280] mt-1">♥ 버튼으로 마음에 드는 곡을 저장하세요</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-medium text-[#9B97B0]">
          ❤️ {favorites.length} favorites
        </h3>
      </div>
      <div className="space-y-1">
        {favorites.map((video, index) => (
          <MusicTrackItem
            key={video.id}
            video={video}
            index={index}
            allVideos={favorites}
          />
        ))}
      </div>
    </div>
  );
}
