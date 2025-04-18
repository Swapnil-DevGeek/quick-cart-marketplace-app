export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  image: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  estimatedDelivery: string;
  featured?: boolean;
  tags?: string[];
  gallery?: string[];
  specifications?: Array<{
    name: string;
    value: string;
  }>;
  relatedProducts?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
}

export interface Address {
  id: string;
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export enum PaymentMethod {
  CREDIT_CARD = "Credit Card",
  UPI = "UPI",
  COD = "Cash on Delivery",
  WALLET = "Wallet"
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  address: Address;
  paymentMethod: PaymentMethod;
  status: "pending" | "processing" | "shipped" | "delivered";
  createdAt: string;
  estimatedDelivery: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  addresses: Address[];
  orders: Order[];
  wishlist: Product[];
}

export interface PromoCode {
  code: string;
  discountPercentage: number;
  expiryDate: string;
  minPurchase?: number;
  maxDiscount?: number;
}

export interface OrderStep {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: LucideIcon;
  status: "completed" | "in-progress" | "pending";
}
