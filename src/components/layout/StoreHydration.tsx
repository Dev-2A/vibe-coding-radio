'use client';

import { useEffect } from 'react';
import { useSessionStore } from '@/src/stores/sessionStore';
import { useMusicStore } from '@/src/stores/musicStore';
import { useSettingsStore } from '@/src/stores/settingsStore';

export default function StoreHydration() {
  useEffect(() => {
    useSessionStore.persist.rehydrate();
    useMusicStore.persist.rehydrate();
    useSettingsStore.persist.rehydrate();
  }, []);

  return null;
}
