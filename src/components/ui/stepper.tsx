
import * as React from "react";
import { cn } from "@/lib/utils";

const StepsContext = React.createContext<{
  value: string;
  stepCount: number;
  activeStepIndex: number;
}>({
  value: "",
  stepCount: 0,
  activeStepIndex: 0,
});

export interface StepsProps {
  value: string;
  onChange?: (value: string) => void;
  className?: string;
  children?: React.ReactNode;
}

export function Steps({
  value,
  onChange,
  className,
  children,
}: StepsProps) {
  const steps = React.Children.toArray(children);
  const stepCount = steps.length;
  
  const activeStepIndex = React.useMemo(() => {
    return steps.findIndex(
      (step) => React.isValidElement(step) && step.props.value === value
    );
  }, [value, steps]);
  
  return (
    <StepsContext.Provider value={{ value, stepCount, activeStepIndex }}>
      <div
        className={cn(
          "flex flex-row items-center gap-2 w-full",
          className
        )}
      >
        {children}
      </div>
    </StepsContext.Provider>
  );
}

export interface StepProps {
  value: string;
  className?: string;
  children?: React.ReactNode;
}

export function Step({
  value,
  className,
  children,
}: StepProps) {
  const { value: currentValue, activeStepIndex } = React.useContext(StepsContext);
  const isActive = currentValue === value;
  
  // Get own index from parent's children
  const stepIndex = React.useMemo(() => {
    const parentContext = React.useContext(StepsContext);
    return React.Children.toArray(parentContext.stepCount ? children : []).findIndex(
      (child) => React.isValidElement(child) && child.props.value === value
    );
  }, [value, children]);
  
  const isCompleted = activeStepIndex > stepIndex;
  
  return (
    <div 
      className={cn(
        "flex-1 group",
        className
      )}
      data-active={isActive}
      data-completed={isCompleted}
    >
      <div className="flex items-center">
        {children}
        <div
          className={cn(
            "h-0.5 flex-1 bg-muted transition-colors",
            isCompleted && "bg-primary",
            "last:hidden"
          )}
        />
      </div>
    </div>
  );
}

export interface StepIndicatorProps {
  className?: string;
  children?: React.ReactNode;
}

export function StepIndicator({
  className,
  children,
}: StepIndicatorProps) {
  return (
    <div
      className={cn(
        "relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-muted bg-background text-muted-foreground transition-colors group-data-[completed=true]:border-primary group-data-[completed=true]:bg-primary group-data-[completed=true]:text-primary-foreground group-data-[active=true]:border-primary group-data-[active=true]:text-primary",
        className
      )}
    >
      {children}
    </div>
  );
}

export interface StepStatusProps {
  complete: React.ReactNode;
  incomplete: React.ReactNode;
  active: React.ReactNode;
}

export function StepStatus({
  complete,
  incomplete,
  active,
}: StepStatusProps) {
  return (
    <>
      <div className="group-data-[completed=true]:block hidden">{complete}</div>
      <div className="group-data-[completed=true]:hidden group-data-[active=true]:hidden block">
        {incomplete}
      </div>
      <div className="group-data-[completed=true]:hidden group-data-[active=false]:hidden block">
        {active}
      </div>
    </>
  );
}

export interface StepTitleProps {
  className?: string;
  children?: React.ReactNode;
}

export function StepTitle({
  className,
  children,
}: StepTitleProps) {
  return (
    <p
      className={cn(
        "ml-2 text-sm font-medium text-muted-foreground group-data-[active=true]:text-foreground",
        className
      )}
    >
      {children}
    </p>
  );
}
