'use client';

import { Search, X } from "lucide-react";
import { LANGUAGES } from "@/src/lib/constants";

interface SessionFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  languageFilter: string;
  onLanguageFilterChange: (value: string) => void;
  totalCount: number;
  filteredCount: number;
}

export default function SessionFilters({
  search,
  onSearchChange,
  languageFilter,
  onLanguageFilterChange,
  totalCount,
  filteredCount,
}: SessionFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      {/* 검색 */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9B97B0]" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search projects or notes..."
          className="w-full rounded-lg border border-[#2E2B3F] bg-[#1A1726]
            pl-9 pr-9 py-2.5 text-sm text-white placeholder:text-[#6B7280]
            focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500
            transition-colors"
        />
        {search && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9B97B0] hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* 언어 필터 */}
      <select
        value={languageFilter}
        onChange={(e) => onLanguageFilterChange(e.target.value)}
        className="rounded-lg border border-[#2E2B3F] bg-[#1A1726]
          px-3 py-2.5 text-sm text-white
          focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500
          transition-colors cursor-pointer"
      >
        <option value="">All Languages</option>
        {LANGUAGES.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>

      {/* 카운트 */}
      <div className="flex items-center text-xs text-[#9B97B0] whitespace-nowrap">
        {filteredCount === totalCount
          ? `${totalCount} sessions`
          : `${filteredCount} / ${totalCount} sessions`}
      </div>
    </div>
  );
}
