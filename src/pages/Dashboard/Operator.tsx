
import React, { useState, useEffect } from 'react';
import { industries, equipment, sensors } from '@/lib/mockData';
import MainLayout from '@/components/Layout/MainLayout';
import EquipmentCard from '@/components/Cards/EquipmentCard';
import SensorCard from '@/components/Cards/SensorCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getCurrentUser } from '@/lib/mockData';
import { useNavigate } from 'react-router-dom';

const OperatorDashboard = () => {
  const navigate = useNavigate();
  const [operatorIndustry, setOperatorIndustry] = useState(1); // Default to Oil & Gas for demo
  const [selectedEquipment, setSelectedEquipment] = useState<number | null>(null);
  
  // Get equipment for the operator's industry
  const filteredEquipment = equipment.filter(
    (item) => item.industryId === operatorIndustry
  );
  
  // Get sensors for the selected equipment
  const filteredSensors = sensors.filter(
    (item) => selectedEquipment && item.equipmentId === selectedEquipment
  );
  
  // Calculate statistics for the operator's industry
  const totalHealthy = filteredEquipment.filter(item => item.status === 'healthy').length;
  const totalWarning = filteredEquipment.filter(item => item.status === 'warning').length;
  const totalAlert = filteredEquipment.filter(item => item.status === 'alert').length;
  const totalEquipment = filteredEquipment.length;
  
  // Check the current user and verify they're an operator
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser || currentUser.role !== 'operator') {
      navigate('/login');
    }
  }, [navigate]);
  
  const handleEquipmentSelect = (equipmentId: number) => {
    setSelectedEquipment(equipmentId);
  };
  
  const industry = industries.find(ind => ind.id === operatorIndustry);
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Operator Dashboard</h1>
          <p className="text-muted-foreground">
            Monitoring {industry?.name} equipment and sensors
          </p>
        </div>
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-xl font-medium">Total Equipment</p>
                <h3 className="text-3xl font-bold mt-2">{totalEquipment}</h3>
              </div>
            </CardContent>
          </Card>
          <Card className="border-green-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-xl font-medium">Healthy</p>
                <h3 className="text-3xl font-bold text-green-500 mt-2">{totalHealthy}</h3>
              </div>
            </CardContent>
          </Card>
          <Card className="border-amber-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-xl font-medium">Warning</p>
                <h3 className="text-3xl font-bold text-amber-500 mt-2">{totalWarning}</h3>
              </div>
            </CardContent>
          </Card>
          <Card className="border-red-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-xl font-medium">Alert</p>
                <h3 className="text-3xl font-bold text-red-500 mt-2">{totalAlert}</h3>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Equipment Section */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Equipment</CardTitle>
            <CardDescription>
              {industry?.name} equipment status and maintenance schedule
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEquipment.map((item) => (
                <EquipmentCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  status={item.status}
                  lastMaintenance={item.lastMaintenance}
                  nextMaintenance={item.nextMaintenance}
                  isSelected={item.id === selectedEquipment}
                  onClick={handleEquipmentSelect}
                />
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Sensors Section (visible if equipment is selected) */}
        {selectedEquipment && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Sensors</CardTitle>
              <CardDescription>
                {selectedEquipment
                  ? `Monitoring ${equipment.find(e => e.id === selectedEquipment)?.name} sensors`
                  : 'Select equipment above to view sensors'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSensors.map((sensor) => (
                  <SensorCard
                    key={sensor.id}
                    id={sensor.id}
                    name={sensor.name}
                    type={sensor.type}
                    status={sensor.status}
                    currentValue={sensor.currentValue}
                    unit={sensor.unit}
                    threshold={sensor.threshold}
                    historyData={sensor.historyData}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default OperatorDashboard;
