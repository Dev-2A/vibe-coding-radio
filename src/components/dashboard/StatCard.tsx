interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subValue?: string;
  color?: 'violet' | 'cyan' | 'amber' | 'emerald';
}

const colorMap = {
  violet: 'bg-violet-600/10 border-violet-600/20',
  cyan: 'bg-cyan-600/10 border-cyan-600/20',
  amber: 'bg-amber-600/10 border-amber-600/20',
  emerald: 'bg-emerald-600/10 border-emerald-600/20',
}

export default function StatCard({
  icon,
  label,
  value,
  subValue,
  color = 'violet',
}: StatCardProps) {
  return (
    <div className={`rounded-2xl border p-5 ${colorMap[color]}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-[#9B97B0] mb-1">{label}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
          {subValue && (
            <p className="text-xs text-[#9B97B0] mt-1">{subValue}</p>
          )}
        </div>
        <div className="text-[#9B97B0]">{icon}</div>
      </div>
    </div>
  );
}
