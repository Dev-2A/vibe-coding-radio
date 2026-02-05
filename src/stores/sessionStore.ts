import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CodingSession, Mood } from '@/src/types';
import { generateId } from '@/src/lib/utils';

interface SessionDraft {
  projectName: string;
  language: string;
  mood: Mood;
  note: string;
}

interface SessionState {
  // 저장된 세션 목록
  sessions: CodingSession[];

  // 현재 진행 중인 세션 (타이머 시작 시 생성)
  activeSession: {
    id: string;
    projectName: string;
    language: string;
    startedAt: string;
    focusMinutes: number;
    completedPomodoros: number;
  } | null;

  // 세션 시작/종료 폼용 임시 데이터
  draft: SessionDraft;

  // 액션
  setDraft: (partial: Partial<SessionDraft>) => void;
  startSession: () => void;
  addPomodoro: (focusMinutes: number) => void;
  endSession: (mood: Mood, note?: string) => void;
  cancelSession: () => void;
  deleteSession: (id: string) => void;
  clearAllSessions: () => void;
}

const DEFAULT_DRAFT: SessionDraft = {
  projectName: '',
  language: 'TypeScript',
  mood: '😊',
  note: '',
};

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      sessions: [],
      activeSession: null,
      draft: DEFAULT_DRAFT,

      setDraft: (partial) => {
        set((state) => ({
          draft: { ...state.draft, ...partial },
        }));
      },

      startSession: () => {
        const { draft } = get();
        if (!draft.projectName.trim()) return;

        set({
          activeSession: {
            id: generateId(),
            projectName: draft.projectName.trim(),
            language: draft.language,
            startedAt: new Date().toISOString(),
            focusMinutes: 0,
            completedPomodoros: 0,
          },
        });
      },

      addPomodoro: (focusMinutes) => {
        const { activeSession } = get();
        if (!activeSession) return;

        set({
          activeSession: {
            ...activeSession,
            focusMinutes: activeSession.focusMinutes + focusMinutes,
            completedPomodoros: activeSession.completedPomodoros + 1,
          },
        });
      },

      endSession: (mood, note) => {
        const { activeSession, sessions } = get();
        if (!activeSession) return;

        const completedSession: CodingSession = {
          id: activeSession.id,
          projectName: activeSession.projectName,
          language: activeSession.language,
          mood,
          focusMinutes: activeSession.focusMinutes,
          completedPomodoros: activeSession.completedPomodoros,
          startedAt: activeSession.startedAt,
          endedAt: new Date().toISOString(),
          note: note?.trim() || undefined,
        };

        set({
          sessions: [completedSession, ...sessions],
          activeSession: null,
          draft: { ...DEFAULT_DRAFT, language: activeSession.language },
        });
      },

      cancelSession: () => {
        set({ activeSession: null });
      },

      deleteSession: (id) => {
        set((state) => ({
          sessions: state.sessions.filter((s) => s.id !== id),
        }));
      },

      clearAllSessions: () => {
        set({ sessions: [] });
      },
    }),
    {
      name: 'vibe-coding-sessions',
      partialize: (state) => ({
        sessions: state.sessions,
        draft: state.draft,
        // activeSession은 저장 안 함 (새로고침 시 초기화)
      }),
    }
  )
);
