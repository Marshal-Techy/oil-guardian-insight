
import React from 'react';
import { useParams } from 'react-router-dom';
import { equipment, sensors } from '@/lib/mockData';
import MainLayout from '@/components/Layout/MainLayout';
import SensorGraph from '@/components/Charts/SensorGraph';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Timer } from 'lucide-react';

const EquipmentDetails = () => {
  const { id } = useParams();
  const equipmentItem = equipment.find((item) => item.id === Number(id));
  const equipmentSensors = sensors.filter((sensor) => sensor.equipmentId === Number(id));

  if (!equipmentItem) {
    return <div>Equipment not found</div>;
  }

  // Calculate operating time (mock data - in production this would come from the backend)
  const lastMaintenanceDate = new Date(equipmentItem.lastMaintenance);
  const now = new Date();
  const operatingHours = Math.floor((now.getTime() - lastMaintenanceDate.getTime()) / (1000 * 60 * 60));
  const operatingDays = Math.floor(operatingHours / 24);

  const getStatusColor = () => {
    switch (equipmentItem.status) {
      case 'healthy':
        return 'border-green-200';
      case 'warning':
        return 'border-amber-200';
      case 'alert':
        return 'border-red-200';
      default:
        return '';
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{equipmentItem.name}</h1>
            <p className="text-muted-foreground">Detailed equipment monitoring</p>
          </div>
          <Card className={cn("w-64", getStatusColor())}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 justify-center">
                <Timer className="w-5 h-5 text-muted-foreground" />
                <div className="text-center">
                  <p className="text-sm font-medium text-muted-foreground">Operating Time</p>
                  <p className="text-xl font-bold">{operatingDays} days</p>
                  <p className="text-sm text-muted-foreground">({operatingHours} hours)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6">
          {equipmentSensors.map((sensor) => (
            <Card key={sensor.id} className="w-full">
              <CardHeader>
                <CardTitle>{sensor.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <SensorGraph 
                    sensorData={sensor.historyData}
                    threshold={sensor.threshold}
                    unit={sensor.unit}
                    status={sensor.status}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default EquipmentDetails;
