
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Home, Building } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { Address } from "@/types";
import { toast } from "sonner";

interface DeliveryInfoFormProps {
  onSubmit: (addressId: string) => void;
}

export function DeliveryInfoForm({ onSubmit }: DeliveryInfoFormProps) {
  const { user, addAddress } = useUser();
  const [selectedAddressId, setSelectedAddressId] = useState(
    user?.addresses.find(addr => addr.isDefault)?.id || ""
  );
  const [isAddingNew, setIsAddingNew] = useState(false);
  
  // New address form state
  const [newAddress, setNewAddress] = useState({
    name: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "United States"
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isAddingNew) {
      // Validate new address
      if (!newAddress.name || !newAddress.line1 || !newAddress.city || 
          !newAddress.state || !newAddress.postalCode) {
        toast.error("Please fill all required fields");
        return;
      }
      
      // Add new address
      addAddress({
        ...newAddress,
        isDefault: false
      });
      
      // Get the newly created address ID - in a real app we'd get this from the API response
      const newAddressId = `addr-${Date.now()}`;
      onSubmit(newAddressId);
    } else {
      // Submit with selected address
      if (!selectedAddressId) {
        toast.error("Please select a delivery address");
        return;
      }
      
      onSubmit(selectedAddressId);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
      
      <form onSubmit={handleSubmit}>
        {user?.addresses.length ? (
          <>
            <h3 className="text-lg font-medium mb-2">Select a delivery address</h3>
            
            <RadioGroup 
              value={selectedAddressId} 
              onValueChange={setSelectedAddressId}
              className="mb-6 space-y-3"
            >
              {user.addresses.map((address) => (
                <div 
                  key={address.id}
                  className="flex items-start space-x-3 border rounded-md p-4 hover:border-primary transition-colors"
                >
                  <RadioGroupItem 
                    value={address.id} 
                    id={address.id} 
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Label htmlFor={address.id} className="font-medium cursor-pointer">
                        {address.name}
                      </Label>
                      {address.isDefault && (
                        <span className="bg-muted text-muted-foreground text-xs px-2 py-0.5 rounded">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {address.line1}
                      {address.line2 && <>, {address.line2}</>}<br />
                      {address.city}, {address.state} {address.postalCode}<br />
                      {address.country}
                    </p>
                  </div>
                </div>
              ))}
            </RadioGroup>
            
            {!isAddingNew ? (
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsAddingNew(true)}
                className="mb-6"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add a new address
              </Button>
            ) : null}
          </>
        ) : null}
        
        {isAddingNew || !user?.addresses.length ? (
          <div className="space-y-4 mb-6">
            <h3 className="text-lg font-medium">Add a new address</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Address nickname</Label>
                <div className="relative">
                  <div className="absolute left-3 top-3 text-muted-foreground">
                    <Home className="h-4 w-4" />
                  </div>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Home, Work, etc."
                    value={newAddress.name}
                    onChange={handleChange}
                    className="pl-9"
                  />
                </div>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="line1">Address Line 1</Label>
                <div className="relative">
                  <div className="absolute left-3 top-3 text-muted-foreground">
                    <Building className="h-4 w-4" />
                  </div>
                  <Input
                    id="line1"
                    name="line1"
                    placeholder="Street address"
                    value={newAddress.line1}
                    onChange={handleChange}
                    className="pl-9"
                  />
                </div>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="line2">Address Line 2 (Optional)</Label>
                <Input
                  id="line2"
                  name="line2"
                  placeholder="Apartment, suite, unit, etc."
                  value={newAddress.line2}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  placeholder="City"
                  value={newAddress.city}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="state">State / Province</Label>
                <Input
                  id="state"
                  name="state"
                  placeholder="State"
                  value={newAddress.state}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  placeholder="Postal code"
                  value={newAddress.postalCode}
                  onChange={handleChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  placeholder="Country"
                  value={newAddress.country}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            {user?.addresses.length ? (
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => setIsAddingNew(false)}
              >
                Cancel
              </Button>
            ) : null}
          </div>
        ) : null}
        
        <div className="flex justify-end">
          <Button type="submit" size="lg">
            Continue to Payment
          </Button>
        </div>
      </form>
    </div>
  );
}
