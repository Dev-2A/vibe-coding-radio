'use client';

import { useSession } from "@/src/hooks/useSession";
import Card, { CardTitle } from "../ui/Card";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";
import { LANGUAGES } from "@/src/lib/constants";
import { Play } from "lucide-react";

interface SessionStartFormProps {
  onStart?: () => void;
}

export default function SessionStartForm({ onStart }: SessionStartFormProps) {
  const { draft, setDraft, startSession, activeSession } = useSession();

  // 이미 활성 세션이 있으면 표시 안 함
  if (activeSession) return null;

  const handleStart = () => {
    const success = startSession();
    if (success && onStart) {
      onStart();
    }
  };

  const canStart = draft.projectName.trim().length > 0;

  return (
    <Card>
      <CardTitle>🚀 Start Coding Session</CardTitle>

      <div className="space-y-4">
        <Input
          label="Project Name"
          value={draft.projectName}
          onChange={(v) => setDraft({ projectName: v })}
          placeholder="e.g., vibe-coding-radio"
          maxLength={50}
        />

        <Select
          label="Language"
          value={draft.language}
          onChange={(v) => setDraft({ language: v })}
          options={LANGUAGES}
        />

        <Button
          onClick={handleStart}
          disabled={!canStart}
          fullWidth
        >
          <Play className="h-4 w-4" />
          Start Session
        </Button>

        {!canStart && (
          <p className="text-xs text-[#9B97B0] text-center">
            프로젝트명을 입력하면 세션을 시작할 수 있어요
          </p>
        )}
      </div>
    </Card>
  );
}
