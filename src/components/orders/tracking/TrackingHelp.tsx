
import { Package, Clock, MessageCircle, CalendarClock, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface TrackingHelpProps {
  isQuickCommerce?: boolean;
}

export function TrackingHelp({ isQuickCommerce = false }: TrackingHelpProps) {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="space-y-4">
      <h3 className="font-semibold mb-3">Need Help?</h3>
      <div className="flex flex-col sm:flex-row gap-3">
        <Card className="flex-1 hover:bg-muted/50 transition-colors cursor-pointer hover:shadow-md">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">Track Package</h4>
              <p className="text-sm text-muted-foreground">Check latest status</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="flex-1 hover:bg-muted/50 transition-colors cursor-pointer hover:shadow-md">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium">Delivery Support</h4>
              <p className="text-sm text-muted-foreground">Get help with delivery</p>
            </div>
          </CardContent>
        </Card>
        
        {isQuickCommerce && (
          <Card className="flex-1 hover:bg-muted/50 transition-colors cursor-pointer hover:shadow-md">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">Contact Driver</h4>
                <p className="text-sm text-muted-foreground">Chat with delivery person</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* Expandable FAQ section */}
      <div className="mt-4">
        <Button 
          variant="ghost" 
          className="w-full justify-between"
          onClick={() => setExpanded(!expanded)}
        >
          <span>Frequently Asked Questions</span>
          <ArrowRight className={`h-4 w-4 transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`} />
        </Button>
        
        {expanded && (
          <div className="mt-4 space-y-4 animate-accordion-down">
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">What if I'm not home for delivery?</h4>
                <p className="text-sm text-muted-foreground">
                  For standard deliveries, the courier will leave a note and attempt delivery again the next day. 
                  For quick commerce orders, you can request to leave the package at your door.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">Can I change my delivery address?</h4>
                <p className="text-sm text-muted-foreground">
                  For orders that haven't been shipped yet, you can change the delivery address 
                  by contacting our customer support team.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium mb-2">What happens if my order is delayed?</h4>
                <p className="text-sm text-muted-foreground">
                  We'll notify you of any delays and provide a new estimated delivery time. 
                  For significant delays, you may be eligible for a discount on your next order.
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
