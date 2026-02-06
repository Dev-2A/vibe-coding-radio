'use client';

import { Doughnut } from 'react-chartjs-2';
import '@/src/lib/chartConfig';
import Card, { CardTitle } from '@/src/components/ui/Card';
import { Mood } from '@/src/types';

interface MoodDonutChartProps {
  moodDistribution: Record<Mood, number>;
}

const MOOD_CONFIG: { emoji: Mood; label: string; color: string }[] = [
  { emoji: '🔥', label: '불타오르는', color: 'rgb(239, 68, 68)' },
  { emoji: '😊', label: '기분 좋은', color: 'rgb(16, 185, 129)' },
  { emoji: '😐', label: '그저 그런', color: 'rgb(107, 114, 128)' },
  { emoji: '😩', label: '힘든', color: 'rgb(245, 158, 11)' },
  { emoji: '💀', label: '죽을 맛', color: 'rgb(139, 92, 246)' },
];

export default function MoodDonutChart({ moodDistribution }: MoodDonutChartProps) {
  const hasData = Object.values(moodDistribution).some((v) => v > 0);

  const data = {
    labels: MOOD_CONFIG.map((m) => `${m.emoji} ${m.label}`),
    datasets: [
      {
        data: MOOD_CONFIG.map((m) => moodDistribution[m.emoji] || 0),
        backgroundColor: MOOD_CONFIG.map((m) => m.color),
        borderWidth: 0,
        cutout: '65%',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#242136',
        titleColor: '#fff',
        bodyColor: '#9B97B0',
        borderColor: '#2E2B3F',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (context: any) => `${context.raw}회`,
        },
      },
    },
  };

  return (
    <Card>
      <CardTitle>😊 Mood Distribution</CardTitle>
      {hasData ? (
        <div className="flex items-center gap-6">
          <div className="h-36 w-36 shrink-0">
            <Doughnut data={data} options={options as any} />
          </div>
          <div className="space-y-2">
            {MOOD_CONFIG.map((m) => {
              const count = moodDistribution[m.emoji] || 0;
              if (count === 0) return null;
              return (
                <div key={m.emoji} className="flex items-center gap-2 text-sm">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: m.color }}
                  />
                  <span className="text-white">{m.emoji}</span>
                  <span className="text-[#9B97B0]">{count}회</span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="h-36 flex items-center justify-center text-[#9B97B0] text-sm">
          이번 주 기록이 없어요
        </div>
      )}
    </Card>
  );
}
