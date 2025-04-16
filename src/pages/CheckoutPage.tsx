
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { CheckoutSteps } from "@/components/checkout/CheckoutSteps";
import { useCart } from "@/contexts/CartContext";
import { useUser } from "@/contexts/UserContext";

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();
  
  // Redirect if not authenticated or cart is empty
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login?redirect=checkout");
      return;
    }
    
    if (items.length === 0) {
      navigate("/cart");
      return;
    }
  }, [isAuthenticated, items.length, navigate]);
  
  return (
    <PageLayout>
      <div className="container py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Checkout</h1>
          <p className="text-muted-foreground">
            Complete your purchase by following the steps below.
          </p>
        </div>
        
        <CheckoutSteps />
      </div>
    </PageLayout>
  );
}
