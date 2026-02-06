'use client';

import { useMusicStore } from "@/src/stores/musicStore";
import MusicTrackItem from "./MusicTrackItem";
import { ListMusic, Trash2 } from "lucide-react";

export default function QueueList() {
  const { queue, queueIndex, clearQueue } = useMusicStore();

  if (queue.length === 0) {
    return (
      <div className="text-center py-8">
        <ListMusic className="h-8 w-8 text-[#2E2B3F] mx-auto mb-2" />
        <p className="text-sm text-[#9B97B0]">재생 대기열이 비어있어요</p>
        <p className="text-xs text-[#6B7280] mt-1">검색에서 곡을 선택해보세요</p>
      </div>
    );
  }

  // 현재 곡 이후의 큐만 표시
  const upcomingQueue = queue.slice(queueIndex + 1);

  return (
    <div>
      {/* 현재 재생 중 */}
      {queue[queueIndex] && (
        <div className="mb-4">
          <h3 className="text-xs font-medium text-[#9B97B0] mb-2">🎵 Now playing</h3>
          <MusicTrackItem
            video={queue[queueIndex]}
            index={queueIndex}
            allVideos={queue}
          />
        </div>
      )}

      {/* 다음 곡들 */}
      {upcomingQueue.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-medium text-[#9B97B0]">
              ⏭️ Up next ({upcomingQueue.length})
            </h3>
            <button
              onClick={clearQueue}
              className="text-xs text-[#9B97B0] hover:text-red-400 flex items-center gap-1 transition-colors"
            >
              <Trash2 className="h-3 w-3" />
              Clear
            </button>
          </div>
          <div className="space-y-1">
            {upcomingQueue.map((video, i) => (
              <MusicTrackItem
                key={`${video.id}-${i}`}
                video={video}
                index={queueIndex + 1 + i}
                allVideos={queue}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
