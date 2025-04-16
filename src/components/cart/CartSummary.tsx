
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useUser } from "@/contexts/UserContext";
import { toast } from "sonner";

export function CartSummary() {
  const { items, subtotal, applyPromoCode, promoCode, discount } = useCart();
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();
  const [promoInput, setPromoInput] = useState("");
  const [isApplying, setIsApplying] = useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const shippingFee = subtotal > 50 || subtotal === 0 ? 0 : 4.99;
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal + shippingFee - discountAmount;

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) {
      toast.error("Please enter a promo code");
      return;
    }
    
    setIsApplying(true);
    setTimeout(() => {
      const success = applyPromoCode(promoInput.trim());
      if (success) {
        setPromoInput("");
      }
      setIsApplying(false);
    }, 800);
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to proceed to checkout");
      navigate("/login?redirect=checkout");
      return;
    }
    
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    
    navigate("/checkout");
  };

  return (
    <div className="rounded-lg bg-muted/50 p-6 shadow-sm">
      <h2 className="text-lg font-medium text-foreground mb-4">Order Summary</h2>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between">
          <p className="text-muted-foreground">Subtotal ({totalItems} items)</p>
          <p className="font-medium">${subtotal.toFixed(2)}</p>
        </div>
        
        <div className="flex justify-between">
          <p className="text-muted-foreground">Shipping</p>
          <p className="font-medium">
            {shippingFee === 0 ? (
              <span className="text-primary">Free</span>
            ) : (
              `$${shippingFee.toFixed(2)}`
            )}
          </p>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <p>Discount ({promoCode})</p>
            <p>-${discountAmount.toFixed(2)}</p>
          </div>
        )}
        
        <div className="border-t pt-4">
          <div className="flex justify-between font-medium">
            <p>Order total</p>
            <p>${total.toFixed(2)}</p>
          </div>
          {subtotal < 50 && subtotal > 0 && (
            <p className="text-xs text-muted-foreground mt-1">
              Add ${(50 - subtotal).toFixed(2)} more to qualify for free shipping
            </p>
          )}
        </div>
      </div>
      
      {/* Promo code input */}
      <form onSubmit={handlePromoSubmit} className="mb-6">
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Promo code"
            className="flex-1"
            value={promoInput}
            onChange={(e) => setPromoInput(e.target.value)}
            disabled={isApplying || !!promoCode}
          />
          <Button 
            type="submit" 
            variant="outline"
            disabled={isApplying || !!promoCode}
          >
            {isApplying ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
              "Apply"
            )}
          </Button>
        </div>
        {promoCode && (
          <p className="text-xs text-primary mt-1">
            Code "{promoCode}" applied successfully!
          </p>
        )}
      </form>
      
      {/* Checkout button */}
      <Button 
        className="w-full gap-2"
        size="lg"
        disabled={items.length === 0}
        onClick={handleCheckout}
      >
        Proceed to Checkout
        <ArrowRight className="h-4 w-4" />
      </Button>
      
      {/* Empty cart message */}
      {items.length === 0 && (
        <div className="mt-6 flex flex-col items-center text-center text-muted-foreground">
          <ShoppingBag className="h-12 w-12 mb-2 opacity-50" />
          <p>Your cart is empty</p>
          <Button variant="link" onClick={() => navigate("/")} className="mt-1">
            Continue shopping
          </Button>
        </div>
      )}
    </div>
  );
}
