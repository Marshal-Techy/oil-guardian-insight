
import React, { useState } from 'react';
import MainLayout from '@/components/Layout/MainLayout';
import IndustryCard from '@/components/Cards/IndustryCard';
import EquipmentCard from '@/components/Cards/EquipmentCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRealTimeData } from '@/hooks/useRealTimeData';

const Industries = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<number | null>(null);
  const { industries, realTimeEquipment } = useRealTimeData();
  
  const filteredEquipment = realTimeEquipment.filter(
    (item) => item.industryId === selectedIndustry
  );
  
  const handleIndustrySelect = (industryId: number) => {
    setSelectedIndustry(industryId);
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Industries</h1>
          <p className="text-muted-foreground">Manage and monitor all industries</p>
        </div>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>All Industries</CardTitle>
            <CardDescription>Select an industry to view its equipment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

export default Industries;
