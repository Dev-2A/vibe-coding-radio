import TimerSettings from '@/src/components/timer/TimerSettings';

export default function SettingsPage() {
  return (
    <div className="max-w-md">
      <h2 className="text-xl font-bold text-white mb-6">⚙️ Settings</h2>
      <div className="space-y-4">
        <TimerSettings />
        {/* 이후 단계에서 Spotify 설정, 테마 설정 등 추가 */}
      </div>
    </div>
  );
}
