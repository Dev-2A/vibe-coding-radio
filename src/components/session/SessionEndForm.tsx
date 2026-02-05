'use client';

import { useState } from "react";
import { useSession } from "@/src/hooks/useSession";
import Card, { CardTitle } from "../ui/Card";
import Button from "../ui/Button";
import MoodSelector from "./MoodSelector";
import { Mood } from "@/src/types";
import { Square, Clock, Target } from "lucide-react";

interface SessionEndFormProps {
  onEnd?: () => void;
}

export default function SessionEndForm({ onEnd }: SessionEndFormProps) {
  const { activeSession, endSession, cancelSession, draft } = useSession();
  const [mood, setMood] = useState<Mood>(draft.mood);
  const [note, setNote] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  // 활성 세션이 없으면 표시 안 함
  if (!activeSession) return null;

  const handleEnd = () => {
    endSession(mood, note);
    if (onEnd) onEnd();
  };

  const handleCancel = () => {
    if (activeSession.completedPomodoros > 0) {
      setShowConfirm(true);
    } else {
      cancelSession();
    }
  };

  const confirmCancel = () => {
    cancelSession();
    setShowConfirm(false);
  };

  const formatDuration = () => {
    const start = new Date(activeSession.startedAt);
    const now = new Date();
    const diffMs = now.getTime() - start.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 60) return `${diffMins}m`;
    return `${Math.floor(diffMins / 60)}h ${diffMins % 60}m`;
  };

  return (
    <Card>
      <CardTitle>🏁 End Session</CardTitle>

      {/* 현재 세션 정보 */}
      <div className="mb-4 rounded-lg bg-[#242136] p-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-white">
            {activeSession.language}
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs text-[#9B97B0]">
          <span className="flex items-center gap-1">
            <Target className="h-3 w-3" />
            {activeSession.completedPomodoros} 🍅
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatDuration()}
          </span>
        </div>
      </div>

      {/* 취소 확인 모달 */}
      {showConfirm && (
        <div className="mb-4 rounded-lg bg-red-600/10 border border-red-600/20 p-3">
          <p className="text-sm text-red-400 mb-3">
            {activeSession.completedPomodoros}개의 뽀모도로 기록이 사라져요. 정말 취소할까요?
          </p>
          <div className="flex gap-2">
            <Button variant="danger" size="sm" onClick={confirmCancel}>
              네, 취소할게요
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setShowConfirm(false)}>
              아니요
            </Button>
          </div>
        </div>
      )}

      {!showConfirm && (
        <div className="space-y-4">
          {/* 기분 선택 */}
          <MoodSelector value={mood} onChange={setMood} />

          {/* 메모 (선택) */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#9B97B0]">
              메모 (선택)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="오늘 뭘 했는지 간단히 기록해두면 좋아요"
              maxLength={200}
              rows={2}
              className="w-full rounded-lg border border-[#2E2B3F] bg-[#242136]
                px-3 py-2.5 text-sm text-white placeholder:text-[#6B7280]
                focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500
                resize-none transition-colors"
            />
          </div>

          {/* 버튼들 */}
          <div className="flex gap-2">
            <Button onClick={handleEnd} fullWidth>
              <Square className="h-4 w-4" />
              Complete Session
            </Button>
          </div>
          <Button variant="ghost" size="sm" onClick={handleCancel} fullWidth>
            취소하고 기록 안 남기기
          </Button>
        </div>
      )}
    </Card>
  );
}
