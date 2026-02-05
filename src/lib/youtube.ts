const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3';
const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || '';

export interface YouTubeVideo {
  id: string;
  title: string;
  channelTitle: string;
  thumbnail: string;
}

export interface YouTubePlaylist {
  id: string;
  title: string;
  channelTitle: string;
  thumbnail: string;
  itemCount: number;
}

/**
 * 코딩용 음악 검색 (영상)
 */
export async function searchVideos(query: string, maxResults = 10): Promise<YouTubeVideo[]> {
  const params = new URLSearchParams({
    part: 'snippet',
    q: query,
    type: 'video',
    videoCategoryId: '10',  // Music 카테고리
    maxResults: maxResults.toString(),
    key: API_KEY,
  });

  const res = await fetch(`${YOUTUBE_API_URL}/search?${params}`);
  if (!res.ok) throw new Error('YouTube search failed');

  const data = await res.json();

  return data.items.map((item: any) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    channelTitle: item.snippet.channelTitle,
    thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
  }));
}

/**
 * 코딩용 플레이리스트 검색
 */
export async function searchPlaylists(query: string, maxResults = 10): Promise<YouTubePlaylist[]> {
  const params = new URLSearchParams({
    part: 'snippet,contentDetails',
    q: query,
    type: 'playlist',
    maxResults: maxResults.toString(),
    key: API_KEY,
  });

  const res = await fetch(`${YOUTUBE_API_URL}/search?${params}`);
  if (!res.ok) throw new Error('YouTube playlist search failed');

  const data = await res.json();

  return data.items.map((item: any) => ({
    id: item.id.playlistId,
    title: item.snippet.title,
    channelTitle: item.snippet.channelTitle,
    thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
    itemCount: 0, // search API에서는 itemCount 안 줌
  }));
}

/**
 * 플레이리스트의 영상 목록 가져오기
 */
export async function getPlaylistItems(playlistId: string, maxResults = 50): Promise<YouTubeVideo[]> {
  const params = new URLSearchParams({
    part: 'snippet',
    playlistId,
    maxResults: maxResults.toString(),
    key: API_KEY,
  });

  const res = await fetch(`${YOUTUBE_API_URL}/playlistItems?${params}`);
  if (!res.ok) throw new Error('YouTube playlist items failed');

  const data = await res.json();

  return data.items
    .filter((item: any) => item.snippet.resourceId.kind === 'youtube#video')
    .map((item: any) => ({
      id: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
    }));
}

/**
 * 추천 코딩 음악 검색 키워드
 */
export const CODING_MUSIC_PRESETS = [
  { label: '🎵 Lofi Hip Hop', query: 'lofi hip hop coding' },
  { label: '🎹 Chill Piano', query: 'chill piano study music' },
  { label: '🌧️ Rain + Jazz', query: 'rain jazz coding background' },
  { label: '🎸 Synthwave', query: 'synthwave coding music' },
  { label: '🌌 Ambient', query: 'ambient music for programming' },
  { label: '☕ Café BGM', query: 'cafe background music study' },
  { label: '🎮 Game OST', query: 'video game ost study playlist' },
  { label: '🧘 Focus', query: 'deep focus music programming' },
] as const;
