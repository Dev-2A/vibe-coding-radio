import { Coffee } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#242136] mb-4">
        <Coffee className="h-8 w-8 text-[#9B97B0]" />
      </div>
      <h3 className="text-sm font-semibold text-white mb-1">
        아직 기록된 세션이 없어요
      </h3>
      <p className="text-xs text-[#9B97B0] max-w-[240px]">
        홈에서 세션을 시작하고 뽀모도로를 완료하면 여기에 기록돼요 🍅
      </p>
    </div>
  );
}
