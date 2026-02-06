'use client';

import TimerSettings from '@/src/components/timer/TimerSettings';
import Card, { CardTitle } from '@/src/components/ui/Card';
import { useSettingsStore } from '@/src/stores/settingsStore';
import { Bell, Music, Pause } from 'lucide-react';

export default function SettingsPage() {
  const {
    autoPlayMusicOnStart,
    autoPauseMusicOnBreak,
    showNotifications,
    toggleAutoPlayMusic,
    toggleAutoPauseMusic,
    toggleNotifications,
  } = useSettingsStore();

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-bold text-white mb-6">⚙️ Settings</h2>

      <div className="space-y-4">
        {/* 타이머 설정 */}
        <TimerSettings />

        {/* 연동 설정 */}
        <Card>
          <CardTitle>🔗 Integrations</CardTitle>
          <div className="space-y-3">
            <ToggleRow
              icon={<Music className="h-4 w-4 text-violet-400" />}
              label="Focus 시작 시 음악 자동 재생"
              description="타이머 시작하면 음악도 같이 재생"
              checked={autoPlayMusicOnStart}
              onChange={toggleAutoPlayMusic}
            />
            <ToggleRow
              icon={<Pause className="h-4 w-4 text-cyan-400" />}
              label="Break 시간에 음악 일시정지"
              description="쉬는 시간엔 조용히"
              checked={autoPauseMusicOnBreak}
              onChange={toggleAutoPauseMusic}
            />
            <ToggleRow
              icon={<Bell className="h-4 w-4 text-amber-400" />}
              label="브라우저 알림"
              description="타이머 종료 시 데스크탑 알림"
              checked={showNotifications}
              onChange={toggleNotifications}
            />
          </div>
        </Card>

        {/* 데이터 관리 */}
        <Card>
          <CardTitle>💾 Data</CardTitle>
          <p className="text-xs text-[#9B97B0]">
            모든 데이터는 브라우저 LocalStorage에 저장돼요.
            <br />
            브라우저 데이터를 지우면 기록도 함께 사라져요.
          </p>
        </Card>
      </div>
    </div>
  );
}

function ToggleRow({
  icon,
  label,
  description,
  checked,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-start gap-3">
        <div className="mt-0.5">{icon}</div>
        <div>
          <p className="text-sm text-white">{label}</p>
          <p className="text-[11px] text-[#9B97B0]">{description}</p>
        </div>
      </div>
      <button
        onClick={onChange}
        className={`relative h-6 w-11 rounded-full transition-colors ${
          checked ? 'bg-violet-600' : 'bg-[#2E2B3F]'
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${
            checked ? 'left-6' : 'left-1'
          }`}
        />
      </button>
    </div>
  );
}
