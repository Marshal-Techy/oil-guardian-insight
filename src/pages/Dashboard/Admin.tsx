
import React, { useState } from 'react';
import { industries, equipment, sensors } from '@/lib/mockData';
import MainLayout from '@/components/Layout/MainLayout';
import IndustryCard from '@/components/Cards/IndustryCard';
import EquipmentCard from '@/components/Cards/EquipmentCard';
import SensorCard from '@/components/Cards/SensorCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AdminDashboard = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<number | null>(1); // Default to Oil & Gas
  const [selectedEquipment, setSelectedEquipment] = useState<number | null>(null);
  
  // Get equipment for the selected industry
  const filteredEquipment = equipment.filter(
    (item) => item.industryId === selectedIndustry
  );
  
  // Get sensors for the selected equipment
  const filteredSensors = sensors.filter(
    (item) => selectedEquipment && item.equipmentId === selectedEquipment
  );
  
  // Calculate overall statistics
  const totalHealthy = equipment.filter(item => item.status === 'healthy').length;
  const totalWarning = equipment.filter(item => item.status === 'warning').length;
  const totalAlert = equipment.filter(item => item.status === 'alert').length;
  const totalEquipment = equipment.length;
  
  const handleIndustrySelect = (industryId: number) => {
    setSelectedIndustry(industryId);
    setSelectedEquipment(null); // Reset equipment selection when industry changes
  };
  
  const handleEquipmentSelect = (equipmentId: number) => {
    setSelectedEquipment(equipmentId);
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Monitor all industries and equipment</p>
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
        
        {/* Industries Section */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Industries</CardTitle>
            <CardDescription>Select an industry to view its equipment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {industries.map((industry) => (
                <IndustryCard
                  key={industry.id}
                  id={industry.id}
                  name={industry.name}
                  description={industry.description}
                  image={industry.image}
                  isSelected={industry.id === selectedIndustry}
                  onClick={handleIndustrySelect}
                />
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Equipment Section (visible if an industry is selected) */}
        {selectedIndustry && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Equipment</CardTitle>
              <CardDescription>
                {selectedIndustry
                  ? `Monitoring ${industries.find(i => i.id === selectedIndustry)?.name} equipment`
                  : 'Select an industry above to view equipment'}
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
        )}
        
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

export default AdminDashboard;
