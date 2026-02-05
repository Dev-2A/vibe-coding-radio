'use client';

import { useEffect } from 'react';
import { useSessionStore } from '@/src/stores/sessionStore';
import { useMusicStore } from '@/src/stores/musicStore';

export default function StoreHydration() {
  useEffect(() => {
    useSessionStore.persist.rehydrate();
    useMusicStore.persist.rehydrate();
  }, []);

  return null;
}
