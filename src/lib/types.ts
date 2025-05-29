export type ProductCategory = "skincare" | "food";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: number;
  image: string;
  rating?: number;
  featured?: boolean;
  tags?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  image: string;
  text: string;
  rating: number;
  location: string;
}
