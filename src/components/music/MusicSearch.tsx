'use client';

import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { searchVideos, YouTubeVideo, CODING_MUSIC_PRESETS } from "@/src/lib/youtube";
import { useMusicStore } from "@/src/stores/musicStore";
import MusicTrackItem from "./MusicTrackItem";

export default function MusicSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const { addRecentSearch, recentSearches, playQueue } = useMusicStore();

  const handleSearch = async (searchQuery: string) => {
    const trimmed = searchQuery.trim();
    if (!trimmed) return;

    setLoading(true);
    setSearched(true);
    try {
      const videos = await searchVideos(trimmed);
      setResults(videos);
      addRecentSearch(trimmed);
    } catch (err) {
      console.error('Search failed:', err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePresetClick = (presetQuery: string) => {
    setQuery(presetQuery);
    handleSearch(presetQuery);
  };

  const handlePlayAll = () => {
    if (results.length > 0) {
      playQueue(results);
    }
  };

  return (
    <div className="space-y-6">
      {/* 검색 바 */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9B97B0]" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
          placeholder="Search coding music on YouTube..."
          className="w-full rounded-xl border border-[#2E2B3F] bg-[#1A1726]
            pl-10 pr-4 py-3 text-sm text-white placeholder:text-[#6B7280]
            focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500
            transition-colors"
        />
      </div>

      {/* 프리셋 태그 */}
      {!searched && (
        <div>
          <h3 className="text-xs font-medium text-[#9B97B0] mb-3">🎧 Quick picks</h3>
          <div className="flex flex-wrap gap-2">
            {CODING_MUSIC_PRESETS.map(({ label, query: presetQuery }) => (
              <button
                key={presetQuery}
                onClick={() => handlePresetClick(presetQuery)}
                className="rounded-full bg-[#242136] border border-[#2E2B3F] px-3.5 py-1.5
                  text-xs text-[#9B97B0] hover:text-white hover:border-violet-500/50
                  transition-all"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 최근 검색어 */}
      {!searched && recentSearches.length > 0 && (
        <div>
          <h3 className="text-xs font-medium text-[#9B97B0] mb-3">🕐 Recent searches</h3>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setQuery(s);
                  handleSearch(s);
                }}
                className="rounded-full bg-[#242136] px-3 py-1.5
                  text-xs text-[#9B97B0] hover:text-white transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 로딩 */}
      {loading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 text-violet-400 animate-spin" />
        </div>
      )}

      {/* 검색 결과 */}
      {searched && !loading && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-medium text-[#9B97B0]">
              {results.length > 0 ? `${results.length} results` : 'No results'}
            </h3>
            {results.length > 1 && (
              <button
                onClick={handlePlayAll}
                className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
              >
                ▶ Play all
              </button>
            )}
          </div>

          <div className="space-y-1">
            {results.map((video, index) => (
              <MusicTrackItem
                key={video.id}
                video={video}
                index={index}
                allVideos={results}
              />
            ))}
          </div>

          {results.length === 0 && (
            <p className="text-center tex-sm text-[#9B97B0] py-4">
              검색 결과가 없어요. 다른 키워드로 시도해보세요.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
