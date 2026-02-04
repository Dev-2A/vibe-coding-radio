import TimerWidget from '@/src/components/timer/TimerWidget';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
      <TimerWidget />
    </div>
  );
}
