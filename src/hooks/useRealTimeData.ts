
import { useState, useEffect } from 'react';
import { industries, equipment, sensors } from '@/lib/mockData';

export const useRealTimeData = () => {
  const [realTimeEquipment, setRealTimeEquipment] = useState(equipment);
  const [realTimeSensors, setRealTimeSensors] = useState(sensors);

  useEffect(() => {
    const updateData = () => {
      // Update equipment status randomly
      const updatedEquipment = equipment.map(item => ({
        ...item,
        status: Math.random() > 0.8 ? 'warning' : Math.random() > 0.95 ? 'alert' : 'healthy'
      }));

      // Update sensor values
      const updatedSensors = sensors.map(sensor => {
        const baseValue = sensor.type === 'temperature' ? 60 : 70;
        const variation = Math.random() * 20 - 10;
        return {
          ...sensor,
          currentValue: Math.round(baseValue + variation),
          historyData: [
            ...sensor.historyData.slice(1),
            { time: new Date().toISOString(), value: Math.round(baseValue + variation) }
          ]
        };
      });

      setRealTimeEquipment(updatedEquipment);
      setRealTimeSensors(updatedSensors);
    };

    const interval = setInterval(updateData, 1000);
    return () => clearInterval(interval);
  }, []);

  return { realTimeEquipment, realTimeSensors, industries };
};
