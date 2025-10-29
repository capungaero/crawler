import React from 'react';
import ChannelForm from '../components/youtube/ChannelForm';
import ChannelStats from '../components/youtube/ChannelStats';
import VideoRecap from '../components/youtube/VideoRecap';

const HomePage = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-6">YouTube Channel Statistics</h1>
      <ChannelForm />
      <ChannelStats />
      <VideoRecap />
    </main>
  );
};

export default HomePage;