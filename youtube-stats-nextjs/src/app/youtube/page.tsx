import React, { useState } from 'react';
import ChannelForm from '@/components/youtube/ChannelForm';
import ChannelStats from '@/components/youtube/ChannelStats';
import VideoRecap from '@/components/youtube/VideoRecap';
import TimeframeSelector from '@/components/youtube/TimeframeSelector';

const YouTubePage = () => {
  const [channelData, setChannelData] = useState(null);
  const [timeframe, setTimeframe] = useState('last30days');

  const handleChannelDataUpdate = (data) => {
    setChannelData(data);
  };

  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">YouTube Channel Statistics</h1>
      <ChannelForm onChannelDataUpdate={handleChannelDataUpdate} />
      {channelData && (
        <>
          <ChannelStats data={channelData} />
          <TimeframeSelector selectedTimeframe={timeframe} onTimeframeChange={handleTimeframeChange} />
          <VideoRecap data={channelData.videos} timeframe={timeframe} />
        </>
      )}
    </div>
  );
};

export default YouTubePage;