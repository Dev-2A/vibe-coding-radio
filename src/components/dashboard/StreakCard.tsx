'use client';

import { useStreak } from "@/src/hooks/useStreak";
import Card, { CardTitle } from "../ui/Card";
import { Flame, Trophy, Calendar } from "lucide-react";

export default function StreakCard() {
  const { currentStreak, longestStreak, totalDays } = useStreak();

  return (
    <Card>
      <CardTitle>🔥 Streak</CardTitle>

      <div className="flex items-center justify-around">
        {/* 현재 스트릭 */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Flame className={`h-5 w-5 ${currentStreak > 0 ? 'text-orange-400' : 'text-[#3D3A50]'}`} />
            <span className="text-2xl font-bold text-white">{currentStreak}</span>
          </div>
          <p className="text-[10px] text-[#9B97B0]">Current</p>
        </div>

        {/* 구분선 */}
        <div className="h-12 w-px bg-[#2E2B3F]" />

        {/* 최장 스트릭 */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Trophy className={`h-5 w-5 ${longestStreak > 0 ? 'text-amber-400' : 'text-[#3D3A50]'}`} />
            <span className="text-2xl font-bold text-white">{longestStreak}</span>
          </div>
          <p className="text-[10px] text-[#9B97B0]">Best</p>
        </div>

        {/* 구분선 */}
        <div className="h-12 w-px bg-[#2E2B3F]" />

        {/* 총 코딩 일수 */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Calendar className="h-5 w-5 text-violet-400" />
            <span className="text-2xl font-bold text-white">{totalDays}</span>
          </div>
          <p className="text-[10px] text-[#9B97B0]">Total Days</p>
        </div>
      </div>

      {/* 스트릭 메시지 */}
      {currentStreak > 0 && (
        <div className="mt-4 rounded-lg bg-orange-500/10 border border-orange-500/20 px-3 py-2 text-center">
          <p className="text-xs text-orange-300">
            {currentStreak === 1 && '🌱 좋은 시작이야! 내일도 코딩하자!'}
            {currentStreak >= 2 && currentStreak < 7 && `🔥 ${currentStreak}일 연속! 계속 달려보자!`}
            {currentStreak >= 7 && currentStreak < 30 && `🚀 ${currentStreak}일 연속! 대단해!`}
            {currentStreak >= 30 && `👑 ${currentStreak}일 연속! 전설이다!`}
          </p>
        </div>
      )}
    </Card>
  );
}
