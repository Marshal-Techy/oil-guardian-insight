
import React from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import MapView from '@/components/Maps/MapView';
import { useRealTimeData } from '@/hooks/useRealTimeData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const MapViewPage = () => {
  const { realTimeEquipment, industries } = useRealTimeData();
  
  // Count equipment by status
  const healthyCount = realTimeEquipment.filter(eq => eq.status === 'healthy').length;
  const warningCount = realTimeEquipment.filter(eq => eq.status === 'warning').length;
  const alertCount = realTimeEquipment.filter(eq => eq.status === 'alert').length;
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Global Equipment Monitoring</h1>
          <p className="text-muted-foreground">
            Real-time map view of equipment status across all industries
          </p>
        </div>
        
        {/* Status Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-xl font-medium">Total Equipment</p>
                <h3 className="text-3xl font-bold mt-2">{realTimeEquipment.length}</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-green-200 bg-green-900/10">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-xl font-medium">Healthy</p>
                <h3 className="text-3xl font-bold text-green-500 mt-2">{healthyCount}</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-amber-200 bg-amber-900/10">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-xl font-medium">Warning</p>
                <h3 className="text-3xl font-bold text-amber-500 mt-2">{warningCount}</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-red-200 bg-red-900/10">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-xl font-medium">Alert</p>
                <h3 className="text-3xl font-bold text-red-500 mt-2">{alertCount}</h3>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Map Component */}
        <MapView equipment={realTimeEquipment} />
        
        {/* Equipment List */}
        <Card>
          <CardHeader>
            <CardTitle>Equipment Status</CardTitle>
            <CardDescription>Status of all equipment across industries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {realTimeEquipment.map(item => {
                const industry = industries.find(ind => ind.id === item.industryId);
                return (
                  <div 
                    key={item.id}
                    className="p-4 border border-gray-800 rounded-lg bg-gray-900"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-400">{industry?.name}</p>
                      </div>
                      <Badge className={cn(
                        "font-medium border",
                        item.status === 'alert'
                          ? "bg-red-100 text-red-800 border-red-200"
                          : item.status === 'warning'
                          ? "bg-amber-100 text-amber-800 border-amber-200"
                          : "bg-green-100 text-green-800 border-green-200"
                      )}>
                        {item.status}
                      </Badge>
                    </div>
                    <div className="mt-2 text-sm text-gray-400">
                      <div>Lat: {item.latitude ? item.latitude.toFixed(4) : "N/A"}</div>
                      <div>Long: {item.longitude ? item.longitude.toFixed(4) : "N/A"}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default MapViewPage;
