
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/contexts/UserContext";
import { ProductGrid } from "@/components/products/ProductGrid";
import { UserAddresses } from "@/components/account/UserAddresses";
import { UserProfile } from "@/components/account/UserProfile";
import { UserOrders } from "@/components/account/UserOrders";

export default function AccountPage() {
  const { user, isAuthenticated, logout } = useUser();
  const navigate = useNavigate();
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }
  
  return (
    <PageLayout>
      <div className="container py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Account</h1>
          <p className="text-muted-foreground">
            Manage your profile, orders, addresses, and saved items.
          </p>
        </div>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <UserProfile />
          </TabsContent>
          
          <TabsContent value="orders">
            <UserOrders />
          </TabsContent>
          
          <TabsContent value="addresses">
            <UserAddresses />
          </TabsContent>
          
          <TabsContent value="wishlist">
            <Card>
              <CardHeader>
                <CardTitle>My Wishlist</CardTitle>
                <CardDescription>Items you've saved for later.</CardDescription>
              </CardHeader>
              <CardContent>
                {user?.wishlist && user.wishlist.length > 0 ? (
                  <ProductGrid products={user.wishlist} columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} />
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">Your wishlist is empty</p>
                    <Button onClick={() => navigate("/")}>Continue Shopping</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}
