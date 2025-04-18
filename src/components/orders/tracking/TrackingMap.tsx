
import { MapPin, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";

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
  return (
    <div className="relative h-60 mb-6 rounded-md overflow-hidden bg-muted/50">
      <div className="absolute inset-0">
        {/* Simulated Map View */}
        <div className="h-full w-full bg-gradient-to-br from-primary/5 to-primary/10">
          {/* Simulated Roads */}
          <div className="absolute top-1/3 left-0 right-0 h-1.5 bg-muted-foreground/20"></div>
          <div className="absolute top-2/3 left-0 right-0 h-1.5 bg-muted-foreground/20"></div>
          <div className="absolute left-1/3 top-0 bottom-0 w-1.5 bg-muted-foreground/20"></div>
          <div className="absolute left-2/3 top-0 bottom-0 w-1.5 bg-muted-foreground/20"></div>
          
          {/* Buildings and Landmarks */}
          <div className="absolute top-1/5 left-1/5 h-8 w-8 rounded-sm bg-muted-foreground/20"></div>
          <div className="absolute top-2/5 left-3/5 h-8 w-8 rounded-sm bg-muted-foreground/20"></div>
          <div className="absolute top-3/5 left-1/5 h-6 w-6 rounded-sm bg-muted-foreground/20"></div>
          <div className="absolute top-1/5 left-4/5 h-10 w-6 rounded-sm bg-muted-foreground/20"></div>
          
          {/* Source Location */}
          <div className="absolute top-[25%] left-[25%] transform -translate-x-1/2 -translate-y-1/2">
            <div className="h-5 w-5 rounded-full bg-primary/30 animate-pulse"></div>
            <div className="absolute top-0 left-0 h-5 w-5 rounded-full bg-primary/60 transform scale-50 animate-ping"></div>
          </div>
          
          {/* Destination Location */}
          <div className="absolute top-[75%] left-[75%] transform -translate-x-1/2 -translate-y-1/2">
            <MapPin className="h-6 w-6 text-primary" />
            <div className="absolute top-0 left-0 h-6 w-6 text-primary transform scale-75 animate-pulse opacity-60"></div>
          </div>
          
          {/* Moving Delivery Vehicle */}
          {isQuickCommerce && currentStep !== "delivered" && (
            <div 
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ 
                top: `${driverPosition.y}%`, 
                left: `${driverPosition.x}%`,
                transition: 'top 0.2s ease-out, left 0.2s ease-out'
              }}
            >
              <div className="bg-primary text-primary-foreground rounded-full p-1.5 shadow-lg">
                <Navigation className="h-5 w-5" />
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
      
      <div className="relative z-10 text-center p-4 absolute bottom-0 left-0 right-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-primary mr-1" />
            <p className="text-sm font-medium">{shippingAddress}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
