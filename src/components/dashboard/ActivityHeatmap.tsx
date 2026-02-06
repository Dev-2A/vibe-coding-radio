'use client';

import { useMemo } from "react";
import { useSessionStore } from "@/src/stores/sessionStore";
import Card, { CardTitle } from "../ui/Card";

export default function ActivityHeatmap() {
  const sessions = useSessionStore((s) => s.sessions);

  // 최근 12주 날짜별 집중 시간 계산
  const heatmapData = useMemo(() => {
    const data: Record<string, number> = {};

    // 12주 = 84일
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    sessions.forEach((s) => {
      const date = new Date(s.startedAt).toISOString().split('T')[0];
      data[date] = (data[date] || 0) + s.focusMinutes;
    });

    // 최근 12주 날짜 배열 생성 (일요일 시작)
    const weeks: { date: Date; minutes: number }[][] = [];
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 83);  // 84일 전부터

    // 첫 주의 시작을 일요일로 맞추기
    while (startDate.getDay() !== 0) {
      startDate.setDate(startDate.getDate() - 1);
    }

    let currentWeek: { date: Date; minutes: number }[] = [];
    const endDate = new Date(today);
    endDate.setDate(endDate.getDate() + 1);

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      currentWeek.push({
        date: new Date(d),
        minutes: data[dateStr] || 0,
      });

      if (d.getDay() === 6 || d >= today) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      weeks.push(currentWeek);
    }

    return weeks;
  }, [sessions]);

  // 색상 레벨 (0~4)
  const getColorClass = (minutes: number) => {
    if (minutes === 0) return 'bg-[#242136]';
    if (minutes < 30) return 'bg-violet-900/60';
    if (minutes < 60) return 'bg-violet-700/70';
    if (minutes < 120) return 'bg-violet-500/80';
    return 'bg-violet-400';
  };

  const dayLabels = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

  return (
    <Card className="overflow-x-auto">
      <CardTitle>📅 Activity (12 weeks)</CardTitle>

      <div className="flex gap-0.5">
        {/* 요일 라벨 */}
        <div className="flex flex-col gap-0.5 mr-1">
          {dayLabels.map((label, i) => (
            <div key={i} className="h-3 w-6 text-[9px] text-[#9B97B0] flex items-center">
              {label}
            </div>
          ))}
        </div>

        {/* 히트맵 */}
        {heatmapData.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-0.5">
            {week.map((day, di) => {
              const isToday = day.date.toDateString() === new Date().toDateString();
              const isFuture = day.date > new Date();

              return (
                <div
                  key={di}
                  className={`h-3 w-3 rounded-sm transition-colors ${
                    isFuture ? 'bg-transparent' : getColorClass(day.minutes)
                  } ${isToday ? 'ring-1 ring-white/50' : ''}`}
                  title={`${day.date.toLocaleDateString('ko-KR')}: ${day.minutes}분`}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* 범례 */}
      <div className="flex items-center justify-end gap-1 mt-3">
        <span className="text-[9px] text-[#9B97B0] mr-1">Less</span>
        <div className="h-3 w-3 rounded-sm bg-[#242136]" />
        <div className="h-3 w-3 rounded-sm bg-violet-900/60" />
        <div className="h-3 w-3 rounded-sm bg-violet-700/70" />
        <div className="h-3 w-3 rounded-sm bg-violet-500/80" />
        <div className="h-3 w-3 rounded-sm bg-violet-400" />
        <span className="text-[9px] text-[#9B97B0] ml-1">More</span>
      </div>
    </Card>
  );
}
