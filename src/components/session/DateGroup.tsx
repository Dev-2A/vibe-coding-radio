interface DateGroupProps {
  date: string;
  sessionCount: number;
  totalMinutes: number;
}

export default function DateGroup({ date, sessionCount, totalMinutes }: DateGroupProps) {
  const formatMinutes = (m: number) => {
    if (m < 60) return `${m}m`;
    return `${Math.floor(m / 60)}h ${m % 60}m`;
  };

  return (
    <div className="flex items-center gap-3 py-3">
      <span className="text-xs font-semibold text-white">{date}</span>
      <div className="h-px flex-1 bg-[#2E2B3F]" />
      <span className="text-[11px] text-[#9B97B0]">
        {sessionCount}sessions · {formatMinutes(totalMinutes)}
      </span>
    </div>
  );
}
