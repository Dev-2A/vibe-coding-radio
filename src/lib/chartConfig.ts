import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// Chart.js 컴포넌트 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// 공통 차트 옵션
export const chartColors = {
  violet: 'rgb(139, 92, 246)',
  violetFaded: 'rgba(139, 92, 246, 0.5)',
  cyan: 'rgb(6, 182, 212)',
  cyanFaded: 'rgba(6, 182, 212, 0.5)',
  amber: 'rgb(245, 158, 11)',
  amberFaded: 'rgba(245, 158, 11, 0.5)',
  emerald: 'rgb(16, 185, 129)',
  emeraldFaded: 'rgba(16, 185, 129, 0.5)',
  red: 'rgb(239, 68, 68)',
  redFaded: 'rgba(239, 68, 68, 0.5)',
  gray: 'rgb(107, 114, 128)',
  grayFaded: 'rgba(107, 114, 128, 0.5)',
};

export const chartDefaults = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(46, 43, 63, 0.5)',
      },
      ticks: {
        color: '#9B97B0',
      },
    },
    y: {
      grid: {
        color: 'rgba(46, 43, 63, 0.5)',
      },
      ticks: {
        color: '#9B97B0',
      },
    },
  },
};
