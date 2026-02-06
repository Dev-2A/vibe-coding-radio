'use client';

import { useSession } from '@/src/hooks/useSession';
import { useStreak } from '@/src/hooks/useStreak';
import Card, { CardTitle } from '@/src/components/ui/Card';
import { Flame, Clock, Target, FolderGit2 } from 'lucide-react';
import Link from 'next/link';

export default function TodaySummary() {
  const { todayStats, activeSession, todaySessions } = useSession();
  const { currentStreak } = useStreak();

  // 오늘 가장 많이 작업한 프로젝트
  const topProject = todaySessions.reduce((acc, s) => {
    acc[s.projectName] = (acc[s.projectName] || 0) + s.focusMinutes;
    return acc;
  }, {} as Record<string, number>);
  const topProjectName = Object.entries(topProject).sort((a, b) => b[1] - a[1])[0]?.[0];

  const formatMinutes = (m: number) => {
    if (m < 60) return `${m}m`;
    return `${Math.floor(m / 60)}h ${m % 60}m`;
  };

  const stats = [
    {
      icon: <Target className="h-4 w-4 text-violet-400" />,
      label: 'Pomodoros',
      value: todayStats.pomodoros.toString(),
    },
    {
      icon: <Clock className="h-4 w-4 text-cyan-400" />,
      label: 'Focus Time',
      value: todayStats.focusMinutes > 0 ? formatMinutes(todayStats.focusMinutes) : '-',
    },
    {
      icon: <FolderGit2 className="h-4 w-4 text-emerald-400" />,
      label: 'Top Project',
      value: topProjectName || '-',
    },
    {
      icon: <Flame className="h-4 w-4 text-amber-400" />,
      label: 'Streak',
      value: currentStreak > 0 ? `${currentStreak}일 🔥` : '-',
    },
  ];

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <CardTitle>📊 Today</CardTitle>
        <Link
          href="/dashboard"
          className="text-[10px] text-violet-400 hover:text-violet-300 transition-colors"
        >
          View Report →
        </Link>
      </div>

      {/* 현재 활성 세션 */}
      {activeSession && (
        <div className="mb-4 rounded-lg bg-violet-600/10 border border-violet-600/20 p-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" />
            </span>
            <span className="text-xs text-violet-300">Now coding</span>
          </div>
          <p className="mt-1 text-sm font-medium text-white truncate">
            {activeSession.projectName}
          </p>
          <p className="text-xs text-[#9B97B0]">
            {activeSession.completedPomodoros} 🍅 · {activeSession.focusMinutes}m
          </p>
        </div>
      )}

      {/* 통계 */}
      <div className="space-y-3">
        {stats.map(({ icon, label, value }) => (
          <div key={label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {icon}
              <span className="text-sm text-[#9B97B0]">{label}</span>
            </div>
            <span className="text-sm font-semibold text-white truncate max-w-[100px]">
              {value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
