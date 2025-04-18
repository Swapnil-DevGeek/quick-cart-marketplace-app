
import { CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { OrderStep } from "@/types";

interface TrackingStepsProps {
  steps: OrderStep[];
}

export function TrackingSteps({ steps }: TrackingStepsProps) {
  return (
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
  );
}
