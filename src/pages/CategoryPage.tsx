import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, SlidersHorizontal, FilterX } from "lucide-react";
import { getProductsByCategory, categories } from "@/data/products";
import { Product } from "@/types";

interface PriceRange {
  min: number;
  max: number | null;
  label: string;
}

interface FilterState {
  priceRanges: string[];
  ratings: number[];
  inStock: boolean;
  includeOutOfStock: boolean;
}

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtersActive, setFiltersActive] = useState(false);
  
  const [filters, setFilters] = useState<FilterState>({
    priceRanges: [],
    ratings: [],
    inStock: false,
    includeOutOfStock: true
  });
  
  const category = categories.find(cat => cat.id === categoryId);
  
  const priceRanges: PriceRange[] = [
    { min: 0, max: 5, label: "Under $5" },
    { min: 5, max: 10, label: "$5 - $10" },
    { min: 10, max: 20, label: "$10 - $20" },
    { min: 20, max: null, label: "Over $20" }
  ];
  
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (categoryId) {
        const products = getProductsByCategory(categoryId);
        setAllProducts(products);
        setFilteredProducts(products);
      }
      setLoading(false);
    }, 500);
  }, [categoryId]);
  
  useEffect(() => {
    if (allProducts.length === 0) return;
    
    let result = [...allProducts];
    
    if (filters.priceRanges.length > 0) {
      result = result.filter(product => {
        return filters.priceRanges.some(rangeId => {
          const priceRange = priceRanges.find((_, index) => `price-${index+1}` === rangeId);
          if (!priceRange) return false;
          
          const price = product.discountPrice || product.price;
          if (priceRange.max === null) {
            return price >= priceRange.min;
          }
          return price >= priceRange.min && price < priceRange.max;
        });
      });
    }
    
    if (filters.ratings.length > 0) {
      const minRating = Math.min(...filters.ratings);
      result = result.filter(product => product.rating >= minRating);
    }
    
    if (filters.inStock && !filters.includeOutOfStock) {
      result = result.filter(product => product.inStock);
    }
    
    setFilteredProducts(result);
  }, [filters, allProducts]);

  const toggleFilters = () => {
    setFiltersActive(!filtersActive);
  };
  
  const handlePriceRangeChange = (rangeId: string) => {
    setFilters(prev => {
      const updated = { ...prev };
      if (updated.priceRanges.includes(rangeId)) {
        updated.priceRanges = updated.priceRanges.filter(id => id !== rangeId);
      } else {
        updated.priceRanges = [...updated.priceRanges, rangeId];
      }
      return updated;
    });
  };
  
  const handleRatingChange = (rating: number) => {
    setFilters(prev => {
      const updated = { ...prev };
      if (updated.ratings.includes(rating)) {
        updated.ratings = updated.ratings.filter(r => r !== rating);
      } else {
        updated.ratings = [...updated.ratings, rating];
      }
      return updated;
    });
  };
  
  const handleStockFilterChange = (filterName: 'inStock' | 'includeOutOfStock') => {
    setFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };
  
  const resetFilters = () => {
    setFilters({
      priceRanges: [],
      ratings: [],
      inStock: false,
      includeOutOfStock: true
    });
  };
  
  return (
    <PageLayout>
      <div className="container py-8 px-4">
        <Breadcrumb className="mb-6">
          <BreadcrumbList className="flex items-center space-x-1.5 text-sm text-muted-foreground">
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="hover:text-primary transition-colors">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/categories" className="hover:text-primary transition-colors">Categories</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <span className="font-medium text-foreground">{category?.name || "Category"}</span>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">{category?.name || "Category"}</h1>
            <p className="text-lg text-muted-foreground">
              {category?.description || "Browse our products"} 
              {filteredProducts.length !== allProducts.length && 
                ` • ${filteredProducts.length} filtered results`}
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Button 
              variant="outline" 
              onClick={toggleFilters}
              className="flex items-center gap-2 transition-colors hover:bg-muted"
            >
              {filtersActive ? (
                <>
                  <FilterX className="h-4 w-4" />
                  Hide Filters
                </>
              ) : (
                <>
                  <SlidersHorizontal className="h-4 w-4" />
                  Show Filters
                </>
              )}
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {filtersActive && (
            <div className="md:col-span-1">
              <div className="bg-card rounded-lg border p-6 sticky top-20 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  {(filters.priceRanges.length > 0 || filters.ratings.length > 0 || filters.inStock) && (
                    <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 text-xs">
                      Reset All
                    </Button>
                  )}
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="space-y-2">
                    {priceRanges.map((range, index) => (
                      <label key={`price-${index+1}`} className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          className="rounded border-input"
                          checked={filters.priceRanges.includes(`price-${index+1}`)}
                          onChange={() => handlePriceRangeChange(`price-${index+1}`)}
                        />
                        <span className="text-sm">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-3">Rating</h3>
                  <div className="space-y-2">
                    {[4, 3, 2].map((rating) => (
                      <label key={`rating-${rating}`} className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          className="rounded border-input"
                          checked={filters.ratings.includes(rating)}
                          onChange={() => handleRatingChange(rating)}
                        />
                        <span className="text-sm">{rating}★ & Above</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium mb-3">Availability</h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        className="rounded border-input"
                        checked={filters.inStock}
                        onChange={() => handleStockFilterChange('inStock')}
                      />
                      <span className="text-sm">In Stock</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        className="rounded border-input"
                        checked={filters.includeOutOfStock}
                        onChange={() => handleStockFilterChange('includeOutOfStock')}
                      />
                      <span className="text-sm">Include Out of Stock</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className={filtersActive ? "md:col-span-3" : "md:col-span-4"}>
            <ProductGrid products={filteredProducts} loading={loading} />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
