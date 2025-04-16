
import React from "react";
import { ProductCard } from "./ProductCard";
import { Product } from "@/types";

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
}

export function ProductGrid({ 
  products, 
  loading = false, 
  columns = {
    sm: 2,
    md: 3,
    lg: 4,
    xl: 4
  }, 
  className 
}: ProductGridProps) {
  const gridClassName = `grid grid-cols-${columns.sm || 2} md:grid-cols-${columns.md || 3} lg:grid-cols-${columns.lg || 4} xl:grid-cols-${columns.xl || 4} gap-4 ${className || ""}`;
  
  if (loading) {
    return (
      <div className={gridClassName}>
        {[...Array(8)].map((_, i) => (
          <div key={i} className="aspect-square rounded-md bg-muted animate-pulse"></div>
        ))}
      </div>
    );
  }
  
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-lg text-muted-foreground">No products found</p>
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
