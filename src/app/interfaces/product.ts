export interface IProduct {
  id: number;
  company: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  image: string[];
  thumbnail: string[];
  finalPrice: number
}

export interface IProductCart extends IProduct {
  quantity: number;
}