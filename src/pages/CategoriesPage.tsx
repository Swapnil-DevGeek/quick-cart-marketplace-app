
import { PageLayout } from "@/components/layout/PageLayout";
import { CategoryCard } from "@/components/home/CategoryCard";
import { categories } from "@/data/products";

export default function CategoriesPage() {
  return (
    <PageLayout>
      <div className="container py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">All Categories</h1>
          <p className="text-muted-foreground">
            Browse our product categories to find what you're looking for
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} className="h-full" />
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
