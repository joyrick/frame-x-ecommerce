
export interface Review {
  id: string;
  author: string;
  rating: number; // 1 to 5
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  edition: string;
  price: number;
  imageUrl: string;
  description: string;
  reviews: Review[];
}

export interface CartItem extends Product {
  quantity: number;
}