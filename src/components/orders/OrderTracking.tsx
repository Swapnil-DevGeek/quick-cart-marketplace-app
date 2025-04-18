
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
  viewMode?: "map" | "list";
}

export function OrderTracking({
  orderId,
  estimatedDelivery,
  currentStep,
  steps,
  shippingAddress,
  viewMode = "map"
}: OrderTrackingProps) {
  const [driverPosition, setDriverPosition] = useState({ x: 25, y: 50 });
  const [destinationPosition] = useState({ x: 75, y: 75 });
  const [animatedProgress, setAnimatedProgress] = useState(0);
  
  // Check if this is a quick commerce order
  const isQuickCommerce = estimatedDelivery.toLowerCase().includes("minute") || 
                         estimatedDelivery.toLowerCase().includes("today");
  
  // Calculate order progress percentage
  useEffect(() => {
    const completedSteps = steps.filter(step => step.status === "completed").length;
    const inProgressStep = steps.find(step => step.status === "in-progress");
    const totalSteps = steps.length;
    
    // Calculate progress including partial credit for in-progress step
    const completedPercentage = (completedSteps / totalSteps) * 100;
    const inProgressPercentage = inProgressStep ? (0.5 / totalSteps) * 100 : 0;
    const targetProgress = completedPercentage + inProgressPercentage;
    
    // Animate progress update
    let start = 0;
    const animateProgress = () => {
      start += 1;
      setAnimatedProgress(prev => {
        const next = prev + (targetProgress - prev) * 0.1;
        return Math.min(next, targetProgress);
      });
      
      if (start < 20) {
        requestAnimationFrame(animateProgress);
      }
    };
    
    animateProgress();
  }, [steps]);
  
  // Animate the driver position for quick commerce orders
  useEffect(() => {
    if (!isQuickCommerce || viewMode !== "map") return;
    
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
  }, [isQuickCommerce, destinationPosition, viewMode]);

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
      
      {/* Progress bar */}
      <div className="w-full bg-muted rounded-full h-2.5 mb-4 overflow-hidden">
        <div 
          className="bg-primary h-2.5 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${animatedProgress}%` }}
        ></div>
      </div>
      
      <Card className="overflow-hidden transition-all duration-300">
        <CardContent className={`p-0 ${viewMode === "map" ? "" : "pt-6"}`}>
          {viewMode === "map" && (
            <TrackingMap
              isQuickCommerce={isQuickCommerce}
              currentStep={currentStep}
              shippingAddress={shippingAddress}
              driverPosition={driverPosition}
              destinationPosition={destinationPosition}
            />
          )}
          
          <div className={viewMode === "map" ? "p-6" : ""}>
            <TrackingSteps steps={steps} />
          </div>
        </CardContent>
      </Card>
      
      <TrackingHelp isQuickCommerce={isQuickCommerce} />
    </div>
  );
}
