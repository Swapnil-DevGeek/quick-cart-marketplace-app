
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Hero } from "@/components/home/Hero";
import { ProductGrid } from "@/components/products/ProductGrid";
import { CategoryCard } from "@/components/home/CategoryCard";
import { categories, getFeaturedProducts, searchProducts } from "@/data/products";

export default function HomePage() {
  const [searchResults, setSearchResults] = useState<ReturnType<typeof searchProducts> | null>(null);
  const featuredProducts = getFeaturedProducts();
  
  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }
    
    setSearchResults(searchProducts(query));
  };
  
  return (
    <PageLayout onSearch={handleSearch}>
      {/* Display search results or normal home page content */}
      {searchResults ? (
        <div className="container py-8 px-4">
          <h1 className="text-3xl font-bold mb-6">Search Results</h1>
          <ProductGrid products={searchResults} />
        </div>
      ) : (
        <>
          {/* Hero section */}
          <Hero />
          
          {/* Categories */}
          <section className="container py-12 px-4">
            <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </section>
          
          {/* Featured Products */}
          <section className="bg-muted py-12">
            <div className="container px-4">
              <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
              <ProductGrid products={featuredProducts} />
            </div>
          </section>
          
          {/* Promotion Banner */}
          <section className="container py-12 px-4">
            <div className="bg-primary/10 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-2">Free Delivery on Orders Over $50</h2>
              <p className="mb-4 text-muted-foreground">
                Use code WELCOME10 for 10% off your first order
              </p>
              <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium">
                Shop Now
              </button>
            </div>
          </section>
        </>
      )}
    </PageLayout>
  );
}
