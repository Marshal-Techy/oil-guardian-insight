
import { useState, useEffect } from 'react';
import { industries, equipment, sensors } from '@/lib/mockData';

// Add location data to equipment
const equipmentWithLocation = equipment.map(item => ({
  ...item,
  // Generate somewhat realistic coordinates distributed around the world
  latitude: (Math.random() * 120) - 60, // Between -60 and 60
  longitude: (Math.random() * 360) - 180, // Between -180 and 180
}));

export const useRealTimeData = () => {
  const [realTimeEquipment, setRealTimeEquipment] = useState(equipmentWithLocation);
  const [realTimeSensors, setRealTimeSensors] = useState(sensors);

  useEffect(() => {
    const updateData = () => {
      // Update equipment status with lower probability of changes
      const updatedEquipment = equipmentWithLocation.map(item => ({
        ...item,
        status: Math.random() > 0.9 ? 'warning' : Math.random() > 0.97 ? 'alert' : 'healthy'
      }));

      // Update sensor values with smoother transitions
      const updatedSensors = sensors.map(sensor => {
        // Get the last value or set a default
        const lastValue = sensor.historyData.length > 0 
          ? sensor.historyData[sensor.historyData.length - 1].value 
          : (sensor.type === 'temperature' ? 60 : 70);
        
        // Create a smoother transition - max change of ±2 units per second
        const maxChange = 2;
        const change = (Math.random() * maxChange * 2) - maxChange;
        
        // Set base values according to sensor type
        const baseValue = sensor.type === 'temperature' 
          ? Math.min(Math.max(lastValue + change, 40), 80) // Keep temperature between 40-80
          : Math.min(Math.max(lastValue + change, 50), 90); // Keep pressure between 50-90
        
        // Round to one decimal place for smoother visualization
        const newValue = Math.round(baseValue * 10) / 10;

        return {
          ...sensor,
          currentValue: newValue,
          historyData: [
            ...sensor.historyData.slice(-23), // Keep only the last 23 points
            { time: new Date().toISOString(), value: newValue }
          ]
        };
      });

      setRealTimeEquipment(updatedEquipment);
      setRealTimeSensors(updatedSensors);
    };

    // Set the interval to exactly 1 second (1000ms)
    const interval = setInterval(updateData, 1000);
    return () => clearInterval(interval);
  }, []);

  return { realTimeEquipment, realTimeSensors, industries };
};
