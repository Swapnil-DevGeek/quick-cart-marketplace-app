
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, ShoppingBag, Truck, Navigation } from "lucide-react";
import { useEffect, useState } from "react";
import { OrderTracking } from "@/components/orders/OrderTracking";

interface OrderConfirmationProps {
  orderNumber: string;
  total: number;
  estimatedDelivery: string;
}

export function OrderConfirmation({ 
  orderNumber, 
  total, 
  estimatedDelivery 
}: OrderConfirmationProps) {
  const [showTracking, setShowTracking] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);
  
  // Store order in localStorage for tracking and set up initial order data
  useEffect(() => {
    const orderData = {
      orderId: orderNumber,
      total,
      estimatedDelivery,
      currentStep: "order-shipped",
      shippingAddress: localStorage.getItem('lastUsedAddress') || "123 Main Street, Apt 4B, New York, NY 10001",
      steps: [
        {
          id: "order-placed",
          title: "Order Placed",
          description: "Your order has been confirmed and is being processed.",
          date: new Date().toLocaleString(),
          icon: "Package",
          status: "completed" as const,
        },
        {
          id: "order-shipped",
          title: "Order Shipped",
          description: "Your order has been shipped and is on its way to you.",
          date: new Date().toLocaleString(),
          icon: "Truck",
          status: "completed" as const,
        },
        {
          id: "in-transit",
          title: "In Transit",
          description: "Your package is in transit to the delivery address.",
          date: new Date().toLocaleString(),
          icon: "Truck",
          status: "in-progress" as const,
        },
        {
          id: "out-for-delivery",
          title: "Out for Delivery",
          description: "Your package is out for delivery and will arrive today.",
          date: "Expected in 30 minutes",
          icon: "Home",
          status: "pending" as const,
        },
        {
          id: "delivered",
          title: "Delivered",
          description: "Your package has been delivered.",
          date: "Expected today",
          icon: "CheckCheck",
          status: "pending" as const,
        }
      ]
    };
    
    localStorage.setItem(`order_${orderNumber}`, JSON.stringify(orderData));
    setOrderData(orderData);
  }, [orderNumber, total, estimatedDelivery]);

  // Simulate order progress updates
  useEffect(() => {
    if (!orderData) return;
    
    // Update order status every few seconds to simulate real-time tracking
    const updateInterval = setInterval(() => {
      setOrderData(prevData => {
        if (!prevData) return null;
        
        const steps = [...prevData.steps];
        const inProgressIndex = steps.findIndex(step => step.status === "in-progress");
        
        if (inProgressIndex >= 0 && inProgressIndex < steps.length - 1) {
          // Complete current step
          steps[inProgressIndex].status = "completed";
          // Set next step to in-progress
          steps[inProgressIndex + 1].status = "in-progress";
          
          // Update current step identifier
          const newCurrentStep = steps[inProgressIndex + 1].id;
          
          // Save updated status to localStorage
          const updatedData = {
            ...prevData,
            steps,
            currentStep: newCurrentStep
          };
          localStorage.setItem(`order_${orderNumber}`, JSON.stringify(updatedData));
          
          return updatedData;
        }
        
        return prevData;
      });
    }, 15000); // Update every 15 seconds
    
    return () => clearInterval(updateInterval);
  }, [orderData, orderNumber]);

  return (
    <div className="text-center py-6">
      <div className="mb-6 flex justify-center">
        <div className="rounded-full p-3 bg-primary/10">
          <CheckCircle className="h-12 w-12 text-primary" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
      <p className="text-muted-foreground mb-6">
        Thank you for your order. We've received it and will be processing it right away.
      </p>
      
      <div className="bg-muted p-6 rounded-lg mb-6 max-w-md mx-auto">
        <div className="flex justify-between mb-4">
          <p className="text-muted-foreground">Order Number:</p>
          <p className="font-medium">{orderNumber}</p>
        </div>
        <div className="flex justify-between mb-4">
          <p className="text-muted-foreground">Total Amount:</p>
          <p className="font-medium">${total.toFixed(2)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-muted-foreground">Estimated Delivery:</p>
          <p className="font-medium">{estimatedDelivery}</p>
        </div>
      </div>
      
      {/* Order Tracking Section */}
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={() => setShowTracking(!showTracking)}
          className="mb-4"
        >
          {showTracking ? "Hide" : "Show"} Live Tracking
        </Button>
        
        {showTracking && orderData && (
          <div className="mt-4 border rounded-lg overflow-hidden animate-fade-in">
            <OrderTracking
              orderId={orderData.orderId}
              estimatedDelivery={orderData.estimatedDelivery}
              currentStep={orderData.currentStep}
              steps={orderData.steps.map((step: any) => ({
                ...step,
                icon: step.icon === "Package" ? Package :
                      step.icon === "Truck" ? Truck :
                      step.icon === "Home" ? Home :
                      step.icon === "CheckCheck" ? CheckCheck :
                      step.icon === "Clock" ? Clock : Truck
              }))}
              shippingAddress={orderData.shippingAddress}
            />
          </div>
        )}
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <Button asChild size="lg">
          <Link to={`/order-tracking/${orderNumber}`}>
            <Truck className="mr-2 h-4 w-4" />
            Track Order
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link to="/">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
        </Button>
      </div>
    </div>
  );
}
