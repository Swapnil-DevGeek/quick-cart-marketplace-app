
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

import { Product } from "@/types";
import { useCart } from "@/contexts/CartContext";
import { useUser } from "@/contexts/UserContext";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addToCart } = useCart();
  const { addToWishlist, user, isAuthenticated } = useUser();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const hasDiscount = !!product.discountPrice;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.price - product.discountPrice!) / product.price) * 100) 
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAuthenticated) {
      addToWishlist(product);
    } else {
      // Could show a login prompt here
      alert("Please login to add items to your wishlist");
    }
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setIsImageLoaded(true); // Consider the loading process complete even if it failed
  };

  return (
    <Card className={cn("h-full overflow-hidden transition-all duration-200 hover:shadow-md group", className)}>
      <Link to={`/product/${product.id}`} className="flex flex-col h-full">
        <div className="relative pt-[100%]">
          {/* Skeleton loader */}
          <div className={cn(
            "absolute inset-0 bg-muted/50",
            (isImageLoaded) ? "hidden" : "flex items-center justify-center"
          )}>
            <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          </div>
          
          {/* Product image or fallback */}
          {imageError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
              <Image className="h-16 w-16 text-muted-foreground" />
              <span className="sr-only">Image not available</span>
            </div>
          ) : (
            <img
              src={product.image}
              alt={product.name}
              className={cn(
                "absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105",
                !isImageLoaded && "opacity-0"
              )}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          )}
          
          {/* Discount badge */}
          {hasDiscount && (
            <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
              {discountPercentage}% OFF
            </Badge>
          )}
          
          {/* Quick action buttons */}
          <div className="absolute top-2 right-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-white/80 text-foreground hover:bg-white shadow-sm"
                    onClick={handleAddToWishlist}
                  >
                    <Heart className="h-4 w-4" />
                    <span className="sr-only">Add to Wishlist</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add to Wishlist</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          {/* Out of stock overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <p className="text-lg font-medium text-muted-foreground">Out of Stock</p>
            </div>
          )}
        </div>
        
        <CardContent className="flex-1 p-4">
          {/* Category */}
          <p className="text-xs text-muted-foreground uppercase mb-1">
            {product.category}
          </p>
          
          {/* Product name */}
          <h3 className="font-medium text-base line-clamp-2 mb-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <Star className="h-3.5 w-3.5 fill-primary text-primary" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
          </div>
          
          {/* Price */}
          <div className="flex items-baseline gap-2">
            {hasDiscount ? (
              <>
                <span className="font-semibold">${product.discountPrice?.toFixed(2)}</span>
                <span className="text-sm text-muted-foreground line-through">${product.price.toFixed(2)}</span>
              </>
            ) : (
              <span className="font-semibold">${product.price.toFixed(2)}</span>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          <Button 
            variant="default" 
            className="w-full" 
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
}
