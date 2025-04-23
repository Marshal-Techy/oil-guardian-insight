
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import SensorGraph from '../Charts/SensorGraph';
import { cn } from '@/lib/utils';

interface SensorCardProps {
  id: number;
  name: string;
  type: string;
  status: 'healthy' | 'warning' | 'alert';
  currentValue: number;
  unit: string;
  threshold: number;
  historyData: Array<{ time: string; value: number }>;
}

const SensorCard: React.FC<SensorCardProps> = ({
  id,
  name,
  type,
  status,
  currentValue,
  unit,
  threshold,
  historyData
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const getStatusIndicator = () => {
    switch (status) {
      case 'healthy':
        return {
          color: 'bg-green-500',
          text: 'Healthy',
          cardClass: 'border-green-200'
        };
      case 'warning':
        return {
          color: 'bg-amber-500 status-pulse-warning',
          text: 'Warning',
          cardClass: 'border-amber-200'
        };
      case 'alert':
        return {
          color: 'bg-red-500 status-pulse-alert',
          text: 'Alert',
          cardClass: 'border-red-200'
        };
      default:
        return {
          color: 'bg-gray-500',
          text: 'Unknown',
          cardClass: 'border-gray-200'
        };
    }
  };

  const statusIndicator = getStatusIndicator();
  
  const getValueColor = () => {
    if (threshold && currentValue >= threshold) {
      return 'text-red-600';
    }
    if (threshold && currentValue >= (threshold * 0.8)) {
      return 'text-amber-600';
    }
    return 'text-green-600';
  };
  
  return (
    <>
      <Card className={cn("overflow-hidden", statusIndicator.cardClass)}>
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">{name}</h3>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${statusIndicator.color}`}></div>
              <span className="text-xs font-medium">{statusIndicator.text}</span>
            </div>
          </div>
          
          <div className="flex items-end gap-1 mb-3">
            <span className={`text-2xl font-bold ${getValueColor()}`}>{currentValue}</span>
            <span className="text-sm text-muted-foreground">{unit}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">
              Threshold: {threshold} {unit}
            </span>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">View Graph</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[700px]">
                <DialogHeader>
                  <DialogTitle>{name} - Trend Graph</DialogTitle>
                </DialogHeader>
                <div className="h-[400px]">
                  <SensorGraph
                    sensorData={historyData}
                    threshold={threshold}
                    unit={unit}
                    status={status}
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default SensorCard;
