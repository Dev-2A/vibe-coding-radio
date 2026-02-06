'use client';

import { useMemo } from "react";
import { useSessionStore } from "../stores/sessionStore";

interface StreakData {
  currentStreak: number;      // 현재 연속 일수
  longestStreak: number;      // 최장 연속 일수
  totalDays: number;          // 총 코딩한 날 수
  lastActiveDate: string | null;
}

export function useStreak(): StreakData {
  const sessions = useSessionStore((s) => s.sessions);

  return useMemo(() => {
    if (sessions.length === 0) {
      return {
        currentStreak: 0,
        longestStreak: 0,
        totalDays: 0,
        lastActiveDate: null,
      };
    }

    // 날짜별로 세션이 있는지 Set으로 관리
    const activeDates = new Set<string>();
    sessions.forEach((s) => {
      const date = new Date(s.startedAt).toISOString().split('T')[0];
      activeDates.add(date);
    });

    const sortedDates = Array.from(activeDates).sort().reverse();
    const totalDays = sortedDates.length;
    const lastActiveDate = sortedDates[0];

    // 오늘 날짜
    const  today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    // 현재 스트릭 계산
    let currentStreak = 0;
    let checkDate = activeDates.has(today) ? today : yesterday;

    // 오늘이나 어제에 활동이 없으면 스트릭 0
    if (!activeDates.has(today) && !activeDates.has(yesterday)) {
      currentStreak = 0;
    } else {
      // 연속 날짜 카운트
      let d = new Date(checkDate);
      while (activeDates.has(d.toISOString().split('T')[0])) {
        currentStreak++;
        d = new Date(d.getTime() - 86400000);
      }
    }

    // 최장 스트릭 계산
    let longestStreak = 0;
    let tempStreak = 0;
    let prevDate: Date | null = null;

    sortedDates.reverse().forEach((dateStr) => {
      const date = new Date(dateStr);
      if (prevDate === null) {
        tempStreak = 1;
      } else {
        const diff = (date.getTime() - prevDate.getTime()) / 86400000;
        if (diff === 1) {
          tempStreak++;
        } else {
          longestStreak = Math.max(longestStreak, tempStreak);
          tempStreak = 1;
        }
      }
      prevDate = date;
    });
    longestStreak = Math.max(longestStreak, tempStreak);

    return {
      currentStreak,
      longestStreak,
      totalDays,
      lastActiveDate,
    };
  }, [sessions]);
}
