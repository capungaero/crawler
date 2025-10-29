import { NextResponse } from 'next/server';

const YT_BASE = 'https://www.googleapis.com/youtube/v3';
const API_KEY = process.env.YOUTUBE_API_KEY;

if (!API_KEY) {
  throw new Error('Missing YOUTUBE_API_KEY in environment');
}

type Timeframe = { label: string; days: number };

const TIMEFRAMES: Timeframe[] = [
  { label: '7d', days: 7 },
  { label: '30d', days: 30 },
  { label: '90d', days: 90 },
  { label: '365d', days: 365 },
];

function isoDaysAgo(days: number) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString();
}

function extractChannelIdOrQuery(urlOrId: string): { channelId?: string; query?: string } {
  const s = urlOrId.trim();

  // direct channel ID (UC...)
  const channelIdMatch = s.match(/(UC[0-9A-Za-z_-]{22,})/);
  if (channelIdMatch) return { channelId: channelIdMatch[1] };

  // /channel/ID
  const channelPath = s.match(/\/channel\/(UC[0-9A-Za-z_-]{22,})/);
  if (channelPath) return { channelId: channelPath[1] };

  // @handle or /c/ or /user/ -> fallback to search by query
  const handleMatch = s.match(/@[\w-]+/) || s.match(/\/(c|user)\/([^/?#]+)/);
  if (handleMatch) {
    const q = handleMatch[0].startsWith('@') ? handleMatch[0].slice(1) : handleMatch[2] ?? handleMatch[1];
    return { query: q };
  }

  // if looks like plain id-like or name, use as query
  return { query: s };
}

async function fetchJson(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`YT API error ${res.status}: ${text}`);
  }
  return res.json();
}

async function resolveChannelIdByQuery(q: string) {
  const url = `${YT_BASE}/search?part=snippet&type=channel&maxResults=1&q=${encodeURIComponent(q)}&key=${API_KEY}`;
  const data = await fetchJson(url);
  const item = data.items?.[0];
  return item?.snippet?.channelId ?? item?.id?.channelId ?? null;
}

async function getChannelStatistics(channelId: string) {
  const url = `${YT_BASE}/channels?part=statistics,snippet&id=${channelId}&key=${API_KEY}`;
  const data = await fetchJson(url);
  const c = data.items?.[0];
  return c ?? null;
}

async function listVideosInTimeframe(channelId: string, publishedAfter: string) {
  let nextPageToken = '';
  const videoIds: string[] = [];
  do {
    const url = `${YT_BASE}/search?part=snippet&channelId=${channelId}&publishedAfter=${publishedAfter}&type=video&maxResults=50${nextPageToken ? `&pageToken=${nextPageToken}` : ''}&key=${API_KEY}`;
    const data = await fetchJson(url);
    for (const it of data.items || []) {
      if (it.id?.videoId) videoIds.push(it.id.videoId);
    }
    nextPageToken = data.nextPageToken ?? '';
  } while (nextPageToken);
  return videoIds;
}

async function getVideosStatistics(ids: string[]) {
  if (ids.length === 0) return [];
  const chunks: string[][] = [];
  for (let i = 0; i < ids.length; i += 50) chunks.push(ids.slice(i, i + 50));
  const results = [];
  for (const c of chunks) {
    const url = `${YT_BASE}/videos?part=statistics&id=${c.join(',')}&key=${API_KEY}`;
    const data = await fetchJson(url);
    for (const it of data.items || []) results.push(it.statistics);
  }
  return results;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const input = body?.url ?? body?.channel ?? body?.id;
    if (!input) {
      return NextResponse.json({ error: 'Missing channel url/id in request body' }, { status: 400 });
    }

    const parsed = extractChannelIdOrQuery(input);
    let channelId = parsed.channelId;
    if (!channelId) {
      // try resolve by query/handle
      channelId = await resolveChannelIdByQuery(parsed.query ?? input);
      if (!channelId) {
        return NextResponse.json({ error: 'Channel not found' }, { status: 404 });
      }
    }

    const channel = await getChannelStatistics(channelId);
    if (!channel) {
      return NextResponse.json({ error: 'Failed to fetch channel statistics' }, { status: 500 });
    }

    const stats = channel.statistics;
    const snippet = channel.snippet;

    // build timeframe recaps
    const recaps: Record<string, { videos: number; views: number }> = {};
    for (const tf of TIMEFRAMES) {
      const after = isoDaysAgo(tf.days);
      const videoIds = await listVideosInTimeframe(channelId, after);
      const vstats = await getVideosStatistics(videoIds);
      const views = vstats.reduce((s, v) => s + Number(v.viewCount ?? 0), 0);
      recaps[tf.label] = { videos: videoIds.length, views };
    }

    const response = {
      channelId,
      channelTitle: snippet?.title ?? 'Unknown Channel',
      channelThumbnail: snippet?.thumbnails?.default?.url ?? '',
      subscribers: Number(stats?.subscriberCount ?? 0),
      totalViews: Number(stats?.viewCount ?? 0),
      totalVideos: Number(stats?.videoCount ?? 0),
      recaps,
    };

    return NextResponse.json(response);
  } catch (err: any) {
    console.error('YouTube API Error:', err);
    return NextResponse.json({ error: err.message ?? 'Unknown error' }, { status: 500 });
  }
}