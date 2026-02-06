import Card, { CardTitle } from '@/src/components/ui/Card';
import { FolderGit2 } from 'lucide-react';

interface ProjectListProps {
  projectData: { name: string; minutes: number; sessions: number }[];
}

export default function ProjectList({ projectData }: ProjectListProps) {
  if (projectData.length === 0) {
    return (
      <Card>
        <CardTitle>📁 Projects</CardTitle>
        <div className="h-36 flex items-center justify-center text-[#9B97B0] text-sm">
          이번 주 기록이 없어요
        </div>
      </Card>
    );
  }

  const formatMinutes = (m: number) => {
    if (m < 60) return `${m}m`;
    return `${Math.floor(m / 60)}h ${m % 60}m`;
  };

  // 상위 5개
  const top5 = projectData.slice(0, 5);
  const maxMinutes = Math.max(...top5.map((p) => p.minutes));

  return (
    <Card>
      <CardTitle>📁 Projects</CardTitle>
      <div className="space-y-3">
        {top5.map((project, i) => {
          const percentage = maxMinutes > 0 ? (project.minutes / maxMinutes) * 100 : 0;
          return (
            <div key={project.name}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#9B97B0]">#{i + 1}</span>
                  <FolderGit2 className="h-3.5 w-3.5 text-violet-400" />
                  <span className="text-sm text-white truncate max-w-[120px]">
                    {project.name}
                  </span>
                </div>
                <span className="text-xs text-[#9B97B0]">
                  {formatMinutes(project.minutes)} · {project.sessions}회
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-[#242136] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-600 to-violet-400"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
