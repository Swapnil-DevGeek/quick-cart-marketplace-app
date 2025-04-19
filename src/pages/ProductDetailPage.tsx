
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/products/ProductGrid";
import { useCart } from "@/contexts/CartContext";
import { useUser } from "@/contexts/UserContext";
import { getProductById, getRelatedProducts } from "@/data/products";
import { Heart, Minus, Plus, ShoppingBag, Star, Truck, Image } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, isAuthenticated } = useUser();
  
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  
  // Get product data
  const product = productId ? getProductById(productId) : null;
  const relatedProducts = product ? getRelatedProducts(product.id) : [];
  
  // Handle 404 for invalid product ID
  useEffect(() => {
    if (productId && !product) {
      navigate("/not-found");
    }
  }, [productId, product, navigate]);
  
  if (!product) {
    return null; // Will redirect via the useEffect above
  }
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  const handleAddToWishlist = () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to add items to your wishlist");
      return;
    }
    addToWishlist(product);
  };
  
  // Gallery images (use main image if no gallery provided)
  const galleryImages = product.gallery?.length 
    ? product.gallery 
    : [product.image];
  
  const handleImageLoad = (index: number) => {
    setImagesLoaded(prev => ({ ...prev, [index]: true }));
  };

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
    setImagesLoaded(prev => ({ ...prev, [index]: true })); // Consider loading complete
  };
  
  return (
    <PageLayout>
      <div className="container py-8 px-4">
        {/* Product details section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Product images */}
          <div>
            <div className="aspect-square rounded-lg overflow-hidden bg-muted mb-4 relative">
              {!imagesLoaded[activeImageIndex] && !imageErrors[activeImageIndex] && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                </div>
              )}
              
              {imageErrors[activeImageIndex] ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/20 p-4">
                  <Image className="h-24 w-24 text-muted-foreground mb-2" />
                  <p className="text-center text-muted-foreground">Image not available</p>
                </div>
              ) : (
                <img
                  src={galleryImages[activeImageIndex]}
                  alt={product.name}
                  className={`w-full h-full object-cover ${!imagesLoaded[activeImageIndex] ? 'opacity-0' : ''}`}
                  onLoad={() => handleImageLoad(activeImageIndex)}
                  onError={() => handleImageError(activeImageIndex)}
                />
              )}
            </div>
            
            {galleryImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {galleryImages.map((image, index) => (
                  <button
                    key={index}
                    className={`aspect-square rounded-md overflow-hidden border-2 ${
                      index === activeImageIndex 
                        ? "border-primary" 
                        : "border-transparent"
                    } relative`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    {!imagesLoaded[index] && !imageErrors[index] && (
                      <Skeleton className="absolute inset-0" />
                    )}
                    
                    {imageErrors[index] ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
                        <Image className="h-6 w-6 text-muted-foreground" />
                      </div>
                    ) : (
                      <img
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        className={`w-full h-full object-cover ${!imagesLoaded[index] ? 'opacity-0' : ''}`}
                        onLoad={() => handleImageLoad(index)}
                        onError={() => handleImageError(index)}
                      />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product info */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center gap-1 mb-4">
              <div className="flex items-center text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating) 
                        ? "fill-primary text-primary" 
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({product.reviewCount} reviews)
              </span>
            </div>
            
            {/* Price */}
            <div className="mb-6">
              {product.discountPrice ? (
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">
                    ${product.discountPrice.toFixed(2)}
                  </span>
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="bg-primary/10 text-primary text-sm font-medium px-2 py-1 rounded">
                    {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
            
            {/* Availability & Delivery */}
            <div className="flex items-center gap-2 mb-6">
              <Truck className="h-4 w-4 text-muted-foreground" />
              <span>
                {product.inStock ? (
                  <span className="text-green-600 font-medium">In Stock</span>
                ) : (
                  <span className="text-destructive font-medium">Out of Stock</span>
                )}
                {product.inStock && product.estimatedDelivery && (
                  <span className="text-muted-foreground">
                    {" "}
                    - Estimated delivery {product.estimatedDelivery}
                  </span>
                )}
              </span>
            </div>
            
            {/* Description */}
            <p className="text-muted-foreground mb-6">
              {product.description}
            </p>
            
            {/* Add to cart */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-r-none"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="h-10 w-12 flex items-center justify-center border-y">
                  {quantity}
                </div>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-l-none"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex-1 grid grid-cols-2 gap-3">
                <Button 
                  className="w-full" 
                  disabled={!product.inStock}
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleAddToWishlist}
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Wishlist
                </Button>
              </div>
            </div>
            
            {/* Specifications */}
            {product.specifications && product.specifications.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Specifications</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="flex">
                      <span className="text-muted-foreground min-w-32">{spec.name}:</span>
                      <span className="font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </PageLayout>
  );
}
