
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/products/ProductGrid";
import { useUser } from "@/contexts/UserContext";
import { Heart, Trash2, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function WishlistPage() {
  const { user, isAuthenticated, removeFromWishlist } = useUser();
  const navigate = useNavigate();
  const [showRemoveButtons, setShowRemoveButtons] = useState(false);
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login?redirect=wishlist");
    }
  }, [isAuthenticated, navigate]);
  
  if (!isAuthenticated) {
    return null;
  }
  
  const handleRemoveItem = (productId: string) => {
    removeFromWishlist(productId);
    toast.success("Item removed from wishlist");
  };
  
  const toggleRemoveMode = () => {
    setShowRemoveButtons(!showRemoveButtons);
  };
  
  return (
    <PageLayout>
      <div className="container py-8 px-4">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
            <p className="text-muted-foreground">
              Items you've saved for later.
            </p>
          </div>
          
          {user?.wishlist && user.wishlist.length > 0 && (
            <Button 
              variant="outline" 
              onClick={toggleRemoveMode}
              className="mt-4 sm:mt-0"
            >
              {showRemoveButtons ? (
                <>
                  <X className="mr-2 h-4 w-4" />
                  Done
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remove Items
                </>
              )}
            </Button>
          )}
        </div>
        
        {user?.wishlist && user.wishlist.length > 0 ? (
          <div>
            {showRemoveButtons ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {user.wishlist.map((product) => (
                  <Card key={product.id} className="overflow-hidden group">
                    <div className="relative">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-48 object-cover"
                      />
                      {product.discountPrice && (
                        <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                          Sale
                        </Badge>
                      )}
                      <Button 
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8"
                        onClick={() => handleRemoveItem(product.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium line-clamp-2 mb-1">{product.name}</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          {product.discountPrice ? (
                            <div className="flex items-center">
                              <span className="font-bold">${product.discountPrice.toFixed(2)}</span>
                              <span className="text-muted-foreground line-through ml-2">
                                ${product.price.toFixed(2)}
                              </span>
                            </div>
                          ) : (
                            <span className="font-bold">${product.price.toFixed(2)}</span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <ProductGrid products={user.wishlist} />
            )}
          </div>
        ) : (
          <div className="text-center py-16">
            <Heart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">
              Add items to your wishlist by clicking the heart icon on product pages.
            </p>
            <Button onClick={() => navigate("/")}>
              Start Shopping
            </Button>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
