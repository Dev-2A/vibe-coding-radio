import TimerWidget from '@/src/components/timer/TimerWidget';
import TimerSettings from '@/src/components/timer/TimerSettings';
import TodaySummary from '@/src/components/timer/TodaySummary';
import SessionPanel from '@/src/components/session/SessionPanel';

export default function Home() {
  return (
    <div className="flex flex-col lg:flex-row items-start justify-center gap-8 min-h-[calc(100vh-8rem)]">
      {/* 좌측 사이드 */}
      <div className="hidden lg:flex flex-col gap-4 w-72 pt-12">
        <TodaySummary />
        <SessionPanel />
      </div>

      {/* 중앙 타이머 */}
      <div className="flex flex-col items-center justify-center pt-8 lg:pt-12">
        <TimerWidget />
      </div>

      {/* 우측 사이드 */}
      <div className="w-full lg:w-64 pt-4 lg:pt-12">
        <TimerSettings />
        {/* 모바일에서만 표시 */}
        <div className="lg:hidden mt-4 space-y-4">
          <TodaySummary />
          <SessionPanel />
        </div>
      </div>
    </div>
  );
}
