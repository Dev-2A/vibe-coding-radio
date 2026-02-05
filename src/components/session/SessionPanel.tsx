'use client';

import { useSession } from "@/src/hooks/useSession";
import SessionStartForm from "./SessionStartForm";
import SessionEndForm from "./SessionEndForm";

export default function SessionPanel() {
  const { activeSession } = useSession();

  return (
    <div>
      {activeSession ? <SessionEndForm /> : <SessionStartForm />}
    </div>
  );
}
