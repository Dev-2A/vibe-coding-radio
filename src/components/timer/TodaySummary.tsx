'use client';

import { useTimer } from "@/src/hooks/useTimer";
import Card, { CardTitle } from "../ui/Card";
import { Flame, Clock, Target } from 'lucide-react';

export default function TodaySummary() {
  const { completedPomodoros, config } = useTimer();
  const focusMinutes = completedPomodoros * config.focus;

  const stats = [
    {
      icon: <Target className="h-4 w-4 text-violet-400" />,
      label: 'Pomodoros',
      value: completedPomodoros.toString(),
    },
    {
      icon: <Clock className="h-4 w-4 text-cyan-400" />,
      label: 'Focus Time',
      value: focusMinutes < 60
        ? `${focusMinutes}m`
        : `${Math.floor(focusMinutes / 60)}h ${focusMinutes % 60}m`,
    },
    {
      icon: <Flame className="h-4 w-4 text-amber-400" />,
      label: 'Streak',
      value: completedPomodoros > 0 ? '🔥' : '-',
    },
  ];

  return (
    <Card>
      <CardTitle>📊 Today</CardTitle>
      <div className="space-y-3">
        {stats.map(({ icon, label, value }) => (
          <div key={label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {icon}
              <span className="text-sm text-[#9B97B0]">{label}</span>
            </div>
            <span className="text-sm font-semibold text-white">{value}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
