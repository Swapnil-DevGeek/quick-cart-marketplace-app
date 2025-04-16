
import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, Product } from "@/types";
import { toast } from "sonner";

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  totalItems: number;
  applyPromoCode: (code: string) => boolean;
  discount: number;
  promoCode: string | null;
  removePromoCode: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [discount, setDiscount] = useState<number>(0);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedPromo = localStorage.getItem("promoCode");
    const savedDiscount = localStorage.getItem("discount");
    
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
    
    if (savedPromo) {
      setPromoCode(savedPromo);
    }
    
    if (savedDiscount) {
      setDiscount(Number(savedDiscount));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  // Save promo code and discount to localStorage whenever they change
  useEffect(() => {
    if (promoCode) {
      localStorage.setItem("promoCode", promoCode);
      localStorage.setItem("discount", discount.toString());
    } else {
      localStorage.removeItem("promoCode");
      localStorage.removeItem("discount");
    }
  }, [promoCode, discount]);

  const addToCart = (product: Product, quantity = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        // Increase quantity if item already exists
        return prevItems.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        // Add new item
        return [...prevItems, { product, quantity }];
      }
    });
    
    toast.success(`${product.name} added to cart`);
  };

  const removeFromCart = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.product.id !== productId));
    toast.success("Item removed from cart");
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setPromoCode(null);
    setDiscount(0);
    toast.success("Cart cleared");
  };

  // Mock promo code validation and application
  const applyPromoCode = (code: string) => {
    // In a real app, you would validate this against an API
    const validPromoCodes: Record<string, number> = {
      "WELCOME10": 10,
      "SUMMER20": 20,
      "FLASH50": 50
    };
    
    if (validPromoCodes[code]) {
      setPromoCode(code);
      setDiscount(validPromoCodes[code]);
      toast.success(`Promo code ${code} applied successfully!`);
      return true;
    } else {
      toast.error("Invalid promo code");
      return false;
    }
  };

  const removePromoCode = () => {
    setPromoCode(null);
    setDiscount(0);
    toast.success("Promo code removed");
  };

  // Calculate subtotal
  const subtotal = items.reduce(
    (sum, item) => sum + (item.product.discountPrice || item.product.price) * item.quantity, 
    0
  );

  // Calculate total number of items
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        totalItems,
        applyPromoCode,
        discount,
        promoCode,
        removePromoCode
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
