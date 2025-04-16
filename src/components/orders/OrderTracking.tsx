
import React from "react";
import { 
  Package, 
  Truck, 
  MapPin,
  Check, 
  Clock, 
  Calendar,
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
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold mb-1">Order #{orderId}</h2>
          <p className="text-muted-foreground">
            Estimated Delivery: <span className="font-medium">{estimatedDelivery}</span>
          </p>
        </div>
        
        <Badge variant="outline" className="self-start sm:self-center px-3 py-1 text-sm">
          In Transit
        </Badge>
      </div>
      
      <Card>
        <CardContent className="p-6">
          {/* Map Placeholder */}
          <div className="relative h-48 mb-6 rounded-md overflow-hidden bg-muted/50 flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/10"></div>
            <div className="relative z-10 text-center p-4">
              <MapPin className="mx-auto h-8 w-8 text-primary mb-2" />
              <p className="font-medium">Delivery Location</p>
              <p className="text-sm text-muted-foreground">{shippingAddress}</p>
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
                      step.status === "completed" ? "bg-primary" : "bg-muted"
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
                          ? "bg-primary/20 text-primary border-primary"
                          : "bg-muted text-muted-foreground border-muted-foreground/30"
                    )}
                  >
                    {step.status === "completed" ? (
                      <Check className="h-5 w-5" />
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
          <Card className="flex-1">
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
          
          <Card className="flex-1">
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
