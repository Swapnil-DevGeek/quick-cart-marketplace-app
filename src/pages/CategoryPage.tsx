
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, SlidersHorizontal, FilterX } from "lucide-react";
import { getProductsByCategory, categories } from "@/data/products";
import { Product } from "@/types";

// Filter types
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
  
  // Filter states
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
    // Load products for this category
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
  
  // Apply filters whenever filter state changes or products change
  useEffect(() => {
    if (allProducts.length === 0) return;
    
    let result = [...allProducts];
    
    // Apply price range filters
    if (filters.priceRanges.length > 0) {
      result = result.filter(product => {
        // Check if product price falls within any of the selected ranges
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
    
    // Apply rating filters
    if (filters.ratings.length > 0) {
      const minRating = Math.min(...filters.ratings);
      result = result.filter(product => product.rating >= minRating);
    }
    
    // Apply stock filters
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
        {/* Breadcrumb */}
        <Breadcrumb className="mb-4 flex p-1 bg-muted/50 rounded-lg text-sm overflow-x-auto whitespace-nowrap">
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="hover:text-primary">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/categories" className="hover:text-primary">Categories</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <span className="font-medium">{category?.name || "Category"}</span>
          </BreadcrumbItem>
        </Breadcrumb>
        
        {/* Category Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{category?.name || "Category"}</h1>
            <p className="text-muted-foreground">
              {category?.description || "Browse our products"} 
              {filteredProducts.length !== allProducts.length && 
                ` • ${filteredProducts.length} filtered results`}
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Button 
              variant="outline" 
              onClick={toggleFilters}
              className="flex items-center gap-2"
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
        
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          {filtersActive && (
            <div className="md:col-span-1">
              <div className="bg-background border rounded-lg p-4 sticky top-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-semibold">Filters</h2>
                  {(filters.priceRanges.length > 0 || filters.ratings.length > 0 || filters.inStock) && (
                    <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 text-xs">
                      Reset All
                    </Button>
                  )}
                </div>
                <Separator className="mb-4" />
                
                {/* Price Range */}
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Price Range</h3>
                  <div className="space-y-2">
                    {priceRanges.map((range, index) => (
                      <div key={`price-${index+1}`} className="flex items-center">
                        <input 
                          type="checkbox" 
                          id={`price-${index+1}`} 
                          className="mr-2"
                          checked={filters.priceRanges.includes(`price-${index+1}`)}
                          onChange={() => handlePriceRangeChange(`price-${index+1}`)}
                        />
                        <label htmlFor={`price-${index+1}`}>{range.label}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator className="mb-4" />
                
                {/* Rating */}
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Rating</h3>
                  <div className="space-y-2">
                    {[4, 3, 2].map((rating) => (
                      <div key={`rating-${rating}`} className="flex items-center">
                        <input 
                          type="checkbox" 
                          id={`rating-${rating}`} 
                          className="mr-2"
                          checked={filters.ratings.includes(rating)}
                          onChange={() => handleRatingChange(rating)}
                        />
                        <label htmlFor={`rating-${rating}`}>{rating}★ & Above</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator className="mb-4" />
                
                {/* Availability */}
                <div>
                  <h3 className="font-medium mb-2">Availability</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="in-stock" 
                        className="mr-2"
                        checked={filters.inStock}
                        onChange={() => handleStockFilterChange('inStock')}
                      />
                      <label htmlFor="in-stock">In Stock</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="out-stock" 
                        className="mr-2"
                        checked={filters.includeOutOfStock}
                        onChange={() => handleStockFilterChange('includeOutOfStock')}
                      />
                      <label htmlFor="out-stock">Include Out of Stock</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Product Grid */}
          <div className={filtersActive ? "md:col-span-3" : "md:col-span-4"}>
            <ProductGrid products={filteredProducts} loading={loading} />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
