
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Product, Address } from "@/types";
import { toast } from "sonner";

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  addAddress: (address: Omit<Address, "id">) => void;
  updateAddress: (address: Address) => void;
  removeAddress: (addressId: string) => void;
  setDefaultAddress: (addressId: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Mock user for demo purposes
const mockUser: User = {
  id: "user1",
  name: "Demo User",
  email: "demo@example.com",
  addresses: [
    {
      id: "addr1",
      name: "Home",
      line1: "123 Main St",
      city: "Anytown",
      state: "State",
      postalCode: "12345",
      country: "Country",
      isDefault: true
    }
  ],
  orders: [],
  wishlist: []
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on initial render
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    // This would normally be an API call
    try {
      // Mock login - in a real app, this would verify against a backend
      if (email === "demo@example.com" && password === "password") {
        setUser(mockUser);
        toast.success("Logged in successfully");
        return true;
      }
      toast.error("Invalid credentials");
      return false;
    } catch (error) {
      toast.error("Login failed");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    toast.success("Logged out successfully");
  };

  const register = async (name: string, email: string, password: string) => {
    // This would normally be an API call
    try {
      // Mock registration - in a real app, this would call to a backend
      setUser({
        ...mockUser,
        name,
        email
      });
      toast.success("Registered successfully");
      return true;
    } catch (error) {
      toast.error("Registration failed");
      return false;
    }
  };

  const addToWishlist = (product: Product) => {
    if (!user) {
      toast.error("Please login to add items to wishlist");
      return;
    }

    setUser(prevUser => {
      if (!prevUser) return null;
      
      // Check if product is already in wishlist
      const isInWishlist = prevUser.wishlist.some(item => item.id === product.id);
      
      if (isInWishlist) {
        toast.info("Item already in wishlist");
        return prevUser;
      }
      
      toast.success("Added to wishlist");
      return {
        ...prevUser,
        wishlist: [...prevUser.wishlist, product]
      };
    });
  };

  const removeFromWishlist = (productId: string) => {
    if (!user) return;

    setUser(prevUser => {
      if (!prevUser) return null;
      
      toast.success("Removed from wishlist");
      return {
        ...prevUser,
        wishlist: prevUser.wishlist.filter(item => item.id !== productId)
      };
    });
  };

  const addAddress = (addressData: Omit<Address, "id">) => {
    if (!user) return;

    const newAddress: Address = {
      ...addressData,
      id: `addr-${Date.now()}`
    };

    setUser(prevUser => {
      if (!prevUser) return null;
      
      // If this is the first address, make it default
      if (prevUser.addresses.length === 0) {
        newAddress.isDefault = true;
      }
      
      toast.success("Address added");
      return {
        ...prevUser,
        addresses: [...prevUser.addresses, newAddress]
      };
    });
  };

  const updateAddress = (address: Address) => {
    if (!user) return;

    setUser(prevUser => {
      if (!prevUser) return null;
      
      toast.success("Address updated");
      return {
        ...prevUser,
        addresses: prevUser.addresses.map(addr => 
          addr.id === address.id ? address : addr
        )
      };
    });
  };

  const removeAddress = (addressId: string) => {
    if (!user) return;

    setUser(prevUser => {
      if (!prevUser) return null;
      
      const filteredAddresses = prevUser.addresses.filter(addr => addr.id !== addressId);
      
      // If we removed the default address and there are other addresses, make the first one default
      if (
        prevUser.addresses.find(addr => addr.id === addressId)?.isDefault &&
        filteredAddresses.length > 0
      ) {
        filteredAddresses[0].isDefault = true;
      }
      
      toast.success("Address removed");
      return {
        ...prevUser,
        addresses: filteredAddresses
      };
    });
  };

  const setDefaultAddress = (addressId: string) => {
    if (!user) return;

    setUser(prevUser => {
      if (!prevUser) return null;
      
      toast.success("Default address updated");
      return {
        ...prevUser,
        addresses: prevUser.addresses.map(addr => ({
          ...addr,
          isDefault: addr.id === addressId
        }))
      };
    });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        addToWishlist,
        removeFromWishlist,
        addAddress,
        updateAddress,
        removeAddress,
        setDefaultAddress
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
