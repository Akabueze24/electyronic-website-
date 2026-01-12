export interface Review {
  id?: string;
  productId: number;
  productName: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
  deleted?: boolean
}
