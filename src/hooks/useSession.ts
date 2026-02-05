'use client';

import { useMemo } from 'react';
import { useSessionStore } from '@/src/stores/sessionStore';
import { useTimerStore } from '@/src/stores/timerStore';
import { CodingSession, Mood } from '@/src/types';

export function useSession() {
  const sessionStore = useSessionStore();
  const timerConfig = useTimerStore((s) => s.config);

  // 오늘 세션만 필터
  const todaySessions = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString();

    return sessionStore.sessions.filter((s) => s.startedAt >= todayStr);
  }, [sessionStore.sessions]);

  // 이번 주 세션만 필터
  const weekSessions = useMemo(() => {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1); // 월요일
    const weekStart = new Date(now);
    weekStart.setDate(diff);
    weekStart.setHours(0, 0, 0, 0);
    const weekStartStr = weekStart.toISOString();

    return sessionStore.sessions.filter((s) => s.startedAt >= weekStartStr);
  }, [sessionStore.sessions]);

  // 오늘 통계
  const todayStats = useMemo(() => {
    const totalMinutes = todaySessions.reduce((sum, s) => sum + s.focusMinutes, 0);
    const totalPomodoros = todaySessions.reduce((sum, s) => sum + s.completedPomodoros, 0);
    return {
      sessions: todaySessions.length,
      focusMinutes: totalMinutes,
      pomodoros: totalPomodoros,
    };
  }, [todaySessions]);

  // 주간 통계
  const weekStats = useMemo(() => {
    const totalMinutes = weekSessions.reduce((sum, s) => sum + s.focusMinutes, 0);
    const totalPomodoros = weekSessions.reduce((sum, s) => sum + s.completedPomodoros, 0);

    // 언어별 집계
    const langMap: Record<string, number> = {};
    weekSessions.forEach((s) => {
      langMap[s.language] = (langMap[s.language] || 0) + s.focusMinutes;
    });
    const topLanguage = Object.entries(langMap).sort((a, b) => b[1] - a[1])[0]?.[0] || '-';

    // 프로젝트별 집계
    const projMap: Record<string, number> = {};
    weekSessions.forEach((s) => {
      projMap[s.projectName] = (projMap[s.projectName] || 0) + s.focusMinutes;
    });
    const topProject = Object.entries(projMap).sort((a, b) => b[1] - a[1])[0]?.[0] || '-';

    return {
      sessions: weekSessions.length,
      focusMinutes: totalMinutes,
      pomodoros: totalPomodoros,
      topLanguage,
      topProject,
    };
  }, [weekSessions]);

  // 세션 시작 (프로젝트명 필수 체크)
  const startSession = () => {
    if (!sessionStore.draft.projectName.trim()) {
      return false;
    }
    sessionStore.startSession();
    return true;
  };

  // 뽀모도로 완료 시 호출 (타이머에서 호출됨)
  const recordPomodoro = () => {
    if (sessionStore.activeSession) {
      sessionStore.addPomodoro(timerConfig.focus);
    }
  };

  // 세션 종료
  const endSession = (mood: Mood, note?: string) => {
    sessionStore.endSession(mood, note);
  };

  return {
    // 상태
    sessions: sessionStore.sessions,
    activeSession: sessionStore.activeSession,
    draft: sessionStore.draft,
    todaySessions,
    weekSessions,
    todayStats,
    weekStats,

    // 액션
    setDraft: sessionStore.setDraft,
    startSession,
    recordPomodoro,
    endSession,
    cancelSession: sessionStore.cancelSession,
    deleteSession: sessionStore.deleteSession,
    clearAllSessions: sessionStore.clearAllSessions,
  };
}
