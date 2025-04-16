
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { CartItemList } from "@/components/cart/CartItemList";
import { CartSummary } from "@/components/cart/CartSummary";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { items, clearCart } = useCart();
  
  return (
    <PageLayout>
      <div className="container py-8 px-4">
        <div className="flex items-center gap-2 mb-6">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <span className="text-muted-foreground">
            ({items.length} {items.length === 1 ? 'item' : 'items'})
          </span>
        </div>
        
        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CartItemList />
              
              <div className="flex flex-wrap gap-4 mt-6">
                <Button variant="outline" asChild>
                  <Link to="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Continue Shopping
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={clearCart}
                  className="text-destructive hover:text-destructive"
                >
                  Clear Cart
                </Button>
              </div>
            </div>
            
            <div>
              <CartSummary />
            </div>
          </div>
        ) : (
          <div className="py-16 flex flex-col items-center justify-center text-center">
            <ShoppingBag className="h-16 w-16 mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              Looks like you haven't added anything to your cart yet. 
              Browse our products and discover great items!
            </p>
            <Button asChild size="lg">
              <Link to="/">
                Start Shopping
              </Link>
            </Button>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
