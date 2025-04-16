
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from "@/types";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { product, quantity } = item;
  const { updateQuantity, removeFromCart } = useCart();
  
  const price = product.discountPrice || product.price;
  const totalPrice = price * quantity;
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(product.id, newQuantity);
  };
  
  const handleRemove = () => {
    removeFromCart(product.id);
  };
  
  return (
    <div className="flex py-6 border-b">
      {/* Product image */}
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center"
          />
        </Link>
      </div>
      
      {/* Product details */}
      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between">
          <div>
            <h3 className="text-base font-medium">
              <Link to={`/product/${product.id}`} className="hover:text-primary">
                {product.name}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {product.category}
            </p>
            {product.inStock ? (
              <p className="mt-1 text-sm text-green-600">In Stock</p>
            ) : (
              <p className="mt-1 text-sm text-destructive">Out of Stock</p>
            )}
          </div>
          <p className="text-right font-medium">
            ${totalPrice.toFixed(2)}
          </p>
        </div>
        
        <div className="flex flex-1 items-end justify-between text-sm">
          {/* Quantity controls */}
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 rounded-full"
              onClick={() => handleQuantityChange(quantity - 1)}
            >
              <Minus className="h-3 w-3" />
              <span className="sr-only">Decrease quantity</span>
            </Button>
            
            <span className="mx-2 w-6 text-center">{quantity}</span>
            
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 rounded-full"
              onClick={() => handleQuantityChange(quantity + 1)}
            >
              <Plus className="h-3 w-3" />
              <span className="sr-only">Increase quantity</span>
            </Button>
          </div>
          
          {/* Remove button */}
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-destructive"
            onClick={handleRemove}
          >
            <Trash2 className="mr-1 h-4 w-4" />
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
}
