'use client';

import { useState, useMemo } from 'react';
import { useSession } from '@/src/hooks/useSession';
import SessionCard from '@/src/components/session/SessionCard';
import SessionFilters from '@/src/components/session/SessionFilters';
import DateGroup from '@/src/components/session/DateGroup';
import EmptyState from '@/src/components/session/EmptyState';
import Button from '@/src/components/ui/Button';
import { CodingSession } from '@/src/types';
import { Trash2 } from 'lucide-react';

export default function SessionsPage() {
  const { sessions, deleteSession, clearAllSessions } = useSession();
  const [search, setSearch] = useState('');
  const [languageFilter, setLanguageFilter] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // 필터링
  const filteredSessions = useMemo(() => {
    return sessions.filter((s) => {
      const matchSearch =
        !search ||
        s.projectName.toLowerCase().includes(search.toLowerCase()) ||
        s.note?.toLowerCase().includes(search.toLowerCase());
      const matchLang = !languageFilter || s.language === languageFilter;
      return matchSearch && matchLang;
    });
  }, [sessions, search, languageFilter]);

  // 날짜별 그룹핑
  const groupedSessions = useMemo(() => {
    const groups: { date: string; sessions: CodingSession[] }[] = [];

    filteredSessions.forEach((session) => {
      const dateStr = new Date(session.startedAt).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'short',
      });

      const existingGroup = groups.find((g) => g.date === dateStr);
      if (existingGroup) {
        existingGroup.sessions.push(session);
      } else {
        groups.push({ date: dateStr, sessions: [session] });
      }
    });

    return groups;
  }, [filteredSessions]);

  return (
    <div className="max-w-2xl mx-auto">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">📋 Sessions</h2>
          <p className="text-sm text-[#9B97B0] mt-1">코딩 세션 히스토리</p>
        </div>

        {sessions.length > 0 && (
          <div>
            {showClearConfirm ? (
              <div className="flex items-center gap-2">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    clearAllSessions();
                    setShowClearConfirm(false);
                  }}
                >
                  전부 삭제
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowClearConfirm(false)}
                >
                  취소
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowClearConfirm(true)}
              >
                <Trash2 className="h-3.5 w-3.5" />
                Clear All
              </Button>
            )}
          </div>
        )}
      </div>

      {/* 필터 */}
      {sessions.length > 0 && (
        <SessionFilters
          search={search}
          onSearchChange={setSearch}
          languageFilter={languageFilter}
          onLanguageFilterChange={setLanguageFilter}
          totalCount={sessions.length}
          filteredCount={filteredSessions.length}
        />
      )}

      {/* 세션 리스트 */}
      {sessions.length === 0 ? (
        <EmptyState />
      ) : filteredSessions.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-sm text-[#9B97B0]">검색 결과가 없어요</p>
          <button
            onClick={() => {
              setSearch('');
              setLanguageFilter('');
            }}
            className="mt-2 text-xs text-violet-400 hover:text-violet-300"
          >
            필터 초기화
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {groupedSessions.map((group) => (
            <div key={group.date}>
              <DateGroup
                date={group.date}
                sessionCount={group.sessions.length}
                totalMinutes={group.sessions.reduce(
                  (sum, s) => sum + s.focusMinutes,
                  0
                )}
              />
              <div className="space-y-2 ml-0">
                {group.sessions.map((session) => (
                  <SessionCard
                    key={session.id}
                    session={session}
                    onDelete={deleteSession}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
