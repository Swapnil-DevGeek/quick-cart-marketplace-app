
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, SlidersHorizontal, FilterX } from "lucide-react";
import { getProductsByCategory, categories } from "@/data/products";

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState(categoryId ? getProductsByCategory(categoryId) : []);
  const [loading, setLoading] = useState(true);
  const [filtersActive, setFiltersActive] = useState(false);
  
  const category = categories.find(cat => cat.id === categoryId);
  
  useEffect(() => {
    // Simulate loading
    setLoading(true);
    setTimeout(() => {
      if (categoryId) {
        setProducts(getProductsByCategory(categoryId));
      }
      setLoading(false);
    }, 500);
  }, [categoryId]);

  const toggleFilters = () => {
    setFiltersActive(!filtersActive);
  };
  
  return (
    <PageLayout>
      <div className="container py-8 px-4">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-4">
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/categories">Categories</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <span>{category?.name || "Category"}</span>
          </BreadcrumbItem>
        </Breadcrumb>
        
        {/* Category Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{category?.name || "Category"}</h1>
            <p className="text-muted-foreground">
              {category?.description || "Browse our products"}
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
              <div className="bg-background border rounded-lg p-4">
                <h2 className="font-semibold mb-3">Filters</h2>
                <Separator className="mb-4" />
                
                {/* Price Range */}
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Price Range</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="price-1" className="mr-2" />
                      <label htmlFor="price-1">Under $5</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="price-2" className="mr-2" />
                      <label htmlFor="price-2">$5 - $10</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="price-3" className="mr-2" />
                      <label htmlFor="price-3">$10 - $20</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="price-4" className="mr-2" />
                      <label htmlFor="price-4">Over $20</label>
                    </div>
                  </div>
                </div>
                
                <Separator className="mb-4" />
                
                {/* Rating */}
                <div className="mb-4">
                  <h3 className="font-medium mb-2">Rating</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="rating-4" className="mr-2" />
                      <label htmlFor="rating-4">4★ & Above</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="rating-3" className="mr-2" />
                      <label htmlFor="rating-3">3★ & Above</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="rating-2" className="mr-2" />
                      <label htmlFor="rating-2">2★ & Above</label>
                    </div>
                  </div>
                </div>
                
                <Separator className="mb-4" />
                
                {/* Availability */}
                <div>
                  <h3 className="font-medium mb-2">Availability</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="in-stock" className="mr-2" />
                      <label htmlFor="in-stock">In Stock</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="out-stock" className="mr-2" />
                      <label htmlFor="out-stock">Include Out of Stock</label>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 space-x-2">
                  <Button variant="outline" className="w-full">Reset</Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Product Grid */}
          <div className={filtersActive ? "md:col-span-3" : "md:col-span-4"}>
            <ProductGrid products={products} loading={loading} />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
