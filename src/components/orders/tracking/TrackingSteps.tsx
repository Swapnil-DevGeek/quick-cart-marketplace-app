
import { CheckCheck, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { OrderStep } from "@/types";
import { useState } from "react";

interface TrackingStepsProps {
  steps: OrderStep[];
}

export function TrackingSteps({ steps }: TrackingStepsProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(
    // Default to expanding the in-progress step
    steps.findIndex(step => step.status === "in-progress")
  );
  
  return (
    <div className="space-y-8">
      {steps.map((step, index) => (
        <div 
          key={step.id} 
          className={cn(
            "relative transition-all duration-300",
            expandedIndex === index ? "scale-105" : ""
          )}
        >
          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div 
              className={cn(
                "absolute left-6 top-10 bottom-0 w-0.5 -ml-[1px] transition-colors duration-500",
                step.status === "completed" ? "bg-primary" : 
                step.status === "in-progress" ? "bg-primary/50" : "bg-muted"
              )}
            ></div>
          )}
          
          <div 
            className="flex items-start gap-4 cursor-pointer"
            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
          >
            {/* Status Icon */}
            <div 
              className={cn(
                "flex items-center justify-center h-12 w-12 rounded-full border-2 transition-all duration-300",
                step.status === "completed" 
                  ? "bg-primary text-primary-foreground border-primary" 
                  : step.status === "in-progress"
                    ? "bg-primary/20 text-primary border-primary animate-pulse"
                    : "bg-muted text-muted-foreground border-muted-foreground/30"
              )}
            >
              {step.status === "completed" ? (
                <CheckCheck className="h-5 w-5" />
              ) : step.status === "in-progress" ? (
                <Clock className="h-5 w-5 animate-spin-slow" />
              ) : (
                <step.icon className="h-5 w-5" />
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                <h3 className={cn(
                  "font-semibold transition-colors duration-300",
                  step.status === "in-progress" ? "text-primary" : ""
                )}>
                  {step.title}
                </h3>
                <span className={cn(
                  "text-sm text-muted-foreground",
                  step.status === "in-progress" ? "font-medium text-primary" : ""
                )}>
                  {step.date}
                </span>
              </div>
              <p className={cn(
                "text-sm text-muted-foreground transition-all duration-300",
                expandedIndex === index ? "text-foreground" : ""
              )}>
                {step.description}
              </p>
              
              {/* Additional details that show when expanded */}
              {expandedIndex === index && (
                <div className="mt-3 text-sm bg-muted/50 p-3 rounded-md animate-fade-in">
                  {step.status === "completed" && (
                    <p>This step has been completed successfully.</p>
                  )}
                  {step.status === "in-progress" && (
                    <p>This step is currently in progress. We'll update you when it's complete.</p>
                  )}
                  {step.status === "pending" && (
                    <p>This step is pending and will begin once previous steps are completed.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
