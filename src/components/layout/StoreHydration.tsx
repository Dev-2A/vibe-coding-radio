'use client';

import { useEffect } from "react";
import { useSessionStore } from "@/src/stores/sessionStore";

export default function StoreHydration() {
  useEffect(() => {
    useSessionStore.persist.rehydrate();
  }, []);

  return null;
}
