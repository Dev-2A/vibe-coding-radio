'use client';

import { Bar } from 'react-chartjs-2';
import '@/src/lib/chartConfig';
import Card, { CardTitle } from '@/src/components/ui/Card';

interface LanguageChartProps {
  languageData: { language: string; minutes: number }[];
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: 'rgb(59, 130, 246)',
  JavaScript: 'rgb(234, 179, 8)',
  Python: 'rgb(34, 197, 94)',
  Java: 'rgb(249, 115, 22)',
  'C++': 'rgb(236, 72, 153)',
  Rust: 'rgb(239, 68, 68)',
  Go: 'rgb(6, 182, 212)',
  Kotlin: 'rgb(168, 85, 247)',
  Swift: 'rgb(251, 146, 60)',
  Ruby: 'rgb(248, 113, 113)',
  PHP: 'rgb(99, 102, 241)',
  'C#': 'rgb(139, 92, 246)',
  Other: 'rgb(107, 114, 128)',
};

export default function LanguageChart({ languageData }: LanguageChartProps) {
  if (languageData.length === 0) {
    return (
      <Card>
        <CardTitle>💻 Languages</CardTitle>
        <div className="h-36 flex items-center justify-center text-[#9B97B0] text-sm">
          이번 주 기록이 없어요
        </div>
      </Card>
    );
  }

  // 상위 5개만
  const top5 = languageData.slice(0, 5);

  const data = {
    labels: top5.map((d) => d.language),
    datasets: [
      {
        data: top5.map((d) => d.minutes),
        backgroundColor: top5.map((d) => LANG_COLORS[d.language] || LANG_COLORS.Other),
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    indexAxis: 'y' as const,
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
          label: (context: any) => {
            const mins = context.raw;
            if (mins < 60) return `${mins}분`;
            return `${Math.floor(mins / 60)}시간 ${mins % 60}분`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(46, 43, 63, 0.5)' },
        ticks: {
          color: '#9B97B0',
          font: { size: 11 },
          callback: (value: number) => (value < 60 ? `${value}m` : `${Math.floor(value / 60)}h`),
        },
        beginAtZero: true,
      },
      y: {
        grid: { display: false },
        ticks: { color: '#9B97B0', font: { size: 11 } },
      },
    },
  };

  return (
    <Card>
      <CardTitle>💻 Languages</CardTitle>
      <div className="h-40">
        <Bar data={data} options={options as any} />
      </div>
    </Card>
  );
}
