
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { TrackingMap } from "./tracking/TrackingMap";
import { TrackingSteps } from "./tracking/TrackingSteps";
import { TrackingHelp } from "./tracking/TrackingHelp";
import type { OrderStep } from "@/types";

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
  const [driverPosition, setDriverPosition] = useState({ x: 25, y: 50 });
  const [destinationPosition] = useState({ x: 75, y: 75 });
  
  // Check if this is a quick commerce order
  const isQuickCommerce = estimatedDelivery.toLowerCase().includes("minute") || 
                         estimatedDelivery.toLowerCase().includes("today");
  
  // Animate the driver position for quick commerce orders
  useEffect(() => {
    if (!isQuickCommerce) return;
    
    const updateDriverPosition = () => {
      setDriverPosition(prev => {
        const dx = destinationPosition.x - prev.x;
        const dy = destinationPosition.y - prev.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 2) return prev;
        
        const step = 0.5;
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
          <TrackingMap
            isQuickCommerce={isQuickCommerce}
            currentStep={currentStep}
            shippingAddress={shippingAddress}
            driverPosition={driverPosition}
            destinationPosition={destinationPosition}
          />
          
          <TrackingSteps steps={steps} />
        </CardContent>
      </Card>
      
      <TrackingHelp />
    </div>
  );
}
