import { TimerConfig } from "../types";

export const DEFAULT_TIMER_CONFIG: TimerConfig = {
  focus: 25,
  shortBreak: 5,
  longBreak: 15,
  longBreakInterval: 4,
};

export const LANGUAGES = [
  'TypeScript',
  'JavaScript',
  'Python',
  'Java',
  'C++',
  'Rust',
  'Go',
  'Kotlin',
  'Swift',
  'Ruby',
  'PHP',
  'C#',
  'Other',
] as const;

export const MOODS = [
  { emoji: '🔥', label: '불타오르는' },
  { emoji: '😊', label: '기분 좋은' },
  { emoji: '😐', label: '그저 그런' },
  { emoji: '😩', label: '힘든' },
  { emoji: '💀', label: '죽을 맛' },
] as const;

export const CHART_COLORS = {
  primary: '#8B5CF6',      // violet-500
  secondary: '#06B6D4',    // cyan-500
  accent: '#F59E0B',       // amber-500
  success: '#10B981',      // emerald-500
  danger: '#EF4444',       // red-500
  muted: '#6B7280',        // gray-500
  background: '#1E1B2E',   // 다크 배경
  surface: '#2A2740',      // 카드 배경
  border: '#3D3A50',       // 테두리
} as const;
