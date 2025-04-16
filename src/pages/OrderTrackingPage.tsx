
import { PageLayout } from "@/components/layout/PageLayout";
import { OrderTracking } from "@/components/orders/OrderTracking";
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink 
} from "@/components/ui/breadcrumb";
import { 
  Package, 
  Truck, 
  Home, 
  Clock,
  CheckCheck 
} from "lucide-react";

export default function OrderTrackingPage() {
  // Mock order data
  const orderData = {
    orderId: "ORD-2023-04652",
    estimatedDelivery: "April 19, 2025",
    currentStep: "in-transit",
    shippingAddress: "123 Main Street, Apt 4B, New York, NY 10001",
    steps: [
      {
        id: "order-placed",
        title: "Order Placed",
        description: "Your order has been confirmed and is being processed.",
        date: "April 15, 2025 • 09:30 AM",
        icon: Package,
        status: "completed" as const,
      },
      {
        id: "order-shipped",
        title: "Order Shipped",
        description: "Your order has been shipped and is on its way to you.",
        date: "April 16, 2025 • 02:15 PM",
        icon: Truck,
        status: "completed" as const,
      },
      {
        id: "in-transit",
        title: "In Transit",
        description: "Your package is in transit to the delivery address.",
        date: "April 17, 2025 • 10:45 AM",
        icon: Truck,
        status: "in-progress" as const,
      },
      {
        id: "out-for-delivery",
        title: "Out for Delivery",
        description: "Your package is out for delivery and will arrive today.",
        date: "Expected April 19, 2025",
        icon: Home,
        status: "pending" as const,
      },
      {
        id: "delivered",
        title: "Delivered",
        description: "Your package has been delivered.",
        date: "Expected April 19, 2025",
        icon: CheckCheck,
        status: "pending" as const,
      }
    ]
  };

  return (
    <PageLayout>
      <div className="container py-8 px-4">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/account?tab=orders">My Orders</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <span>Track Order</span>
          </BreadcrumbItem>
        </Breadcrumb>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Track Your Order</h1>
          <p className="text-muted-foreground">
            See the current status of your order and estimated delivery date.
          </p>
        </div>
        
        <OrderTracking {...orderData} />
      </div>
    </PageLayout>
  );
}
