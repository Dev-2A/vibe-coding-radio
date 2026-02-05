'use client';

import { CodingSession } from "@/src/types";
import { Clock, Target, Trash2, MessageSquare } from "lucide-react";

interface SessionCardProps {
  session: CodingSession;
  onDelete: (id: string) => void;
}

export default function SessionCard({ session, onDelete }: SessionCardProps) {
  const startDate = new Date(session.startedAt);
  const endDate = new Date(session.endedAt);

  // 날짜 포맷: "2월 5일 (수)"
  const dateStr = startDate.toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  });

  // 시간 포맷: "14:30 → 15:25"
  const timeStr = `${startDate.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })} → ${endDate.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })}`;

  // 집중 시간 포맷
  const focusStr =
    session.focusMinutes < 60
      ? `${session.focusMinutes}m`
      : `${Math.floor(session.focusMinutes / 60)}h ${session.focusMinutes % 60}m`;
  
  // 언어별 컬러 (해시 기반)
  const langColors: Record<string, string> = {
    TypeScript: 'bg-blue-500/15 text-blue-400',
    JavaScript: 'bg-yellow-500/15 text-yellow-400',
    Python: 'bg-green-500/15 text-green-400',
    Java: 'bg-orange-500/15 text-orange-400',
    'C++': 'bg-pink-500/15 text-pink-400',
    Rust: 'bg-red-500/15 text-red-400',
    Go: 'bg-cyan-500/15 text-cyan-400',
    Kotlin: 'bg-purple-500/15 text-purple-400',
    Swift: 'bg-orange-400/15 text-orange-300',
    Ruby: 'bg-red-400/15 text-red-300',
    PHP: 'bg-indigo-500/15 text-indigo-400',
    'C#': 'bg-violet-500/15 text-violet-400',
  };
  const langColor = langColors[session.language] || 'bg-gray-500/15 text-gray-400';

  return (
    <div className="group rounded-xl border border-[#2E2B3F] bg-[#1A1726] p-4 transition-all hover:border-[#3D3A50]">
      {/* 상단: 프로젝트명 + 삭제 */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{session.mood}</span>
            <h3 className="text-sm font-semibold text-white truncate">
              {session.projectName}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className={`rounded-md px-2 py-0.5 text-[11px] font-medium ${langColor}`}>
              {session.language}
            </span>
            <span className="text-[11px] text-[#9B97B0]">{dateStr}</span>
          </div>
        </div>

        <button
          onClick={() => onDelete(session.id)}
          className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg
            transition-all"
          title="Delete session"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* 중간: 통계 */}
      <div className="flex items-center gap-4 text-xs text-[#9B97B0]">
        <span className="flex items-center gap-1">
          <Target  className="h-3 w-3 text-violet-400" />
          {session.completedPomodoros} 🍅
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3 text-cyan-400" />
          {focusStr}
        </span>
        <span>{timeStr}</span>
      </div>

      {/* 하단: 메모 */}
      {session.note && (
        <div className="mt-3 flex items-start gap-1.5 rounded-lg bg-[#242136] p-2.5">
          <MessageSquare className="h-3 w-3 text-[#9B97B0] mt-0.5 shrink-0" />
          <p className="text-xs text-[#9B97B0] leading-relaxed">
            {session.note}
          </p>
        </div>
      )}
    </div>
  );
}
