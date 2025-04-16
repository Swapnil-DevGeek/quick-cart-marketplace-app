
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/products/ProductGrid";
import { useUser } from "@/contexts/UserContext";
import { Heart } from "lucide-react";

export default function WishlistPage() {
  const { user, isAuthenticated } = useUser();
  const navigate = useNavigate();
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login?redirect=wishlist");
    }
  }, [isAuthenticated, navigate]);
  
  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <PageLayout>
      <div className="container py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
          <p className="text-muted-foreground">
            Items you've saved for later.
          </p>
        </div>
        
        {user?.wishlist && user.wishlist.length > 0 ? (
          <ProductGrid products={user.wishlist} />
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
