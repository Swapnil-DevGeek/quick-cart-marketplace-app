
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, Wallet, BanknoteIcon, ChevronLeft } from "lucide-react";
import { PaymentMethod } from "@/types";

interface PaymentMethodFormProps {
  onSubmit: (method: PaymentMethod) => void;
  onBack: () => void;
}

export function PaymentMethodForm({ onSubmit, onBack }: PaymentMethodFormProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(PaymentMethod.CREDIT_CARD);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(selectedMethod);
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Choose Payment Method</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card 
            className={`cursor-pointer transition-colors hover:border-primary ${
              selectedMethod === PaymentMethod.CREDIT_CARD ? 'border-primary' : ''
            }`}
            onClick={() => setSelectedMethod(PaymentMethod.CREDIT_CARD)}
          >
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`p-2 rounded-full ${
                selectedMethod === PaymentMethod.CREDIT_CARD 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                <CreditCard className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Credit Card</p>
                <p className="text-sm text-muted-foreground">Pay with Visa, Mastercard, etc.</p>
              </div>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-colors hover:border-primary ${
              selectedMethod === PaymentMethod.UPI ? 'border-primary' : ''
            }`}
            onClick={() => setSelectedMethod(PaymentMethod.UPI)}
          >
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`p-2 rounded-full ${
                selectedMethod === PaymentMethod.UPI 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                <Wallet className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">UPI</p>
                <p className="text-sm text-muted-foreground">Pay with UPI apps</p>
              </div>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-colors hover:border-primary ${
              selectedMethod === PaymentMethod.COD ? 'border-primary' : ''
            }`}
            onClick={() => setSelectedMethod(PaymentMethod.COD)}
          >
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`p-2 rounded-full ${
                selectedMethod === PaymentMethod.COD 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                <BanknoteIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Cash on Delivery</p>
                <p className="text-sm text-muted-foreground">Pay when you receive</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Mock credit card form would go here if selected */}
        
        <div className="flex justify-between">
          <Button 
            type="button" 
            variant="ghost" 
            onClick={onBack}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Delivery
          </Button>
          
          <Button type="submit" size="lg">
            Continue to Review
          </Button>
        </div>
      </form>
    </div>
  );
}
