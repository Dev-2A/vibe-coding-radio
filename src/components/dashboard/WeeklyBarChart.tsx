'use client';

import { Bar } from "react-chartjs-2";
import "@/src/lib/chartConfig";
import { chartColors } from "@/src/lib/chartConfig";
import Card, { CardTitle } from "../ui/Card";

interface WeeklyBarChartProps {
  dailyMinutes: number[]; // [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
}

export default function WeeklyBarChart({ dailyMinutes }: WeeklyBarChartProps) {
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date().getDay();
  const todayIndex = today === 0 ? 6 : today - 1; // 월요일 = 0

  const data = {
    labels,
    datasets: [
      {
        data: dailyMinutes,
        backgroundColor: labels.map((_, i) =>
          i === todayIndex ? chartColors.violet : chartColors.violetFaded
        ),
        borderRadius: 6,
        borderSkipped: false,
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
        grid: { display: false },
        ticks: { color: '#9B97B0', font: { size: 11 } },
      },
      y: {
        grid: { color: 'rgba(46, 43, 63, 0.5)' },
        ticks: {
          color: '#9B97B0',
          font: { size: 11 },
          callback: (value: number) => (value < 60 ? `${value}m` : `${value / 60}h`),
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <Card>
      <CardTitle>📊 Daily Focus Time</CardTitle>
      <div className="h-48">
        <Bar data={data} options={options as any} />
      </div>
    </Card>
  );
}
