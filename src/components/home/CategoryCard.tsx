
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Category } from "@/types";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  category: Category;
  className?: string;
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  return (
    <Link to={`/category/${category.id}`}>
      <Card className={cn("overflow-hidden transition-all duration-200 hover:shadow-md group h-full", className)}>
        <div className="relative pt-[60%]">
          <img
            src={category.image}
            alt={category.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end p-4">
            <div>
              <h3 className="font-semibold text-lg text-foreground mb-1">
                {category.name}
              </h3>
              {category.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {category.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
