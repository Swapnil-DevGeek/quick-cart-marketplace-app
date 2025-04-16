
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { products } from "@/data/products";

export default function DealsPage() {
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter products that have a discount
  const discountedProducts = products.filter(product => product.discountPrice);

  // Calculate additional sample deals for different categories
  const flashDeals = discountedProducts.slice(0, 4);
  const weeklyDeals = discountedProducts.slice(4, 8);
  const clearanceDeals = discountedProducts.slice(8, 12);
  
  return (
    <PageLayout>
      <div className="container py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Special Deals</h1>
          <p className="text-muted-foreground">
            Discover our best offers and limited-time promotions
          </p>
        </div>
        
        {/* Banner */}
        <div className="bg-primary/10 rounded-lg p-8 text-center mb-12">
          <Badge className="mb-2 bg-primary text-primary-foreground">Limited Time Offer</Badge>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Up to 40% Off Top Products</h2>
          <p className="mb-6 text-muted-foreground max-w-xl mx-auto">
            Shop our biggest sale of the season and save on hundreds of top products.
            Hurry, these deals won't last long!
          </p>
          <Button size="lg" className="bg-primary text-primary-foreground px-8">
            Shop Now
          </Button>
        </div>
        
        {/* Deals Tabs */}
        <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="w-full max-w-md mx-auto grid grid-cols-4 mb-8">
            <TabsTrigger value="all">All Deals</TabsTrigger>
            <TabsTrigger value="flash">Flash Sale</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="clearance">Clearance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <ProductGrid products={discountedProducts} />
          </TabsContent>
          
          <TabsContent value="flash">
            <div className="mb-6 text-center">
              <h3 className="text-xl font-semibold">Flash Sale</h3>
              <p className="text-muted-foreground">Deals ending in 24 hours!</p>
            </div>
            <ProductGrid products={flashDeals} />
          </TabsContent>
          
          <TabsContent value="weekly">
            <div className="mb-6 text-center">
              <h3 className="text-xl font-semibold">Weekly Specials</h3>
              <p className="text-muted-foreground">Our best deals this week</p>
            </div>
            <ProductGrid products={weeklyDeals} />
          </TabsContent>
          
          <TabsContent value="clearance">
            <div className="mb-6 text-center">
              <h3 className="text-xl font-semibold">Clearance</h3>
              <p className="text-muted-foreground">Final discounts on last season's items</p>
            </div>
            <ProductGrid products={clearanceDeals} />
          </TabsContent>
        </Tabs>
        
        {/* Promotional Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div className="bg-secondary/30 rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
            <p className="text-muted-foreground mb-4">
              On all orders over $50. No promo code needed.
            </p>
            <Button variant="outline">Learn More</Button>
          </div>
          
          <div className="bg-secondary/30 rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Join Our Rewards</h3>
            <p className="text-muted-foreground mb-4">
              Get exclusive deals & earn points on every purchase.
            </p>
            <Button variant="outline">Sign Up Now</Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
