
import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MapPin, AlertTriangle, Info } from 'lucide-react';

interface MapViewProps {
  equipment: Array<{
    id: number;
    name: string;
    status: string;
    latitude: number;
    longitude: number;
  }>;
}

const MapView: React.FC<MapViewProps> = ({ equipment }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    // Load Google Maps API script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&libraries=places`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = initMap;

    return () => {
      // Clean up the script when component unmounts
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    // Update markers when equipment data changes
    if (googleMapRef.current) {
      updateMarkers();
    }
  }, [equipment]);

  const initMap = () => {
    if (!mapRef.current) return;
    
    // Create the map
    googleMapRef.current = new google.maps.Map(mapRef.current, {
      center: { lat: 30, lng: 0 },
      zoom: 2,
      styles: [
        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
        {
          featureType: "administrative.locality",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [{ color: "#d59563" }],
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#38414e" }],
        },
        {
          featureType: "road",
          elementType: "geometry.stroke",
          stylers: [{ color: "#212a37" }],
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [{ color: "#9ca5b3" }],
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#17263c" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [{ color: "#515c6d" }],
        }
      ],
    });
    
    updateMarkers();
  };
  
  const updateMarkers = () => {
    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];
    
    if (!googleMapRef.current) return;
    
    // Add markers for each equipment location
    equipment.forEach(item => {
      if (item.latitude && item.longitude) {
        // Create marker
        const marker = new google.maps.Marker({
          position: { lat: item.latitude, lng: item.longitude },
          map: googleMapRef.current,
          title: item.name,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: getStatusColor(item.status),
            fillOpacity: 0.8,
            strokeWeight: 2,
            strokeColor: '#ffffff',
          }
        });
        
        // Add info window with equipment details
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="color: #333; padding: 5px;">
              <h3 style="margin: 0; font-weight: bold;">${item.name}</h3>
              <p style="margin: 5px 0 0;">Status: ${item.status}</p>
            </div>
          `
        });
        
        marker.addListener('click', () => {
          infoWindow.open(googleMapRef.current, marker);
        });
        
        markersRef.current.push(marker);
      }
    });
  };
  
  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'alert':
        return '#ef4444'; // red
      case 'warning':
        return '#f59e0b'; // amber
      default:
        return '#10b981'; // green
    }
  };

  return (
    <Card className="border-none bg-gray-900 text-gray-100">
      <CardHeader className="pb-2">
        <CardTitle>Equipment Map</CardTitle>
      </CardHeader>
      <CardContent>
        {!equipment.some(item => item.latitude && item.longitude) && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              No location data available for equipment
            </AlertDescription>
          </Alert>
        )}
        
        <div className="mb-4 flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded-full bg-red-500"></span>
            <span>Alert</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded-full bg-amber-500"></span>
            <span>Warning</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
            <span>Healthy</span>
          </div>
        </div>
        
        <div 
          ref={mapRef} 
          className="w-full h-[400px] rounded-md overflow-hidden"
          style={{ border: '1px solid rgba(255, 255, 255, 0.1)' }}
        ></div>
      </CardContent>
    </Card>
  );
};

export default MapView;
