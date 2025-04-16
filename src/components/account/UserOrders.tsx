
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/contexts/UserContext";
import { PackageOpen, ChevronDown, ChevronUp, MapPin, Clock, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { Order } from "@/types";

export function UserOrders() {
  const { user } = useUser();
  const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>({});
  
  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };
  
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-500 text-white';
      case 'processing':
        return 'bg-blue-500 text-white';
      case 'shipped':
        return 'bg-purple-500 text-white';
      case 'delivered':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
        <CardDescription>View and track your orders</CardDescription>
      </CardHeader>
      <CardContent>
        {user?.orders && user.orders.length > 0 ? (
          <div className="space-y-4">
            {user.orders.map((order) => (
              <div key={order.id} className="border rounded-lg overflow-hidden">
                <div 
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 cursor-pointer"
                  onClick={() => toggleOrderDetails(order.id)}
                >
                  <div className="flex items-center space-x-4">
                    <PackageOpen className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Order #{order.id.substring(0, 8)}</p>
                      <p className="text-sm text-muted-foreground">
                        Placed on {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-4 md:mt-0">
                    <Badge className={cn("mr-2", getStatusColor(order.status))}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                    <p className="font-medium text-right">
                      ${order.totalAmount.toFixed(2)}
                    </p>
                    {expandedOrders[order.id] ? 
                      <ChevronUp className="ml-2 h-5 w-5" /> : 
                      <ChevronDown className="ml-2 h-5 w-5" />
                    }
                  </div>
                </div>
                
                {expandedOrders[order.id] && (
                  <div className="p-4 border-t bg-muted/30">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Shipping Address</p>
                          <p className="text-sm">{order.address.name}</p>
                          <p className="text-sm">{order.address.line1}</p>
                          <p className="text-sm">
                            {order.address.city}, {order.address.state} {order.address.postalCode}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Estimated Delivery</p>
                          <p className="text-sm">{order.estimatedDelivery}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Payment Method</p>
                          <p className="text-sm">{order.paymentMethod}</p>
                        </div>
                      </div>
                    </div>
                    
                    <h4 className="font-medium mb-2">Order Items</h4>
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div 
                          key={item.product.id} 
                          className="flex items-center justify-between border-b pb-2"
                        >
                          <div className="flex items-center space-x-2">
                            <img 
                              src={item.product.image} 
                              alt={item.product.name} 
                              className="w-10 h-10 object-cover rounded"
                            />
                            <div>
                              <p className="font-medium">{item.product.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Qty: {item.quantity} × ${item.product.price.toFixed(2)}
                              </p>
                            </div>
                          </div>
                          <p className="font-medium">
                            ${(item.quantity * item.product.price).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-between mt-4 pt-2 border-t">
                      <p className="font-bold">Total</p>
                      <p className="font-bold">${order.totalAmount.toFixed(2)}</p>
                    </div>
                    
                    <div className="mt-4">
                      <Button variant="outline">
                        Track Order
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <PackageOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">You haven't placed any orders yet</p>
            <Button onClick={() => window.location.href = "/"}>
              Start Shopping
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
