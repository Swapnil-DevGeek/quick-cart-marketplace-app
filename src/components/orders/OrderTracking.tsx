
import React, { useEffect, useState } from "react";
import { 
  Package, 
  Truck, 
  Home, 
  CheckCheck, 
  Clock, 
  Calendar,
  MapPin, 
  Navigation,
  LucideIcon
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface OrderStep {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: LucideIcon;
  status: "completed" | "in-progress" | "pending";
}

interface OrderTrackingProps {
  orderId: string;
  estimatedDelivery: string;
  currentStep: string;
  steps: OrderStep[];
  shippingAddress: string;
}

export function OrderTracking({
  orderId,
  estimatedDelivery,
  currentStep,
  steps,
  shippingAddress,
}: OrderTrackingProps) {
  // Check if this is a quick commerce order (delivery expected in minutes)
  const isQuickCommerce = estimatedDelivery.toLowerCase().includes("minute") || 
                          estimatedDelivery.toLowerCase().includes("today");
  
  const [driverPosition, setDriverPosition] = useState({ x: 25, y: 50 });
  const [destinationPosition] = useState({ x: 75, y: 75 });
  
  // Animate the driver position for quick commerce orders
  useEffect(() => {
    if (!isQuickCommerce) return;
    
    const updateDriverPosition = () => {
      setDriverPosition(prev => {
        // Calculate the direction to move towards destination
        const dx = destinationPosition.x - prev.x;
        const dy = destinationPosition.y - prev.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // If driver is close to destination, don't update anymore
        if (distance < 2) return prev;
        
        // Move driver a small step towards destination
        const step = 0.5; // Small step size
        const newX = prev.x + (dx / distance) * step;
        const newY = prev.y + (dy / distance) * step;
        
        return { x: newX, y: newY };
      });
    };
    
    const interval = setInterval(updateDriverPosition, 200);
    return () => clearInterval(interval);
  }, [isQuickCommerce, destinationPosition]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold mb-1">Order #{orderId}</h2>
          <p className="text-muted-foreground">
            {isQuickCommerce ? (
              <span className="font-medium text-primary">Quick Delivery: {estimatedDelivery}</span>
            ) : (
              <>Estimated Delivery: <span className="font-medium">{estimatedDelivery}</span></>
            )}
          </p>
        </div>
        
        <Badge variant="outline" className="self-start sm:self-center px-3 py-1 text-sm">
          {currentStep === "order-placed" ? "Order Placed" :
           currentStep === "order-shipped" ? "Order Shipped" :
           currentStep === "in-transit" ? "In Transit" :
           currentStep === "out-for-delivery" ? "Out for Delivery" :
           currentStep === "delivered" ? "Delivered" : "Processing"}
        </Badge>
      </div>
      
      <Card>
        <CardContent className="p-6">
          {/* Enhanced Map View */}
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
                
                {/* Source Location (Store/Warehouse) */}
                <div className="absolute top-[25%] left-[25%] transform -translate-x-1/2 -translate-y-1/2">
                  <div className="h-5 w-5 rounded-full bg-primary/30 animate-pulse"></div>
                  <div className="absolute top-0 left-0 h-5 w-5 rounded-full bg-primary/60 transform scale-50 animate-ping"></div>
                </div>
                
                {/* Destination Location (Customer) */}
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
                
                {isQuickCommerce && (
                  <Badge variant="secondary" className="ml-2">
                    <Clock className="h-3 w-3 mr-1" />
                    Live Tracking
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          {/* Order Progress */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={step.id} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div 
                    className={cn(
                      "absolute left-6 top-10 bottom-0 w-0.5 -ml-[1px]",
                      step.status === "completed" ? "bg-primary" : 
                      step.status === "in-progress" ? "bg-primary/50" : "bg-muted"
                    )}
                  ></div>
                )}
                
                <div className="flex items-start gap-4">
                  {/* Status Icon */}
                  <div 
                    className={cn(
                      "flex items-center justify-center h-12 w-12 rounded-full border-2",
                      step.status === "completed" 
                        ? "bg-primary text-primary-foreground border-primary" 
                        : step.status === "in-progress"
                          ? "bg-primary/20 text-primary border-primary animate-pulse"
                          : "bg-muted text-muted-foreground border-muted-foreground/30"
                    )}
                  >
                    {step.status === "completed" ? (
                      <CheckCheck className="h-5 w-5" />
                    ) : (
                      <step.icon className="h-5 w-5" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                      <h3 className="font-semibold">{step.title}</h3>
                      <span className="text-sm text-muted-foreground">{step.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div>
        <h3 className="font-semibold mb-3">Need Help?</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <Card className="flex-1 hover:bg-muted/50 transition-colors cursor-pointer">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">Track Package</h4>
                <p className="text-sm text-muted-foreground">Check latest status</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="flex-1 hover:bg-muted/50 transition-colors cursor-pointer">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">Delivery Support</h4>
                <p className="text-sm text-muted-foreground">Get help with delivery</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
