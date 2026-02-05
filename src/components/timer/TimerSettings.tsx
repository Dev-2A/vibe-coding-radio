'use client';

import { useTimer } from "@/src/hooks/useTimer";
import Card, { CardTitle } from "../ui/Card";
import NumberInput from "../ui/NumberInput";

export default function TimerSettings() {
  const { config, setConfig, status } = useTimer();
  const isRunning = status === 'running';

  return (
    <Card>
      <CardTitle>⚙️ Timer Settings</CardTitle>

      <div className="space-y-4">
        <NumberInput
          label="🍅 Focus"
          value={config.focus}
          onChange={(v) => setConfig({ focus: v })}
          min={1}
          max={120}
          step={5}
        />
        <NumberInput
          label="☕ Short Break"
          value={config.shortBreak}
          onChange={(v) => setConfig({ shortBreak: v })}
          min={1}
          max={30}
        />
        <NumberInput
          label="🌴 Long Break"
          value={config.longBreak}
          onChange={(v) => setConfig({ longBreak: v })}
          min={1}
          max={60}
          step={5}
        />
        <NumberInput
          label="🔁 Long Break Every"
          value={config.longBreakInterval}
          onChange={(v) => setConfig({ longBreakInterval: v })}
          min={2}
          max={10}
          unit="sessions"
        />

        {isRunning && (
          <p className="text-xs text-amber-400/80 mt-2">
            ⚠️ 타이머 실행 중에는 변경사항이 다음 세션부터 적용돼요.
          </p>
        )}
      </div>
    </Card>
  );
}
