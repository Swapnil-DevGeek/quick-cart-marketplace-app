
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
    <div className="space-y-4 px-2 sm:px-0">
      <h3 className="font-semibold mb-3 font-heading">Need Help?</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <Card className="flex-1 hover:bg-muted/50 transition-colors cursor-pointer hover:shadow-md">
          <CardContent className="p-3 sm:p-4 flex items-center gap-3">
            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Package className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-sm sm:text-base">Track Package</h4>
              <p className="text-xs sm:text-sm text-muted-foreground">Check latest status</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="flex-1 hover:bg-muted/50 transition-colors cursor-pointer hover:shadow-md">
          <CardContent className="p-3 sm:p-4 flex items-center gap-3">
            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-sm sm:text-base">Delivery Support</h4>
              <p className="text-xs sm:text-sm text-muted-foreground">Get help with delivery</p>
            </div>
          </CardContent>
        </Card>
        
        {isQuickCommerce && (
          <Card className="flex-1 hover:bg-muted/50 transition-colors cursor-pointer hover:shadow-md">
            <CardContent className="p-3 sm:p-4 flex items-center gap-3">
              <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-sm sm:text-base">Contact Driver</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">Chat with delivery person</p>
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
              <CardContent className="p-3 sm:p-4">
                <h4 className="font-medium mb-2 text-sm sm:text-base">What if I'm not home for delivery?</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  For standard deliveries, the courier will leave a note and attempt delivery again the next day. 
                  For quick commerce orders, you can request to leave the package at your door.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-3 sm:p-4">
                <h4 className="font-medium mb-2 text-sm sm:text-base">Can I change my delivery address?</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  For orders that haven't been shipped yet, you can change the delivery address 
                  by contacting our customer support team.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-3 sm:p-4">
                <h4 className="font-medium mb-2 text-sm sm:text-base">What happens if my order is delayed?</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">
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
