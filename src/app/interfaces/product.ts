export interface IProduct {
  id: number;
  company: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  image: string[];
  thumbnail: string[];
}

export interface IProductCart extends IProduct {
  quantity: number;
}