
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { equipment, sensors } from '@/lib/mockData';
import MainLayout from '@/components/Layout/MainLayout';
import SensorGraph from '@/components/Charts/SensorGraph';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Timer, Settings, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const EquipmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('sensors');
  
  const equipmentItem = equipment.find((item) => item.id === Number(id));
  const equipmentSensors = sensors.filter((sensor) => sensor.equipmentId === Number(id));

  if (!equipmentItem) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-96">
          <h1 className="text-2xl font-bold mb-4">Equipment not found</h1>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </MainLayout>
    );
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

  const handleSettingsClick = () => {
    toast({
      title: "Settings",
      description: "Equipment settings functionality will be implemented soon.",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{equipmentItem.name}</h1>
              <p className="text-muted-foreground">Detailed equipment monitoring</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
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
            <Button variant="outline" size="icon" onClick={handleSettingsClick}>
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="sensors">Sensors</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sensors" className="pt-4">
            {equipmentSensors.length > 0 ? (
              <div className="grid gap-6">
                {equipmentSensors.map((sensor) => (
                  <Card key={sensor.id} className="w-full">
                    <CardHeader>
                      <CardTitle>{sensor.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[400px]">
                        <SensorGraph 
                          sensorData={sensor.historyData || []}
                          threshold={sensor.threshold || 0}
                          unit={sensor.unit || ''}
                          status={sensor.status || 'healthy'}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-8">
                  <div className="flex flex-col items-center justify-center text-center space-y-3">
                    <p className="text-xl font-medium">No sensors found</p>
                    <p className="text-muted-foreground">This equipment doesn't have any sensors attached.</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="maintenance" className="pt-4">
            <Card>
              <CardContent className="py-8">
                <div className="flex flex-col items-center justify-center text-center space-y-3">
                  <p className="text-xl font-medium">Maintenance History</p>
                  <p className="text-muted-foreground">Last maintenance: {new Date(equipmentItem.lastMaintenance).toLocaleDateString()}</p>
                  <p className="text-muted-foreground">Next scheduled: {new Date(equipmentItem.nextMaintenance).toLocaleDateString()}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default EquipmentDetails;
