import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { equipment, sensors } from '@/lib/mockData';
import MainLayout from '@/components/Layout/MainLayout';
import SensorGraph from '@/components/Charts/SensorGraph';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Wrench, Settings, ChevronLeft, Calendar, AlertTriangle } from 'lucide-react';
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

  const [enhancedSensors, setEnhancedSensors] = useState(equipmentSensors);
  
  useEffect(() => {
    if (equipmentSensors.length === 0 && equipmentItem) {
      const demoSensors = [];
      
      demoSensors.push({
        id: 10000 + Number(id),
        equipmentId: Number(id),
        name: `${equipmentItem.name} - Pressure`,
        type: "pressure",
        status: equipmentItem.status,
        currentValue: equipmentItem.status === 'healthy' ? 65 : equipmentItem.status === 'warning' ? 78 : 92,
        unit: "PSI",
        threshold: 85,
        historyData: generateDemoSensorData(40, 90, 24, equipmentItem.status),
      });
      
      demoSensors.push({
        id: 20000 + Number(id),
        equipmentId: Number(id),
        name: `${equipmentItem.name} - Temperature`,
        type: "temperature",
        status: equipmentItem.status,
        currentValue: equipmentItem.status === 'healthy' ? 55 : equipmentItem.status === 'warning' ? 68 : 82,
        unit: "°C",
        threshold: 75,
        historyData: generateDemoSensorData(30, 85, 24, equipmentItem.status),
      });
      
      setEnhancedSensors(demoSensors);
    }
  }, [id, equipmentItem, equipmentSensors]);

  const generateDemoSensorData = (min, max, points, status) => {
    const data = [];
    const now = new Date();
    
    const spike = status === 'alert' ? 0.8 : status === 'warning' ? 0.4 : 0.1;
    
    for (let i = points; i >= 0; i--) {
      const time = new Date(now.getTime() - (i * 60 * 60 * 1000));
      
      let value;
      if (status === 'alert' && (i === 2 || i === 8)) {
        value = Math.round(min + (max - min) * 0.9);
      } else if (status === 'warning' && i === 5) {
        value = Math.round(min + (max - min) * 0.75);
      } else {
        value = Math.round(min + Math.random() * (max - min) * (1 - spike));
      }
      
      data.push({
        time: time.toISOString(),
        value
      });
    }
    
    return data;
  };

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
    navigate('/settings');
  };

  const handleRequestMaintenance = () => {
    toast({
      title: "Maintenance Requested",
      description: `A maintenance request has been submitted for ${equipmentItem.name}.`,
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

        {equipmentItem.status !== 'healthy' && (
          <Card className={cn(
            "border-l-4",
            equipmentItem.status === 'warning' ? "border-l-amber-500" : "border-l-red-500"
          )}>
            <CardContent className="flex items-center p-4 gap-2">
              <AlertTriangle className={cn(
                "h-5 w-5",
                equipmentItem.status === 'warning' ? "text-amber-500" : "text-red-500"
              )} />
              <p className="font-medium">
                {equipmentItem.status === 'warning' 
                  ? "This equipment requires attention. Schedule maintenance soon."
                  : "Critical issue detected! Immediate maintenance required."}
              </p>
              <div className="ml-auto">
                <Button 
                  variant={equipmentItem.status === 'alert' ? "destructive" : "outline"}
                  onClick={handleRequestMaintenance}
                >
                  Request Maintenance
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="sensors">Sensors</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sensors" className="pt-4">
            {enhancedSensors.length > 0 ? (
              <div className="grid gap-6">
                {enhancedSensors.map((sensor) => (
                  <Card key={sensor.id} className="w-full">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <span className={cn(
                          "h-3 w-3 rounded-full",
                          sensor.status === 'healthy' ? "bg-green-500" :
                          sensor.status === 'warning' ? "bg-amber-500" : "bg-red-500"
                        )}></span>
                        {sensor.name}
                        <span className="ml-auto text-base font-normal">
                          Current: <span className="font-bold">{sensor.currentValue} {sensor.unit}</span>
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
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
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="h-5 w-5" />
                  Maintenance History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Last maintenance performed</p>
                        <p className="text-muted-foreground">
                          {new Date(equipmentItem.lastMaintenance).toLocaleDateString(undefined, { 
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline">View Report</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Next scheduled maintenance</p>
                        <p className="text-muted-foreground">
                          {new Date(equipmentItem.nextMaintenance).toLocaleDateString(undefined, { 
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" onClick={handleRequestMaintenance}>
                      Request Early Maintenance
                    </Button>
                  </div>
                  
                  <Card className="bg-muted/50">
                    <CardHeader>
                      <CardTitle className="text-base">Maintenance Records</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-center text-muted-foreground py-6">
                        Detailed maintenance records will appear here
                      </p>
                    </CardContent>
                  </Card>
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
