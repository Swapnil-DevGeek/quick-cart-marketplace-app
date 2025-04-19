
import React from "react";
import { ProductCard } from "./ProductCard";
import { ProductCardSkeleton } from "@/components/ui/loading-skeleton";
import { Product } from "@/types";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  className?: string;
  skeletonCount?: number;
}

export function ProductGrid({ 
  products, 
  loading = false, 
  columns = {
    sm: 2,
    md: 3,
    lg: 3,
    xl: 4
  }, 
  className,
  skeletonCount = 8
}: ProductGridProps) {
  const gridClassName = cn(
    "grid gap-6",
    {
      "grid-cols-1 sm:grid-cols-2": true,
      [`md:grid-cols-${columns.md}`]: columns.md,
      [`lg:grid-cols-${columns.lg}`]: columns.lg,
      [`xl:grid-cols-${columns.xl}`]: columns.xl,
    },
    className
  );
  
  if (loading) {
    return (
      <div className={gridClassName}>
        {Array(skeletonCount).fill(0).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }
  
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-lg text-muted-foreground mb-4">No products found</p>
        <p className="text-sm text-muted-foreground">
          Try adjusting your filters or search criteria
        </p>
      </div>
    );
  }
  
  return (
    <div className={gridClassName}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
