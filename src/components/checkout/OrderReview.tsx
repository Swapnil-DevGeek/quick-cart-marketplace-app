
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2 } from "lucide-react";
import { CartItem as CartItemType, PaymentMethod } from "@/types";
import { useUser } from "@/contexts/UserContext";
import { CartItem } from "@/components/cart/CartItem";

interface OrderReviewProps {
  items: CartItemType[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  addressId: string;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export function OrderReview({
  items,
  subtotal,
  shipping,
  discount,
  total,
  paymentMethod,
  addressId,
  onBack,
  onSubmit,
  isSubmitting
}: OrderReviewProps) {
  const { user } = useUser();
  const address = user?.addresses.find(addr => addr.id === addressId);
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Review Your Order</h2>
      
      <div className="space-y-6">
        {/* Delivery Address */}
        <div>
          <h3 className="text-lg font-medium mb-2">Delivery Address</h3>
          <div className="bg-muted p-4 rounded-md">
            <p className="font-medium">{address?.name}</p>
            <p className="text-muted-foreground">
              {address?.line1}
              {address?.line2 && <>, {address.line2}</>}<br />
              {address?.city}, {address?.state} {address?.postalCode}<br />
              {address?.country}
            </p>
          </div>
        </div>
        
        {/* Payment Method */}
        <div>
          <h3 className="text-lg font-medium mb-2">Payment Method</h3>
          <div className="bg-muted p-4 rounded-md">
            <p>{paymentMethod}</p>
          </div>
        </div>
        
        {/* Order Items */}
        <div>
          <h3 className="text-lg font-medium mb-2">Items in Your Order</h3>
          <div className="border rounded-md divide-y">
            {items.map((item) => (
              <div key={item.product.id} className="p-4">
                <CartItem item={item} />
              </div>
            ))}
          </div>
        </div>
        
        {/* Order Summary */}
        <div>
          <h3 className="text-lg font-medium mb-2">Order Summary</h3>
          <div className="bg-muted p-4 rounded-md space-y-2">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping</p>
              <p>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</p>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <p>Discount</p>
                <p>-${discount.toFixed(2)}</p>
              </div>
            )}
            <div className="flex justify-between font-bold pt-2 border-t">
              <p>Total</p>
              <p>${total.toFixed(2)}</p>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-between">
          <Button 
            type="button" 
            variant="ghost" 
            onClick={onBack}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Payment
          </Button>
          
          <Button 
            onClick={onSubmit} 
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Place Order"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
