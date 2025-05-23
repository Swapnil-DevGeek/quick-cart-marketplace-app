
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Steps, StepIndicator, StepStatus, StepTitle, Step } from "@/components/ui/stepper";
import { LoaderCircle, Check, CreditCard, Truck, ClipboardCheck, ShoppingBag } from "lucide-react";
import { DeliveryInfoForm } from "./DeliveryInfoForm";
import { PaymentMethodForm } from "./PaymentMethodForm";
import { OrderReview } from "./OrderReview";
import { OrderConfirmation } from "./OrderConfirmation";
import { useCart } from "@/contexts/CartContext";
import { useUser } from "@/contexts/UserContext";
import { PaymentMethod, Order } from "@/types";
import { toast } from "sonner";

type CheckoutStep = "delivery" | "payment" | "review" | "confirmation";

interface StepData {
  delivery: {
    addressId: string;
  };
  payment: {
    method: PaymentMethod;
  };
}

export function CheckoutSteps() {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("delivery");
  const [stepData, setStepData] = useState<StepData>({
    delivery: { addressId: "" },
    payment: { method: PaymentMethod.CREDIT_CARD }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  
  const { user } = useUser();
  const { items, subtotal, discount, clearCart } = useCart();
  
  const discountAmount = (subtotal * discount) / 100;
  const shippingFee = subtotal > 50 ? 0 : 4.99;
  const total = subtotal + shippingFee - discountAmount;
  
  const handleDeliverySubmit = (addressId: string) => {
    setStepData(prev => ({
      ...prev,
      delivery: { addressId }
    }));
    
    // Store the selected address for order tracking
    if (user) {
      const address = user.addresses.find(addr => addr.id === addressId);
      if (address) {
        const addressString = `${address.line1}, ${address.city}, ${address.state} ${address.postalCode}`;
        localStorage.setItem('lastUsedAddress', addressString);
      }
    }
    
    setCurrentStep("payment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  const handlePaymentSubmit = (method: PaymentMethod) => {
    setStepData(prev => ({
      ...prev,
      payment: { method }
    }));
    setCurrentStep("review");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  const handleReviewSubmit = () => {
    setIsSubmitting(true);
    
    // Create order number
    const generatedOrderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrderNumber);
    
    // Simulate API call to process order
    setTimeout(() => {
      // Add order to user's order history if user is logged in
      if (user) {
        // Find selected address
        const address = user.addresses.find(addr => addr.id === stepData.delivery.addressId);
        
        if (address) {
          // Create new order
          const newOrder: Order = {
            id: generatedOrderNumber,
            items: [...items],
            totalAmount: total,
            address: address,
            paymentMethod: stepData.payment.method,
            status: "processing",
            createdAt: new Date().toISOString(),
            estimatedDelivery: "Tomorrow"
          };
          
          // Add order to localStorage
          const userData = JSON.parse(localStorage.getItem("user") || "{}");
          if (userData && userData.orders) {
            userData.orders = [newOrder, ...userData.orders];
            localStorage.setItem("user", JSON.stringify(userData));
          }
        }
      }
      
      setIsSubmitting(false);
      setCurrentStep("confirmation");
      clearCart();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 2000);
  };
  
  const handleBackToDelivery = () => {
    setCurrentStep("delivery");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  const handleBackToPayment = () => {
    setCurrentStep("payment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <Steps
        value={currentStep}
        className="mb-8"
      >
        <Step value="delivery">
          <StepIndicator>
            <StepStatus
              complete={<Check className="h-4 w-4" />}
              incomplete={<Truck className="h-4 w-4" />}
              active={<Truck className="h-4 w-4" />}
            />
          </StepIndicator>
          <StepTitle>Delivery</StepTitle>
        </Step>
        
        <Step value="payment">
          <StepIndicator>
            <StepStatus
              complete={<Check className="h-4 w-4" />}
              incomplete={<CreditCard className="h-4 w-4" />}
              active={<CreditCard className="h-4 w-4" />}
            />
          </StepIndicator>
          <StepTitle>Payment</StepTitle>
        </Step>
        
        <Step value="review">
          <StepIndicator>
            <StepStatus
              complete={<Check className="h-4 w-4" />}
              incomplete={<ClipboardCheck className="h-4 w-4" />}
              active={<ClipboardCheck className="h-4 w-4" />}
            />
          </StepIndicator>
          <StepTitle>Review</StepTitle>
        </Step>
        
        <Step value="confirmation">
          <StepIndicator>
            <StepStatus
              complete={<Check className="h-4 w-4" />}
              incomplete={<ShoppingBag className="h-4 w-4" />}
              active={<ShoppingBag className="h-4 w-4" />}
            />
          </StepIndicator>
          <StepTitle>Confirmation</StepTitle>
        </Step>
      </Steps>
      
      <div className="p-6 bg-card rounded-lg border">
        {currentStep === "delivery" && (
          <DeliveryInfoForm onSubmit={handleDeliverySubmit} />
        )}
        
        {currentStep === "payment" && (
          <PaymentMethodForm 
            onSubmit={handlePaymentSubmit}
            onBack={handleBackToDelivery}
          />
        )}
        
        {currentStep === "review" && (
          <OrderReview
            items={items}
            subtotal={subtotal}
            shipping={shippingFee}
            discount={discountAmount}
            total={total}
            paymentMethod={stepData.payment.method}
            addressId={stepData.delivery.addressId}
            onBack={handleBackToPayment}
            onSubmit={handleReviewSubmit}
            isSubmitting={isSubmitting}
          />
        )}
        
        {currentStep === "confirmation" && (
          <OrderConfirmation 
            orderNumber={orderNumber}
            total={total}
            estimatedDelivery="25 minutes (quick commerce)"
          />
        )}
      </div>
    </div>
  );
}
