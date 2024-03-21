import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProductCart } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CartStoreService {

  private cart$ = new BehaviorSubject<IProductCart[]>([]);

  constructor() {
    let cartStorage = localStorage.getItem('cartStorePageMain')
    if (cartStorage) {
      this.cart$.next(JSON.parse(cartStorage))
    }
   }

  getProducts() {
    return this.cart$.asObservable();
  }
  
  private setProducts(products: IProductCart[]) {
    this.cart$.next([...products]);
    localStorage.setItem('cartStorePageMain', JSON.stringify(products))
  }

  addProduct(product: IProductCart) {
    let currProducts = this.cart$.getValue();
    let productFinded = currProducts.find(({ id }) => id === product.id);
    if (productFinded) {
      productFinded.quantity += product.quantity;
      this.setProducts(currProducts);
    } else {
      this.setProducts([...currProducts, product]);
    }
  }

  deleteOne(idSelected: number) {
    let currProducts = this.cart$.getValue();
    let filteredProducts = currProducts.filter(({id}) => id !== idSelected)
    this.setProducts(filteredProducts)
  }
}
