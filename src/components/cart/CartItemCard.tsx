
import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { CartItem } from "@/types";

interface CartItemCardProps {
  item: CartItem;
}

export function CartItemCard({ item }: CartItemCardProps) {
  const { product, quantity } = item;
  const { updateQuantity, removeFromCart } = useCart();
  const [isRemoving, setIsRemoving] = useState(false);
  
  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      removeFromCart(product.id);
    }, 300);
  };
  
  const handleIncreaseQuantity = () => {
    updateQuantity(product.id, quantity + 1);
  };
  
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    }
  };
  
  return (
    <div 
      className={`bg-card rounded-lg border p-4 transition-all duration-300 ${
        isRemoving ? "opacity-0 translate-x-5" : "opacity-100"
      }`}
    >
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Product image */}
        <Link 
          to={`/product/${product.id}`} 
          className="flex-shrink-0 w-full sm:w-24 h-24 rounded-md overflow-hidden bg-muted"
        >
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </Link>
        
        {/* Product details */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <div>
              <Link 
                to={`/product/${product.id}`} 
                className="text-lg font-medium hover:text-primary transition-colors"
              >
                {product.name}
              </Link>
              <p className="text-sm text-muted-foreground">
                Category: {product.category}
              </p>
              {product.estimatedDelivery && (
                <p className="text-sm text-muted-foreground">
                  Estimated Delivery: {product.estimatedDelivery}
                </p>
              )}
            </div>
            
            <div className="flex items-center text-lg font-medium">
              {product.discountPrice ? (
                <div className="flex flex-col items-end">
                  <span>${product.discountPrice.toFixed(2)}</span>
                  <span className="text-sm text-muted-foreground line-through">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span>${product.price.toFixed(2)}</span>
              )}
            </div>
          </div>
          
          {/* Quantity controls */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 rounded-l-md rounded-r-none"
                onClick={handleDecreaseQuantity}
                disabled={quantity <= 1}
              >
                <Minus className="h-3 w-3" />
                <span className="sr-only">Decrease quantity</span>
              </Button>
              
              <div className="h-8 w-10 flex items-center justify-center border-y">
                {quantity}
              </div>
              
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 rounded-r-md rounded-l-none"
                onClick={handleIncreaseQuantity}
              >
                <Plus className="h-3 w-3" />
                <span className="sr-only">Increase quantity</span>
              </Button>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground"
              onClick={handleRemove}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
