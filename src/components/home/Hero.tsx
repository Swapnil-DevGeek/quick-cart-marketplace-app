
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Array of hero images and messages
const heroContent = [
  {
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1774&auto=format&fit=crop",
    title: "Fresh Groceries Delivered",
    subtitle: "Get fresh produce and essentials delivered to your door in minutes.",
    cta: "Shop Now",
    link: "/category/fruits",
    align: "left" as const,
  },
  {
    image: "https://images.unsplash.com/photo-1545601445-4d6a0a0565f0?q=80&w=1774&auto=format&fit=crop",
    title: "Healthy Breakfast Options",
    subtitle: "Start your day right with our nutritious breakfast selection.",
    cta: "Explore",
    link: "/category/dairy",
    align: "right" as const,
  },
  {
    image: "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?q=80&w=1770&auto=format&fit=crop",
    title: "Fresh Meat & Seafood",
    subtitle: "Premium quality meat and seafood for your favorite recipes.",
    cta: "Shop Now",
    link: "/category/meats",
    align: "left" as const,
  },
];

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroContent.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const currentHero = heroContent[activeIndex];
  
  return (
    <div className="relative bg-muted overflow-hidden min-h-[400px] md:min-h-[500px]">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{ backgroundImage: `url(${currentHero.image})`, opacity: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
      </div>
      
      {/* Content */}
      <div className="container relative h-full flex items-center px-4 py-16 md:py-24">
        <div 
          className={`max-w-md ${
            currentHero.align === "right" ? "ml-auto mr-0" : "ml-0 mr-auto"
          } animate-fade-in`}
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {currentHero.title}
          </h1>
          <p className="text-lg md:text-xl mb-6 text-muted-foreground">
            {currentHero.subtitle}
          </p>
          <Button asChild size="lg">
            <Link to={currentHero.link}>
              {currentHero.cta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Slider indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {heroContent.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === activeIndex ? "w-8 bg-primary" : "w-2 bg-primary/50"
            }`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
