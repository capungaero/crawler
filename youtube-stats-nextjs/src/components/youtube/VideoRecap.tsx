import React from 'react';
import { Card } from '../ui/Card';
import { Spinner } from '../ui/Spinner';
import { useVideoRecap } from '../../lib/youtube';

interface VideoRecapProps {
  channelId: string;
  timeframe: string;
}

const VideoRecap: React.FC<VideoRecapProps> = ({ channelId, timeframe }) => {
  const { data, isLoading, error } = useVideoRecap(channelId, timeframe);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="text-red-500">Error fetching video recap: {error.message}</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {data?.videos.map((video) => (
        <Card key={video.id} className="p-4">
          <h3 className="text-lg font-semibold">{video.title}</h3>
          <p className="text-gray-600">Views: {video.views}</p>
          <p className="text-gray-600">Published: {video.publishedAt}</p>
        </Card>
      ))}
    </div>
  );
};

export default VideoRecap;