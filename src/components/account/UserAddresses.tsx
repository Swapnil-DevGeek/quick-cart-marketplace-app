
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Home, Plus, Edit, Trash2, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@/contexts/UserContext";
import { Address } from "@/types";
import { cn } from "@/lib/utils";

export function UserAddresses() {
  const { user, addAddress, updateAddress, removeAddress, setDefaultAddress } = useUser();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState<Omit<Address, "id">>({
    name: "",
    line1: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    isDefault: false
  });

  const resetForm = () => {
    setFormData({
      name: "",
      line1: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      isDefault: false
    });
    setCurrentAddress(null);
  };

  const handleOpenDialog = (address?: Address) => {
    if (address) {
      setCurrentAddress(address);
      setFormData({
        name: address.name,
        line1: address.line1,
        line2: address.line2,
        city: address.city,
        state: address.state,
        postalCode: address.postalCode,
        country: address.country,
        isDefault: !!address.isDefault
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentAddress) {
      updateAddress({
        ...formData,
        id: currentAddress.id
      });
      toast.success("Address updated successfully");
    } else {
      addAddress(formData);
      toast.success("Address added successfully");
    }
    
    handleCloseDialog();
  };

  const handleRemove = (addressId: string) => {
    if (confirm("Are you sure you want to remove this address?")) {
      removeAddress(addressId);
      toast.success("Address removed successfully");
    }
  };

  const handleSetDefault = (addressId: string) => {
    setDefaultAddress(addressId);
    toast.success("Default address updated");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Saved Addresses</CardTitle>
            <CardDescription>Manage your delivery addresses</CardDescription>
          </div>
          <Button onClick={() => handleOpenDialog()}>
            <Plus className="mr-2 h-4 w-4" />
            Add Address
          </Button>
        </CardHeader>
        <CardContent>
          {user?.addresses && user.addresses.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
              {user.addresses.map((address) => (
                <div 
                  key={address.id} 
                  className={cn(
                    "border rounded-lg p-4 relative",
                    address.isDefault && "border-primary"
                  )}
                >
                  {address.isDefault && (
                    <span className="absolute top-2 right-2 text-primary">
                      <CheckCircle className="h-5 w-5" />
                    </span>
                  )}
                  <div className="flex items-start mb-2">
                    <Home className="h-5 w-5 mr-2 mt-0.5" />
                    <div>
                      <h3 className="font-semibold">{address.name}</h3>
                      <p className="text-sm text-muted-foreground">{address.line1}</p>
                      {address.line2 && <p className="text-sm text-muted-foreground">{address.line2}</p>}
                      <p className="text-sm text-muted-foreground">
                        {address.city}, {address.state} {address.postalCode}
                      </p>
                      <p className="text-sm text-muted-foreground">{address.country}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    {!address.isDefault && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleSetDefault(address.id)}
                      >
                        Set as Default
                      </Button>
                    )}
                    <div className="flex items-center space-x-2 ml-auto">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleOpenDialog(address)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleRemove(address.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">You don't have any saved addresses yet</p>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="mr-2 h-4 w-4" />
                Add Address
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {currentAddress ? "Edit Address" : "Add New Address"}
            </DialogTitle>
            <DialogDescription>
              Enter the address details below
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Address Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Home, Work, etc."
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="line1">Address Line 1</Label>
              <Input
                id="line1"
                name="line1"
                placeholder="Street address"
                value={formData.line1}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="line2">Address Line 2 (Optional)</Label>
              <Input
                id="line2"
                name="line2"
                placeholder="Apartment, suite, unit, etc."
                value={formData.line2 || ""}
                onChange={handleChange}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isDefault"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleChange}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="isDefault">Set as default address</Label>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button type="submit">
                {currentAddress ? "Update Address" : "Add Address"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
