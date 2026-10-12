export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'apparel' | 'accessories' | 'living' | 'timepieces';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  description: string;
  details: string[];
  material: string;
  image: string;
  additionalImages?: string[];
  badge?: 'New Arrival' | 'Bestseller' | 'Limited Run' | 'Eco Craft';
  inStock: boolean;
  colors: { name: string; hex: string }[];
  sizes?: string[];
  featured?: boolean;
  origin?: string;
  batchNumber?: string;
  craftTime?: string;
  dimensions?: string;
}

export interface ArtisanMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  location: string;
  yearsOfExperience: number;
  avatar: string;
  bio: string;
  philosophy: string;
  masterpiece: string;
  badge: string;
}

export interface Category {
  id: string;
  slug: 'apparel' | 'accessories' | 'living' | 'timepieces';
  name: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface OrderDetails {
  orderId: string;
  date: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  shippingMethod: string;
  shippingCost: number;
  paymentMethod: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  estimatedDelivery: string;
}

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name-asc' | 'rating';
