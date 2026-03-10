export interface Product {
  id: number;
  name_ar: string;
  name_fr: string;
  description_ar: string;
  description_fr: string;
  price: number;
  image_url: string;
  category_ar: string;
  category_fr: string;
  is_best_seller: number;
}

export interface Order {
  id: number;
  product_id: number;
  quantity: number;
  full_name: string;
  phone: string;
  address: string;
  status: string;
  created_at: string;
  name_ar?: string;
  name_fr?: string;
}

export interface Settings {
  currency_ar: string;
  currency_fr: string;
  primary_color: string;
  secondary_color: string;
}

export type Language = 'ar' | 'fr';
