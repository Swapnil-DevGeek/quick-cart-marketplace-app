
import { MapPin, Navigation, Truck, MapPinOff, Building, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface TrackingMapProps {
  isQuickCommerce: boolean;
  currentStep: string;
  shippingAddress: string;
  driverPosition: { x: number; y: number };
  destinationPosition: { x: number; y: number };
}

export function TrackingMap({
  isQuickCommerce,
  currentStep,
  shippingAddress,
  driverPosition,
  destinationPosition
}: TrackingMapProps) {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [zoom, setZoom] = useState(1);
  
  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Add zoom controls
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.8));
  
  return (
    <div className="relative h-60 rounded-t-md overflow-hidden bg-muted/50 transition-all duration-300">
      {/* Loading state */}
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-2"></div>
            <p className="text-sm text-muted-foreground">Loading map...</p>
          </div>
        </div>
      )}
      
      {/* Map container */}
      <div 
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          mapLoaded ? "opacity-100" : "opacity-0"
        )}
        style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
      >
        {/* Simulated Map View */}
        <div className="h-full w-full bg-gradient-to-br from-primary/5 to-primary/10">
          {/* Simulated Roads */}
          <div className="absolute top-1/3 left-0 right-0 h-1.5 bg-muted-foreground/20"></div>
          <div className="absolute top-2/3 left-0 right-0 h-1.5 bg-muted-foreground/20"></div>
          <div className="absolute left-1/3 top-0 bottom-0 w-1.5 bg-muted-foreground/20"></div>
          <div className="absolute left-2/3 top-0 bottom-0 w-1.5 bg-muted-foreground/20"></div>
          
          {/* Buildings and Landmarks */}
          <div className="absolute top-[15%] left-[15%] h-8 w-8 rounded-sm bg-muted-foreground/20">
            <Building className="h-8 w-8 text-muted-foreground/40" />
          </div>
          <div className="absolute top-[40%] left-[60%] h-8 w-8 rounded-sm bg-muted-foreground/20">
            <Building className="h-8 w-8 text-muted-foreground/40" />
          </div>
          <div className="absolute top-[60%] left-[20%] h-8 w-8 rounded-sm bg-muted-foreground/20">
            <Building className="h-8 w-8 text-muted-foreground/40" />
          </div>
          <div className="absolute top-[20%] left-[80%] h-8 w-8 rounded-sm bg-muted-foreground/20">
            <Building className="h-8 w-8 text-muted-foreground/40" />
          </div>
          
          {/* Source Location */}
          <div className="absolute top-[25%] left-[25%] transform -translate-x-1/2 -translate-y-1/2">
            <div className="h-6 w-6 rounded-full bg-primary/30 flex items-center justify-center">
              <Truck className="h-4 w-4 text-primary" />
            </div>
            <div className="absolute top-0 left-0 h-6 w-6 rounded-full bg-primary/60 transform scale-50 animate-ping"></div>
          </div>
          
          {/* Destination Location */}
          <div className="absolute top-[75%] left-[75%] transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex flex-col items-center">
              <Home className="h-6 w-6 text-primary" />
              <div className="absolute top-0 left-0 h-6 w-6 text-primary transform scale-75 animate-pulse opacity-60"></div>
            </div>
          </div>
          
          {/* Moving Delivery Vehicle */}
          {isQuickCommerce && currentStep !== "delivered" && (
            <div 
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
              style={{ 
                top: `${driverPosition.y}%`, 
                left: `${driverPosition.x}%`,
                transition: 'top 0.2s ease-out, left 0.2s ease-out'
              }}
            >
              <div className="bg-primary text-primary-foreground rounded-full p-1.5 shadow-lg">
                <Navigation className="h-5 w-5" />
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-background text-foreground text-xs px-1.5 py-0.5 rounded whitespace-nowrap shadow-md">
                On the way
              </div>
            </div>
          )}
          
          {/* Route Path */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" fill="none">
            <path 
              d="M25,25 C30,35 40,40 50,50 C60,60 70,65 75,75" 
              stroke="currentColor" 
              strokeWidth="1.5"
              strokeDasharray="3,2"
              className="text-primary"
            />
          </svg>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
      
      {/* Map zoom controls */}
      <div className="absolute top-2 right-2 flex flex-col bg-background/80 rounded-md shadow-md">
        <button 
          className="p-1 hover:bg-muted transition-colors" 
          onClick={handleZoomIn}
          aria-label="Zoom in"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="11" y1="8" x2="11" y2="14"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
        </button>
        <button 
          className="p-1 hover:bg-muted transition-colors" 
          onClick={handleZoomOut}
          aria-label="Zoom out"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
        </button>
      </div>
      
      {/* Address information */}
      <div className="relative z-10 p-4 absolute bottom-0 left-0 right-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-primary mr-1 flex-shrink-0" />
            <p className="text-sm font-medium truncate">{shippingAddress}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
