import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ChannelStats from '@/components/youtube/ChannelStats';
import VideoRecap from '@/components/youtube/VideoRecap';
import TimeframeSelector from '@/components/youtube/TimeframeSelector';
import { fetchChannelStats } from '@/lib/zai';

const ChannelPage = () => {
  const router = useRouter();
  const { channel } = router.query;
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const [timeframe, setTimeframe] = useState('last30days');

  useEffect(() => {
    if (channel) {
      const getChannelStats = async () => {
        try {
          const data = await fetchChannelStats(channel);
          setStats(data);
        } catch (err) {
          setError('Failed to fetch channel statistics. Please try again.');
        }
      };

      getChannelStats();
    }
  }, [channel]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      {stats ? (
        <>
          <ChannelStats stats={stats} />
          <TimeframeSelector selected={timeframe} onChange={setTimeframe} />
          <VideoRecap stats={stats.videos} timeframe={timeframe} />
        </>
      ) : (
        <div className="spinner">Loading...</div>
      )}
    </div>
  );
};

export default ChannelPage;