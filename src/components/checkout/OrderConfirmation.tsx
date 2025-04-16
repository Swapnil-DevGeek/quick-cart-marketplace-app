
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle, ShoppingBag, Truck } from "lucide-react";

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
      
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <Button asChild size="lg">
          <Link to="/orders">
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
