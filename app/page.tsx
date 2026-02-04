import { Timer, ListMusic, BarChart3 } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-2xl">
      {/* 인사말 */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          Welcome back, Coder 🎧
        </h2>
        <p className="text-[#9B97B0]">
          오늘도 좋은 바이브로 코딩할 준비 됐어?
        </p>
      </div>

      {/* 퀵 액션 카드들 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <QuickCard
          icon={<Timer className="h-6 w-6" />}
          title="Focus Timer"
          desc="25분 집중 세션 시작"
          color="violet"
        />
        <QuickCard
          icon={<ListMusic className="h-6 w-6" />}
          title="Music"
          desc="코딩 플레이리스트 재생"
          color="cyan"
        />
        <QuickCard
          icon={<BarChart3 className="h-6 w-6" />}
          title="Dashboard"
          desc="이번 주 바이브 리포트"
          color="amber"
        />
      </div>
    </div>
  );
}

function QuickCard({
  icon,
  title,
  desc,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  color: 'violet' | 'cyan' | 'amber';
}) {
  const colorMap = {
    violet: 'bg-violet-600/10 text-violet-400 border-violet-600/20',
    cyan: 'bg-cyan-600/10 text-cyan-400 border-cyan-600/20',
    amber: 'bg-amber-600/10 text-amber-400 border-amber-600/20',
  };

  return (
    <div
      className={`rounded-xl border p-5 transition-all duration-200 hover:scale-[1.02] cursor-pointer ${colorMap[color]}`}
    >
      <div className="mb-3">{icon}</div>
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <p className="mt-1 text-xs text-[#9B97B0]">{desc}</p>
    </div>
  );
}
