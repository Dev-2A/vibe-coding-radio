import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  // 타이머 설정
  autoPlayMusicOnStart: boolean;
  autoPauseMusicOnBreak: boolean;
  showNotifications: boolean;

  // 액션
  toggleAutoPlayMusic: () => void;
  toggleAutoPauseMusic: () => void;
  toggleNotifications: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      autoPlayMusicOnStart: false,
      autoPauseMusicOnBreak: false,
      showNotifications: true,

      toggleAutoPlayMusic: () =>
        set((state) => ({ autoPlayMusicOnStart: !state.autoPlayMusicOnStart })),
      toggleAutoPauseMusic: () =>
        set((state) => ({ autoPauseMusicOnBreak: !state.autoPauseMusicOnBreak })),
      toggleNotifications: () =>
        set((state) => ({ showNotifications: !state.showNotifications })),
    }),
    {
      name: 'vibe-settings',
      skipHydration: true,
    }
  )
);
