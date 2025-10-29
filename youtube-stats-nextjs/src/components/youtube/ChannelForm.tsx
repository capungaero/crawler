import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Toast } from '../ui/Toast';

const ChannelForm: React.FC<{ onSubmit: (channelUrl: string) => void }> = ({ onSubmit }) => {
  const [channelUrl, setChannelUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!channelUrl) {
      setError('Please enter a valid YouTube channel URL.');
      return;
    }
    setError(null);
    onSubmit(channelUrl);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <Input
        type="text"
        placeholder="Enter YouTube Channel URL"
        value={channelUrl}
        onChange={(e) => setChannelUrl(e.target.value)}
        className="border rounded p-2"
      />
      <Button type="submit" className="bg-blue-500 text-white rounded p-2">
        Get Channel Stats
      </Button>
      {error && <Toast message={error} type="error" />}
    </form>
  );
};

export default ChannelForm;