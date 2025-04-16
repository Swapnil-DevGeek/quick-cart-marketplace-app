
import { Product, Category } from "@/types";

export const categories: Category[] = [
  {
    id: "fruits",
    name: "Fruits & Vegetables",
    description: "Fresh fruits and vegetables delivered to your doorstep",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: "dairy",
    name: "Dairy & Breakfast",
    description: "Milk, cheese, butter, and breakfast essentials",
    image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: "bakery",
    name: "Bakery & Snacks",
    description: "Freshly baked goods and delicious snacks",
    image: "https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?q=80&w=1580&auto=format&fit=crop"
  },
  {
    id: "beverages",
    name: "Beverages",
    description: "Refreshing drinks and beverages",
    image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: "meats",
    name: "Meat & Seafood",
    description: "Fresh meat and seafood",
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=1470&auto=format&fit=crop"
  },
  {
    id: "household",
    name: "Household",
    description: "Everyday household essentials",
    image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?q=80&w=1470&auto=format&fit=crop"
  }
];

export const products: Product[] = [
  // Fruits & Vegetables
  {
    id: "p1",
    name: "Organic Bananas",
    description: "Sweet and nutritious organic bananas. Perfect for smoothies or a quick healthy snack. Sourced from eco-friendly farms.",
    price: 2.99,
    discountPrice: 1.99,
    category: "fruits",
    image: "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?q=80&w=1480&auto=format&fit=crop",
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    estimatedDelivery: "Today",
    featured: true,
    tags: ["organic", "fruit", "fresh"],
    gallery: [
      "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?q=80&w=1480&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603833665858-e61d17a86224?q=80&w=1374&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=1480&auto=format&fit=crop"
    ],
    specifications: [
      { name: "Origin", value: "Ecuador" },
      { name: "Type", value: "Cavendish" },
      { name: "Packaging", value: "Bunch of 5-7" },
      { name: "Weight", value: "~1kg" },
      { name: "Certification", value: "Organic" }
    ],
    relatedProducts: ["p2", "p3", "p4"]
  },
  {
    id: "p2",
    name: "Red Apples",
    description: "Crisp and juicy red apples. High in fiber and vitamin C. Perfect for snacking, baking, or adding to salads.",
    price: 3.49,
    category: "fruits",
    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=1470&auto=format&fit=crop",
    rating: 4.3,
    reviewCount: 92,
    inStock: true,
    estimatedDelivery: "Today",
    tags: ["fruit", "fresh"],
    gallery: [
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=1470&auto=format&fit=crop"
    ],
    relatedProducts: ["p1", "p3", "p5"]
  },
  {
    id: "p3",
    name: "Avocado",
    description: "Creamy and nutritious avocados. Rich in healthy fats and perfect for guacamole, toast, or salads.",
    price: 2.99,
    discountPrice: 1.99,
    category: "fruits",
    image: "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?q=80&w=1475&auto=format&fit=crop",
    rating: 4.7,
    reviewCount: 156,
    inStock: true,
    estimatedDelivery: "Today",
    tags: ["fruit", "fresh"],
    relatedProducts: ["p1", "p2", "p4"]
  },
  {
    id: "p4",
    name: "Fresh Spinach",
    description: "Nutrient-packed fresh spinach. Great for salads, smoothies, and cooking. High in iron and vitamins.",
    price: 1.99,
    category: "fruits",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=1480&auto=format&fit=crop",
    rating: 4.2,
    reviewCount: 78,
    inStock: true,
    estimatedDelivery: "Today",
    tags: ["vegetable", "fresh", "leafy greens"],
    relatedProducts: ["p5", "p6", "p1"]
  },
  {
    id: "p5",
    name: "Cherry Tomatoes",
    description: "Sweet and tangy cherry tomatoes. Perfect for salads, cooking, or snacking. Bursting with flavor.",
    price: 3.99,
    category: "fruits",
    image: "https://images.unsplash.com/photo-1592924357228-91a29e846b60?q=80&w=1470&auto=format&fit=crop",
    rating: 4.6,
    reviewCount: 112,
    inStock: true,
    estimatedDelivery: "Today",
    tags: ["vegetable", "fresh"],
    relatedProducts: ["p4", "p6", "p2"]
  },
  // Dairy & Breakfast
  {
    id: "p6",
    name: "Whole Milk",
    description: "Fresh whole milk from grass-fed cows. Rich and creamy with essential nutrients. Perfect for drinking, cooking, or adding to coffee.",
    price: 3.29,
    category: "dairy",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=1374&auto=format&fit=crop",
    rating: 4.4,
    reviewCount: 143,
    inStock: true,
    estimatedDelivery: "Today",
    featured: true,
    tags: ["dairy", "breakfast"],
    gallery: [
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=1374&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=1470&auto=format&fit=crop"
    ],
    specifications: [
      { name: "Volume", value: "1 gallon" },
      { name: "Fat Content", value: "3.25%" },
      { name: "Source", value: "Grass-fed cows" },
      { name: "Pasteurization", value: "Pasteurized" },
      { name: "Shelf Life", value: "7-10 days" }
    ],
    relatedProducts: ["p7", "p8", "p9"]
  },
  {
    id: "p7",
    name: "Greek Yogurt",
    description: "Creamy and protein-rich Greek yogurt. A versatile dairy product perfect for breakfast, snacks, or cooking.",
    price: 4.99,
    discountPrice: 3.99,
    category: "dairy",
    image: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?q=80&w=1374&auto=format&fit=crop",
    rating: 4.8,
    reviewCount: 187,
    inStock: true,
    estimatedDelivery: "Today",
    tags: ["dairy", "breakfast", "protein"],
    relatedProducts: ["p6", "p8", "p10"]
  },
  {
    id: "p8",
    name: "Artisan Cheddar Cheese",
    description: "Aged artisan cheddar cheese with a rich, sharp flavor. Perfect for sandwiches, cheese boards, or cooking.",
    price: 6.99,
    category: "dairy",
    image: "https://images.unsplash.com/photo-1552767059-ce182ead6c1b?q=80&w=1470&auto=format&fit=crop",
    rating: 4.7,
    reviewCount: 136,
    inStock: true,
    estimatedDelivery: "Today",
    tags: ["dairy", "cheese"],
    relatedProducts: ["p6", "p7", "p9"]
  },
  {
    id: "p9",
    name: "Free-Range Eggs",
    description: "Farm-fresh free-range eggs from humanely raised chickens. Rich in protein and essential nutrients.",
    price: 4.49,
    category: "dairy",
    image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?q=80&w=1470&auto=format&fit=crop",
    rating: 4.5,
    reviewCount: 124,
    inStock: true,
    estimatedDelivery: "Today",
    tags: ["breakfast", "protein"],
    relatedProducts: ["p6", "p7", "p10"]
  },
  {
    id: "p10",
    name: "Granola Cereal",
    description: "Crunchy granola cereal with nuts, seeds, and dried fruits. A nutritious and delicious breakfast option.",
    price: 5.49,
    category: "dairy",
    image: "https://images.unsplash.com/photo-1517093157656-b9eccef91cb1?q=80&w=1374&auto=format&fit=crop",
    rating: 4.3,
    reviewCount: 108,
    inStock: true,
    estimatedDelivery: "Today",
    tags: ["breakfast", "cereal"],
    relatedProducts: ["p7", "p9", "p11"]
  },
  // Bakery & Snacks
  {
    id: "p11",
    name: "Freshly Baked Bread",
    description: "Artisanal freshly baked bread with a crispy crust and soft interior. Made daily with premium ingredients.",
    price: 4.99,
    category: "bakery",
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc7c?q=80&w=1470&auto=format&fit=crop",
    rating: 4.9,
    reviewCount: 214,
    inStock: true,
    estimatedDelivery: "Today",
    featured: true,
    tags: ["bakery", "bread", "fresh"],
    gallery: [
      "https://images.unsplash.com/photo-1549931319-a545dcf3bc7c?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1568471173242-461f0a730452?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1472&auto=format&fit=crop"
    ],
    specifications: [
      { name: "Type", value: "Sourdough" },
      { name: "Weight", value: "500g" },
      { name: "Ingredients", value: "Flour, water, salt, yeast" },
      { name: "Baked", value: "Daily" },
      { name: "Shelf Life", value: "2-3 days" }
    ],
    relatedProducts: ["p12", "p13", "p14"]
  },
  {
    id: "p12",
    name: "Chocolate Chip Cookies",
    description: "Soft and chewy chocolate chip cookies. Made with real butter and premium chocolate chips.",
    price: 5.99,
    category: "bakery",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=1470&auto=format&fit=crop",
    rating: 4.6,
    reviewCount: 167,
    inStock: true,
    estimatedDelivery: "Today",
    tags: ["bakery", "cookies", "dessert"],
    relatedProducts: ["p11", "p13", "p15"]
  },
  {
    id: "p13",
    name: "Croissants",
    description: "Buttery and flaky French croissants. Perfect for breakfast or as a snack with coffee.",
    price: 6.99,
    discountPrice: 5.49,
    category: "bakery",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1526&auto=format&fit=crop",
    rating: 4.8,
    reviewCount: 198,
    inStock: true,
    estimatedDelivery: "Today",
    tags: ["bakery", "breakfast", "french"],
    relatedProducts: ["p11", "p12", "p14"]
  },
  {
    id: "p14",
    name: "Mixed Nuts",
    description: "Premium mixed nuts including almonds, cashews, walnuts, and pecans. A nutritious and satisfying snack.",
    price: 8.99,
    category: "bakery",
    image: "https://images.unsplash.com/photo-1525053970296-e7d1f4d5d227?q=80&w=1526&auto=format&fit=crop",
    rating: 4.5,
    reviewCount: 132,
    inStock: true,
    estimatedDelivery: "Today",
    tags: ["snacks", "nuts", "protein"],
    relatedProducts: ["p15", "p16", "p10"]
  },
  // Beverages
  {
    id: "p15",
    name: "Orange Juice",
    description: "Freshly squeezed orange juice. Rich in vitamin C and perfect for breakfast or any time of day.",
    price: 3.99,
    category: "beverages",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?q=80&w=1374&auto=format&fit=crop",
    rating: 4.4,
    reviewCount: 118,
    inStock: true,
    estimatedDelivery: "Today",
    tags: ["beverage", "juice", "breakfast"],
    relatedProducts: ["p16", "p17", "p10"]
  },
  {
    id: "p16",
    name: "Sparkling Water",
    description: "Refreshing sparkling water with a hint of lime. Zero calories and no artificial sweeteners.",
    price: 1.99,
    discountPrice: 1.49,
    category: "beverages",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=1470&auto=format&fit=crop",
    rating: 4.2,
    reviewCount: 95,
    inStock: true,
    estimatedDelivery: "Today",
    featured: true,
    tags: ["beverage", "water", "refreshing"],
    relatedProducts: ["p15", "p17", "p18"]
  },
  {
    id: "p17",
    name: "Green Tea",
    description: "Premium organic green tea leaves. Rich in antioxidants and known for its health benefits.",
    price: 6.49,
    category: "beverages",
    image: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?q=80&w=1470&auto=format&fit=crop",
    rating: 4.7,
    reviewCount: 152,
    inStock: true,
    estimatedDelivery: "Today",
    tags: ["beverage", "tea", "organic"],
    relatedProducts: ["p15", "p16", "p18"]
  },
  // Meat & Seafood
  {
    id: "p18",
    name: "Grass-Fed Ground Beef",
    description: "Premium grass-fed ground beef. Leaner and more nutritious than conventional beef. Perfect for burgers, meatballs, or any recipe.",
    price: 9.99,
    category: "meats",
    image: "https://images.unsplash.com/photo-1551135049-8a33b5883817?q=80&w=1470&auto=format&fit=crop",
    rating: 4.6,
    reviewCount: 142,
    inStock: true,
    estimatedDelivery: "Today",
    tags: ["meat", "beef", "protein"],
    gallery: [
      "https://images.unsplash.com/photo-1551135049-8a33b5883817?q=80&w=1470&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603048297172-c83cfd636f75?q=80&w=1470&auto=format&fit=crop"
    ],
    specifications: [
      { name: "Weight", value: "1 lb (454g)" },
      { name: "Source", value: "Grass-fed cattle" },
      { name: "Lean-to-Fat Ratio", value: "85/15" },
      { name: "Packaging", value: "Vacuum sealed" }
    ],
    relatedProducts: ["p19", "p20", "p21"]
  },
  {
    id: "p19",
    name: "Chicken Breast",
    description: "Boneless, skinless chicken breast from free-range chickens. Versatile, lean protein for countless recipes.",
    price: 7.99,
    discountPrice: 6.99,
    category: "meats",
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?q=80&w=1374&auto=format&fit=crop",
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    estimatedDelivery: "Today",
    tags: ["meat", "chicken", "protein"],
    relatedProducts: ["p18", "p20", "p21"]
  },
  {
    id: "p20",
    name: "Salmon Fillet",
    description: "Fresh Atlantic salmon fillet. Rich in omega-3 fatty acids and protein. Perfect for grilling, baking, or pan-searing.",
    price: 12.99,
    category: "meats",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1470&auto=format&fit=crop",
    rating: 4.8,
    reviewCount: 176,
    inStock: true,
    estimatedDelivery: "Today",
    featured: true,
    tags: ["seafood", "fish", "protein"],
    relatedProducts: ["p18", "p19", "p21"]
  },
  // Household
  {
    id: "p21",
    name: "Dish Soap",
    description: "Effective and eco-friendly dish soap. Cuts through grease while being gentle on your hands and the environment.",
    price: 3.49,
    category: "household",
    image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?q=80&w=1374&auto=format&fit=crop",
    rating: 4.3,
    reviewCount: 98,
    inStock: true,
    estimatedDelivery: "Today",
    tags: ["household", "cleaning"],
    relatedProducts: ["p22", "p23", "p24"]
  },
  {
    id: "p22",
    name: "Paper Towels",
    description: "Absorbent and durable paper towels. Perfect for cleaning spills and everyday messes.",
    price: 5.99,
    discountPrice: 4.99,
    category: "household",
    image: "https://images.unsplash.com/photo-1583251633146-d0c6c036187d?q=80&w=1470&auto=format&fit=crop",
    rating: 4.2,
    reviewCount: 87,
    inStock: true,
    estimatedDelivery: "Today",
    tags: ["household", "paper products"],
    relatedProducts: ["p21", "p23", "p24"]
  },
  {
    id: "p23",
    name: "Laundry Detergent",
    description: "Powerful and gentle laundry detergent. Removes tough stains while protecting fabrics and colors.",
    price: 11.99,
    category: "household",
    image: "https://images.unsplash.com/photo-1626806871123-b5848506596d?q=80&w=1527&auto=format&fit=crop",
    rating: 4.5,
    reviewCount: 124,
    inStock: true,
    estimatedDelivery: "Today",
    tags: ["household", "cleaning", "laundry"],
    relatedProducts: ["p21", "p22", "p24"]
  },
  {
    id: "p24",
    name: "Bathroom Cleaner",
    description: "Effective bathroom cleaner that removes soap scum, hard water stains, and mildew. Leaves surfaces sparkling clean.",
    price: 4.99,
    category: "household",
    image: "https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=1470&auto=format&fit=crop",
    rating: 4.4,
    reviewCount: 106,
    inStock: true,
    estimatedDelivery: "Today",
    tags: ["household", "cleaning", "bathroom"],
    relatedProducts: ["p21", "p22", "p23"]
  }
];

// Helper functions to get products by category, featured, etc.
export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.category === categoryId);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getRelatedProducts = (productId: string): Product[] => {
  const product = getProductById(productId);
  if (!product || !product.relatedProducts) return [];
  
  return product.relatedProducts
    .map(id => getProductById(id))
    .filter((p): p is Product => p !== undefined);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) || 
    product.description.toLowerCase().includes(lowercaseQuery) ||
    (product.tags && product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)))
  );
};
