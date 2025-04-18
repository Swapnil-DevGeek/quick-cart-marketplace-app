
import { PageLayout } from "@/components/layout/PageLayout";
import { OrderTracking } from "@/components/orders/OrderTracking";
import { OrderTrackingSkeleton } from "@/components/ui/loading-skeleton";
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Package, Truck, Home, Clock, CheckCheck, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { OrderStep } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";

export default function OrderTrackingPage() {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const isMobile = useIsMobile();

  useEffect(() => {
    // Try to load order data from localStorage based on orderId
    if (orderId) {
      setLoading(true);
      try {
        const storedOrder = localStorage.getItem(`order_${orderId}`);
        if (storedOrder) {
          const parsedOrder = JSON.parse(storedOrder);
          // Simulate network delay for loading state demonstration
          setTimeout(() => {
            setOrderData(parsedOrder);
            setLoading(false);
          }, 1000);
          
          // Set up real-time updates simulation
          const updateInterval = setInterval(() => {
            // Simulate real-time updates and transitions between order states
            setOrderData(prevData => {
              if (!prevData) return null;
              
              const steps = [...prevData.steps];
              const inProgressIndex = steps.findIndex(step => step.status === "in-progress");
              
              // If there's an in-progress step that can be completed
              if (inProgressIndex >= 0 && inProgressIndex < steps.length - 1) {
                // Random chance (1 in 4) to update status to simulate real-time updates
                if (Math.random() < 0.25) {
                  // Complete current step
                  steps[inProgressIndex].status = "completed";
                  steps[inProgressIndex].date = new Date().toLocaleString();
                  
                  // Set next step to in-progress
                  steps[inProgressIndex + 1].status = "in-progress";
                  steps[inProgressIndex + 1].date = "Just now";
                  
                  // Update current step identifier
                  const newCurrentStep = steps[inProgressIndex + 1].id;
                  
                  // Save updated status to localStorage
                  const updatedData = {
                    ...prevData,
                    steps,
                    currentStep: newCurrentStep
                  };
                  localStorage.setItem(`order_${orderId}`, JSON.stringify(updatedData));
                  
                  // Show toast notification for step change
                  toast.success(`Order status updated: ${steps[inProgressIndex + 1].title}`, {
                    description: steps[inProgressIndex + 1].description
                  });
                  
                  return updatedData;
                }
              }
              
              return prevData;
            });
          }, 15000); // Check every 15 seconds
          
          return () => clearInterval(updateInterval);
        } else {
          setLoading(false);
          toast.error("Order not found", {
            description: "The order you're looking for could not be found"
          });
        }
      } catch (error) {
        console.error("Error loading order data:", error);
        setLoading(false);
        toast.error("Failed to load order data", {
          description: "Please try again later"
        });
      }
    } else {
      // If no orderId, use the mock data
      setTimeout(() => {
        setOrderData({
          orderId: "ORD-2023-04652",
          estimatedDelivery: "Today within 30 minutes",
          currentStep: "in-transit",
          shippingAddress: "123 Main Street, Apt 4B, New York, NY 10001",
          steps: [
            {
              id: "order-placed",
              title: "Order Placed",
              description: "Your order has been confirmed and is being processed.",
              date: new Date().toLocaleString(),
              icon: Package,
              status: "completed" as const,
            },
            {
              id: "order-shipped",
              title: "Order Shipped",
              description: "Your order has been shipped and is on its way to you.",
              date: new Date().toLocaleString(),
              icon: Truck,
              status: "completed" as const,
            },
            {
              id: "in-transit",
              title: "In Transit",
              description: "Your package is in transit to the delivery address.",
              date: new Date().toLocaleString(),
              icon: Truck,
              status: "in-progress" as const,
            },
            {
              id: "out-for-delivery",
              title: "Out for Delivery",
              description: "Your package is out for delivery and will arrive today.",
              date: "Expected in 30 minutes",
              icon: Home,
              status: "pending" as const,
            },
            {
              id: "delivered",
              title: "Delivered",
              description: "Your package has been delivered.",
              date: "Expected today",
              icon: CheckCheck,
              status: "pending" as const,
            }
          ]
        });
        setLoading(false);
      }, 1500);
    }
  }, [orderId]);

  // Function to fix icon references if loaded from localStorage
  const fixIcons = (steps: any[]): OrderStep[] => {
    const iconMap: any = {
      "Package": Package,
      "Truck": Truck,
      "Home": Home,
      "Clock": Clock,
      "CheckCheck": CheckCheck
    };
    
    return steps.map(step => ({
      ...step,
      icon: typeof step.icon === 'string' ? iconMap[step.icon] : step.icon
    }));
  };

  const toggleViewMode = () => {
    setViewMode(prev => prev === "map" ? "list" : "map");
  };

  return (
    <PageLayout>
      <div className="container py-4 sm:py-6 md:py-8 px-4 animate-fade-in">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-4 sm:mb-6 flex overflow-x-auto no-scrollbar text-sm">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/account?tab=orders">My Orders</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <span className="truncate max-w-[120px] inline-block">Track Order {orderId && `#${orderId}`}</span>
          </BreadcrumbItem>
        </Breadcrumb>
        
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 font-heading">Track Your Order</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            See the current status of your order and estimated delivery time.
          </p>
        </div>
        
        {loading ? (
          <OrderTrackingSkeleton />
        ) : orderData ? (
          <div className="transition-all duration-300">
            <div className="mb-4 flex justify-end">
              <Button
                variant="outline"
                size={isMobile ? "sm" : "default"}
                onClick={toggleViewMode}
                className="transition-all duration-300"
              >
                {viewMode === "map" ? "Show List View" : "Show Map View"}
              </Button>
            </div>
            <OrderTracking 
              {...orderData} 
              steps={fixIcons(orderData.steps)}
              viewMode={viewMode}
            />
          </div>
        ) : (
          <Card className="animate-scale-in">
            <CardContent className="p-6 text-center">
              <p className="mb-4">No order information found</p>
              <div className="flex gap-4 justify-center">
                <Button asChild>
                  <a href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Return to Home
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </PageLayout>
  );
}
