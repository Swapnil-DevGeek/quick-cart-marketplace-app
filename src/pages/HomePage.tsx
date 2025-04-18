
import { useState, useEffect } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Hero } from "@/components/home/Hero";
import { ProductGrid } from "@/components/products/ProductGrid";
import { CategoryCard } from "@/components/home/CategoryCard";
import { categories, getFeaturedProducts, getProductsByCategory, searchProducts } from "@/data/products";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [searchResults, setSearchResults] = useState<ReturnType<typeof searchProducts> | null>(null);
  const [loading, setLoading] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [fruitProducts, setFruitProducts] = useState([]);
  const [dairyProducts, setDairyProducts] = useState([]);
  
  useEffect(() => {
    // Simulate network latency for loading states
    const loadData = async () => {
      setLoading(true);
      
      // Staggered loading for better UX
      setTimeout(() => {
        setFeaturedProducts(getFeaturedProducts());
        
        setTimeout(() => {
          setFruitProducts(getProductsByCategory("fruits").slice(0, 4));
          
          setTimeout(() => {
            setDairyProducts(getProductsByCategory("dairy").slice(0, 4));
            setLoading(false);
          }, 300);
        }, 300);
      }, 400);
    };
    
    loadData();
  }, []);
  
  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }
    
    setLoading(true);
    // Simulate search delay
    setTimeout(() => {
      setSearchResults(searchProducts(query));
      setLoading(false);
    }, 500);
  };
  
  return (
    <PageLayout onSearch={handleSearch}>
      {/* Display search results or normal home page content */}
      {searchResults ? (
        <div className="container py-8 px-4 animate-fade-in">
          <h1 className="text-3xl font-bold mb-6">Search Results</h1>
          <ProductGrid products={searchResults} loading={loading} />
        </div>
      ) : (
        <>
          {/* Hero section */}
          <Hero />
          
          {/* Featured Products */}
          <section className="bg-muted py-12">
            <div className="container px-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Featured Products</h2>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/deals" className="flex items-center">
                    View all <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
              <ProductGrid 
                products={featuredProducts} 
                loading={loading} 
              />
            </div>
          </section>
          
          {/* Categories */}
          <section className="container py-12 px-4">
            <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </section>
          
          {/* Fruits & Vegetables Section */}
          <section className="container py-12 px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Fresh Fruits & Vegetables</h2>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/category/fruits" className="flex items-center">
                  View all <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
            <ProductGrid 
              products={fruitProducts} 
              loading={loading} 
              columns={{ sm: 2, md: 2, lg: 4, xl: 4 }}
              skeletonCount={4}
            />
          </section>
          
          {/* Dairy & Breakfast Section */}
          <section className="container py-12 px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Dairy & Breakfast</h2>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/category/dairy" className="flex items-center">
                  View all <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
            <ProductGrid 
              products={dairyProducts} 
              loading={loading} 
              columns={{ sm: 2, md: 2, lg: 4, xl: 4 }}
              skeletonCount={4}
            />
          </section>
          
          {/* Promotion Banner */}
          <section className="container py-12 px-4">
            <div className="bg-primary/10 rounded-lg p-8 text-center transition-transform hover:scale-[1.01] duration-300">
              <h2 className="text-2xl font-bold mb-2">Free Delivery on Orders Over $50</h2>
              <p className="mb-4 text-muted-foreground">
                Use code WELCOME10 for 10% off your first order
              </p>
              <Button className="animate-pulse">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Shop Now
              </Button>
            </div>
          </section>
        </>
      )}
    </PageLayout>
  );
}
