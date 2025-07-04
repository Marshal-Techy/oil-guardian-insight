
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MapPin, AlertTriangle } from 'lucide-react';

// Declare google variable to avoid TypeScript errors
declare global {
  interface Window {
    initMap: () => void;
  }
}

interface MapViewProps {
  equipment: Array<{
    id: number;
    name: string;
    status: string;
    latitude: number;
    longitude: number;
    location?: string;
  }>;
}

const MapView: React.FC<MapViewProps> = ({ equipment }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const [mapsLoaded, setMapsLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  // Initialize map when component mounts
  useEffect(() => {
    // Define the callback function that will be called when Maps API loads
    window.initMap = () => {
      setMapsLoaded(true);
      console.log("Google Maps API loaded successfully");
    };

    // Load Google Maps API script if it hasn't been loaded yet
    if (!document.querySelector('script[src*="maps.googleapis.com/maps/api"]')) {
      const script = document.createElement('script');
      // Remove the API key for development purposes
      script.src = `https://maps.googleapis.com/maps/api/js?callback=initMap&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onerror = () => {
        setMapError("Failed to load Google Maps API");
        console.error("Google Maps API failed to load");
      };
      document.head.appendChild(script);
      
      return () => {
        // Clean up only if we added the script
        const scriptTag = document.querySelector('script[src*="maps.googleapis.com/maps/api"]');
        if (scriptTag) {
          document.head.removeChild(scriptTag);
        }
        delete window.initMap;
      };
    } else {
      // Maps API already loaded
      setMapsLoaded(true);
      console.log("Google Maps API was already loaded");
    }
  }, []);

  // Create map once maps are loaded
  useEffect(() => {
    if (mapsLoaded && mapRef.current && !googleMapRef.current) {
      try {
        console.log("Creating map instance");
        // Create the map centered on Northeast India
        googleMapRef.current = new google.maps.Map(mapRef.current, {
          center: { lat: 26.1158, lng: 91.7086 }, // Coordinates for Guwahati, a major city in Northeast India
          zoom: 7, // Zoom level to show the Northeast India region
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
        console.log("Map instance created successfully");
        
        // Add boundary rectangle for Northeast India
        const northeastBoundary = new google.maps.Rectangle({
          strokeColor: "#FFFFFF",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FFFFFF",
          fillOpacity: 0,
          map: googleMapRef.current,
          bounds: {
            north: 29.5,
            south: 22.0,
            east: 97.5,
            west: 88.0,
          }
        });
        
        updateMarkers();
      } catch (error) {
        console.error("Error creating map:", error);
        setMapError("Error initializing map");
      }
    }
  }, [mapsLoaded]);

  // Update markers when equipment data changes
  useEffect(() => {
    if (mapsLoaded && googleMapRef.current) {
      updateMarkers();
    }
  }, [equipment, mapsLoaded]);

  const updateMarkers = () => {
    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];
    
    if (!googleMapRef.current) return;
    
    console.log(`Adding ${equipment.length} markers to map`);
    
    // Add markers for each equipment location
    equipment.forEach(item => {
      if (item.latitude && item.longitude) {
        // Only add markers for locations in Northeast India
        // Northeast India rough boundaries:
        // Lat: 22° to 29.5° N, Long: 88° to 97.5° E
        if (
          item.latitude >= 22 && item.latitude <= 29.5 && 
          item.longitude >= 88 && item.longitude <= 97.5
        ) {
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
                <p style="margin: 5px 0 0;">Location: ${item.location || "Northeast India"}</p>
              </div>
            `
          });
          
          marker.addListener('click', () => {
            infoWindow.open(googleMapRef.current, marker);
          });
          
          markersRef.current.push(marker);
        }
      }
    });
    
    console.log(`Added ${markersRef.current.length} markers to map`);
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
    <Card className="border-none bg-gray-900 text-gray-100 h-full">
      <CardHeader className="pb-2">
        <CardTitle>Equipment Map - Northeast India</CardTitle>
        <CardDescription>Monitoring equipment across India's northeastern states</CardDescription>
      </CardHeader>
      <CardContent className="h-[calc(100%-60px)]">
        {mapError && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{mapError}</AlertDescription>
          </Alert>
        )}

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
          className="w-full h-full rounded-md overflow-hidden"
          style={{ border: '1px solid rgba(255, 255, 255, 0.1)', minHeight: '300px' }}
        ></div>
      </CardContent>
    </Card>
  );
};

export default MapView;
