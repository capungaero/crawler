import React from 'react';
import { Select } from '../ui/Select';

const timeframes = [
  { value: 'last_24_hours', label: 'Last 24 Hours' },
  { value: 'last_week', label: 'Last Week' },
  { value: 'last_month', label: 'Last Month' },
  { value: 'last_year', label: 'Last Year' },
  { value: 'all_time', label: 'All Time' },
];

interface TimeframeSelectorProps {
  selectedTimeframe: string;
  onTimeframeChange: (timeframe: string) => void;
}

const TimeframeSelector: React.FC<TimeframeSelectorProps> = ({ selectedTimeframe, onTimeframeChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="timeframe" className="block text-sm font-medium text-gray-700">
        Select Timeframe
      </label>
      <Select
        id="timeframe"
        value={selectedTimeframe}
        onChange={(e) => onTimeframeChange(e.target.value)}
      >
        {timeframes.map((timeframe) => (
          <option key={timeframe.value} value={timeframe.value}>
            {timeframe.label}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default TimeframeSelector;