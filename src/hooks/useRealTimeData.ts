
import { useState, useEffect } from 'react';
import { industries, equipment, sensors } from '@/lib/mockData';

// Add location data to equipment with Northeast India coordinates
const equipmentWithLocation = equipment.map(item => {
  // Northeast India states: Assam, Arunachal Pradesh, Manipur, Meghalaya, Mizoram, Nagaland, Tripura, Sikkim
  // Generate coordinates only within Northeast India region (roughly)
  // Latitude range: 22° to 29.5° N
  // Longitude range: 88° to 97.5° E
  const latitude = 22 + (Math.random() * 7.5); // Between 22°N and 29.5°N
  const longitude = 88 + (Math.random() * 9.5); // Between 88°E and 97.5°E
  
  const state = generateNortheastState();
  
  return {
    ...item,
    latitude,
    longitude,
    location: `${state}, India`
  };
});

// Helper function to generate a Northeast Indian state
function generateNortheastState() {
  const states = [
    "Assam", 
    "Arunachal Pradesh", 
    "Manipur", 
    "Meghalaya", 
    "Mizoram", 
    "Nagaland", 
    "Tripura", 
    "Sikkim"
  ];
  return states[Math.floor(Math.random() * states.length)];
}

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
