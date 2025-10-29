import React from 'react';
import { Card } from '../ui/Card';
import { Spinner } from '../ui/Spinner';

interface ChannelStatsProps {
  subscriberCount: number;
  totalViews: number;
  totalVideos: number;
  loading: boolean;
  error: string | null;
}

const ChannelStats: React.FC<ChannelStatsProps> = ({
  subscriberCount,
  totalViews,
  totalVideos,
  loading,
  error,
}) => {
  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card title="Subscribers" value={subscriberCount.toLocaleString()} />
      <Card title="Total Views" value={totalViews.toLocaleString()} />
      <Card title="Total Videos" value={totalVideos.toLocaleString()} />
    </div>
  );
};

export default ChannelStats;