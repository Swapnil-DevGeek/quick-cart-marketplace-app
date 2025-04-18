
import { Package, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function TrackingHelp() {
  return (
    <div>
      <h3 className="font-semibold mb-3">Need Help?</h3>
      <div className="flex flex-col sm:flex-row gap-3">
        <Card className="flex-1 hover:bg-muted/50 transition-colors cursor-pointer">
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
        
        <Card className="flex-1 hover:bg-muted/50 transition-colors cursor-pointer">
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
      </div>
    </div>
  );
}
