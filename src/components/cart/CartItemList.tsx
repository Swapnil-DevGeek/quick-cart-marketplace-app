
import { useCart } from "@/contexts/CartContext";
import { CartItemCard } from "./CartItemCard";

export function CartItemList() {
  const { items } = useCart();
  
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <CartItemCard 
          key={item.product.id} 
          item={item} 
        />
      ))}
    </div>
  );
}
