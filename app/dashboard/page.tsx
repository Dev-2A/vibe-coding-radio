'use client';

import { useMemo } from 'react';
import { useSession } from '@/src/hooks/useSession';
import StatCard from '@/src/components/dashboard/StatCard';
import WeeklyBarChart from '@/src/components/dashboard/WeeklyBarChart';
import MoodDonutChart from '@/src/components/dashboard/MoodDonutChart';
import LanguageChart from '@/src/components/dashboard/LanguageChart';
import ProjectList from '@/src/components/dashboard/ProjectList';
import StreakCard from '@/src/components/dashboard/StreakCard';
import ActivityHeatmap from '@/src/components/dashboard/ActivityHeatmap';
import { Target, Clock, Flame, FolderGit2 } from 'lucide-react';
import { Mood } from '@/src/types';

export default function DashboardPage() {
  const { weekSessions, weekStats } = useSession();

  // 요일별 집중 시간 계산
  const dailyMinutes = useMemo(() => {
    const result = [0, 0, 0, 0, 0, 0, 0];
    weekSessions.forEach((s) => {
      const day = new Date(s.startedAt).getDay();
      const index = day === 0 ? 6 : day - 1;
      result[index] += s.focusMinutes;
    });
    return result;
  }, [weekSessions]);

  // 기분 분포 계산
  const moodDistribution = useMemo(() => {
    const result: Record<Mood, number> = {
      '🔥': 0,
      '😊': 0,
      '😐': 0,
      '😩': 0,
      '💀': 0,
    };
    weekSessions.forEach((s) => {
      result[s.mood]++;
    });
    return result;
  }, [weekSessions]);

  // 언어별 집계
  const languageData = useMemo(() => {
    const map: Record<string, number> = {};
    weekSessions.forEach((s) => {
      map[s.language] = (map[s.language] || 0) + s.focusMinutes;
    });
    return Object.entries(map)
      .map(([language, minutes]) => ({ language, minutes }))
      .sort((a, b) => b.minutes - a.minutes);
  }, [weekSessions]);

  // 프로젝트별 집계
  const projectData = useMemo(() => {
    const map: Record<string, { minutes: number; sessions: number }> = {};
    weekSessions.forEach((s) => {
      if (!map[s.projectName]) {
        map[s.projectName] = { minutes: 0, sessions: 0 };
      }
      map[s.projectName].minutes += s.focusMinutes;
      map[s.projectName].sessions++;
    });
    return Object.entries(map)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.minutes - a.minutes);
  }, [weekSessions]);

  // 시간 포맷
  const formatMinutes = (m: number) => {
    if (m < 60) return `${m}m`;
    const h = Math.floor(m / 60);
    const min = m % 60;
    return min > 0 ? `${h}h ${min}m` : `${h}h`;
  };

  // 이번 주 날짜 범위
  const weekRange = useMemo(() => {
    const now = new Date();
    const day = now.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    const monday = new Date(now);
    monday.setDate(now.getDate() + diff);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    const format = (d: Date) =>
      d.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });

    return `${format(monday)} - ${format(sunday)}`;
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      {/* 헤더 */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white">📊 Weekly Vibe Report</h2>
        <p className="text-sm text-[#9B97B0] mt-1">{weekRange}</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={<Clock className="h-5 w-5" />}
          label="Total Focus"
          value={formatMinutes(weekStats.focusMinutes)}
          color="violet"
        />
        <StatCard
          icon={<Target className="h-5 w-5" />}
          label="Pomodoros"
          value={weekStats.pomodoros}
          subValue={`${weekStats.sessions} sessions`}
          color="cyan"
        />
        <StatCard
          icon={<Flame className="h-5 w-5" />}
          label="Top Language"
          value={weekStats.topLanguage}
          color="amber"
        />
        <StatCard
          icon={<FolderGit2 className="h-5 w-5" />}
          label="Top Project"
          value={
            weekStats.topProject.length > 10
              ? weekStats.topProject.slice(0, 10) + '...'
              : weekStats.topProject
          }
          color="emerald"
        />
      </div>

      {/* 스트릭 + 히트맵 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <StreakCard />
        <ActivityHeatmap />
      </div>

      {/* 차트 그리드 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <WeeklyBarChart dailyMinutes={dailyMinutes} />
        <MoodDonutChart moodDistribution={moodDistribution} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <LanguageChart languageData={languageData} />
        <ProjectList projectData={projectData} />
      </div>
    </div>
  );
}
