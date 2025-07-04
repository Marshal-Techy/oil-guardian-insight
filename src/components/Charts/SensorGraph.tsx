import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';

interface SensorGraphProps {
  sensorData: Array<{ time: string; value: number }>;
  threshold: number;
  unit: string;
  status: 'healthy' | 'warning' | 'alert';
}

const SensorGraph: React.FC<SensorGraphProps> = ({ sensorData, threshold, unit, status }) => {
  // Handle empty data case with more descriptive message
  if (!sensorData || sensorData.length === 0) {
    return (
      <div className="flex items-center justify-center h-full min-h-[200px] bg-gray-50 rounded-md border border-dashed border-gray-300 text-muted-foreground">
        <div className="text-center">
          <p>No sensor data available</p>
          <p className="text-sm">Historical data will appear here once collected</p>
        </div>
      </div>
    );
  }
  
  // Only use the last 24 data points to keep the graph clean
  const displayData = sensorData.length > 24 ? sensorData.slice(-24) : sensorData;
  
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    } catch (e) {
      console.error("Error formatting date:", dateStr);
      return "Invalid date";
    }
  };

  const getChartColor = () => {
    switch (status) {
      case 'alert': return '#ef4444';
      case 'warning': return '#f59e0b';
      default: return '#22c55e';
    }
  };

  // Calculate min/max for y-axis to prevent wild jumps
  const values = displayData.map(d => d.value);
  const minValue = Math.max(0, Math.min(...values) - 5);
  const maxValue = Math.max(...values) + 5;

  return (
    <ResponsiveContainer width="100%" height={300} className="mt-4">
      <LineChart
        data={displayData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
        <XAxis 
          dataKey="time" 
          tickFormatter={formatDate}
          stroke="#6b7280"
          tick={{ fontSize: 12 }}
          interval="preserveStartEnd"
          minTickGap={30}
        />
        <YAxis 
          stroke="#6b7280"
          tick={{ fontSize: 12 }}
          domain={[minValue, maxValue]}
          label={{ 
            value: unit, 
            angle: -90, 
            position: 'insideLeft',
            style: { textAnchor: 'middle', fontSize: 12, fill: '#6b7280' }
          }}
        />
        <Tooltip
          formatter={(value) => [`${value} ${unit}`, 'Value']}
          labelFormatter={(label) => new Date(label).toLocaleString()}
          contentStyle={{
            backgroundColor: '#1f2937', // Dark background for the tooltip
            border: '1px solid #374151',
            borderRadius: '0.375rem',
            padding: '0.5rem',
            color: '#f9fafb'
          }}
        />
        <ReferenceLine
          y={threshold}
          stroke="#ef4444"
          strokeDasharray="5 5"
          label={{
            position: 'right',
            value: `Threshold: ${threshold}`,
            fill: '#ef4444',
            fontSize: 12,
          }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke={getChartColor()}
          strokeWidth={2}
          dot={false} // Remove dots for cleaner appearance
          activeDot={{ r: 5, stroke: getChartColor(), strokeWidth: 1, fill: getChartColor() }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SensorGraph;
