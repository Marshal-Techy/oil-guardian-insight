
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface EquipmentCardProps {
  id: number;
  name: string;
  status: 'healthy' | 'warning' | 'alert';
  lastMaintenance: string;
  nextMaintenance: string;
  isSelected?: boolean;
  onClick?: (id: number) => void;
}

const EquipmentCard: React.FC<EquipmentCardProps> = ({
  id,
  name,
  status,
  lastMaintenance,
  nextMaintenance,
  isSelected = false,
  onClick
}) => {
  const getStatusIndicator = () => {
    switch (status) {
      case 'healthy':
        return {
          color: 'bg-green-500',
          text: 'Healthy'
        };
      case 'warning':
        return {
          color: 'bg-amber-500 status-pulse-warning',
          text: 'Warning'
        };
      case 'alert':
        return {
          color: 'bg-red-500 status-pulse-alert',
          text: 'Alert'
        };
      default:
        return {
          color: 'bg-gray-500',
          text: 'Unknown'
        };
    }
  };

  const statusIndicator = getStatusIndicator();

  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-md",
        isSelected ? "ring-2 ring-primary" : ""
      )}
      onClick={() => onClick && onClick(id)}
    >
      <CardContent className="p-5">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-medium text-lg">{name}</h3>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${statusIndicator.color}`}></div>
            <span className="text-sm font-medium">{statusIndicator.text}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
          <div>
            <p className="font-medium text-foreground">Last Maintenance</p>
            <p>{new Date(lastMaintenance).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="font-medium text-foreground">Next Maintenance</p>
            <p>{new Date(nextMaintenance).toLocaleDateString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EquipmentCard;
