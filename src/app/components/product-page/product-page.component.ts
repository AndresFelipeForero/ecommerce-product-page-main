import { Component, inject } from '@angular/core';
import { CarouselComponent } from '../../shared/carousel/carousel.component';
import { IProduct } from '../../interfaces/product';
import { Products } from '../../data/Product-data';
import { CartStoreService } from '../../services/cart-store.service';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CarouselComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent {

  _storeService = inject(CartStoreService)
  productById!: IProduct;
  productAmount = 0;

  ngOnInit(){
    this.productById = Products.find( ({id}) => id = 1)!
  }

  plus() {
    this.productAmount ++
  }

  minus() {
    if (this.productAmount > 0) {
      this.productAmount --
    }
  }
  
  addToCart(){
    if (this.productAmount>0) {
      this._storeService.addProduct({...this.productById, quantity: this.productAmount})
      console.log(this.productAmount)
    }
  }
}
