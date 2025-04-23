
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Building } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IndustryCardProps {
  id: number;
  name: string;
  description: string;
  image?: string;
  isSelected?: boolean;
  onClick?: (id: number) => void;
}

const IndustryCard: React.FC<IndustryCardProps> = ({
  id,
  name,
  description,
  image,
  isSelected = false,
  onClick
}) => {
  return (
    <Card 
      className={cn(
        "cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-lg",
        isSelected ? "ring-2 ring-primary" : "hover:scale-[1.02]"
      )}
      onClick={() => onClick && onClick(id)}
    >
      <div className="h-32 overflow-hidden relative">
        {image ? (
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <Building className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
        {isSelected && (
          <div className="absolute inset-0 bg-primary/30" />
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
};

export default IndustryCard;
