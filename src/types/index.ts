// ===== 타이머 관련 =====
export type TimerMode = 'focus' | 'shortBreak' | 'longBreak';

export type TimerStatus = 'idle' | 'running' | 'paused';

export interface TimerConfig {
  focus: number;        // 분 단위
  shortBreak: number;
  longBreak: number;
  longBreakInterval: number;  // 몇 회 focus 후 longBreak
}

// ===== 세션 관련 =====
export type Mood = '🔥' | '😊' | '😐' | '😩' | '💀';

export interface CodingSession {
  id: string;
  projectName: string;
  language: string;
  mood: Mood;
  focusMinutes: number;     // 실제 집중한 시간 (분)
  completedPomodoros: number;
  startedAt: string;        // ISO string
  endedAt: string;          // ISO string
  note?: string;
}

// ===== 음악 관련 =====
export interface SpotifyTrack {
  id: string;
  name: string;
  artist: string;
  albumArt: string;
  uri: string;
}

// ===== 대시보드 관련 =====
export interface WeeklyReport {
  weekStart: string;
  weekEnd: string;
  totalFocusMinutes: number;
  totalSessions: number;
  topLanguage: string;
  topProject: string;
  moodDistribution: Record<Mood, number>;
  dailyFocusMinutes: number[];    // [Mon, Tue, ..., Sun]
}

// ===== 음악 관련 =====
export interface YouTubeVideo {
  id: string;
  title: string;
  channelTitle: string;
  thumbnail: string;
}
