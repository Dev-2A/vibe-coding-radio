import { CodingSession, Mood, WeeklyReport } from "../types";

/**
 * 고유 ID 생성
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * 초(seconds)를 MM:SS 형식으로 변환
 */
export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

/**
 * 분(minutes)을 "Xh Ym" 형식으로 변환
 */
export function formatMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

/**
 * 이번 주 월요일 날짜를 반환 (ISO string)
 */
export function getWeekStart(date: Date = new Date()): string {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);  // 월요일 기준
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

/**
 * 세션 배열로부터 주간 리포트 생성
 */
export function generateWeeklyReport(sessions: CodingSession[]): WeeklyReport {
  const weekStart = getWeekStart();
  const weekEnd = new Date(
    new Date(weekStart).getTime() + 6 * 24 * 60 * 60 * 1000
  ).toISOString();

  // 이번 주 세션만 필터링
  const weeklySessions = sessions.filter((s) => {
    return s.startedAt >= weekStart && s.startedAt <= weekEnd;
  });

  // 언어별 집계
  const langCount: Record<string, number> = {};
  // 프로젝트별 집계
  const projCount: Record<string, number> = {};
  // 기분 분포
  const moodDist: Record<Mood, number> = {
    '🔥': 0, '😊': 0, '😐': 0, '😩': 0, '💀': 0,
  };
  // 요일별 집중 시간
  const dailyFocus = [0, 0, 0, 0, 0, 0, 0];

  let totalFocus = 0;

  weeklySessions.forEach((s) => {
    totalFocus += s.focusMinutes;
    langCount[s.language] = (langCount[s.language] || 0) + s.focusMinutes;
    projCount[s.projectName] = (projCount[s.projectName] || 0) + s.focusMinutes;
    moodDist[s.mood]++;

    const dayIndex = (new Date(s.startedAt).getDay() + 6) % 7;  // 월=0, 일=6
    dailyFocus[dayIndex] += s.focusMinutes;
  });

  const topLanguage =
    Object.entries(langCount).sort((a, b) => b[1] - a[1])[0]?.[0] || '-';
  const topProject =
    Object.entries(projCount).sort((a, b) => b[1] - a[1])[0]?.[0] || '-';
  
  return {
    weekStart,
    weekEnd,
    totalFocusMinutes: totalFocus,
    totalSessions: weeklySessions.length,
    topLanguage,
    topProject,
    moodDistribution: moodDist,
    dailyFocusMinutes: dailyFocus,
  };
}
