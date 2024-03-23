import { Component, inject } from '@angular/core';
import { CarouselComponent } from '../../shared/carousel/carousel.component';
import { IProduct } from '../../interfaces/product';
import { Products } from '../../data/Product-data';
import { CartStoreService } from '../../services/cart-store.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CarouselComponent, NgClass],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent {

  _storeService = inject(CartStoreService)
  productById!: IProduct;
  productAmount = 0;
  currentImageIndex = 0;
  isModalActive = false

  ngOnInit(){
    this.productById = Products.find( ({id}) => id = 1)!
    console.log(this.productById.thumbnail[0])
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

  imgSelected($index: number){
    this.currentImageIndex = $index
  }

  showNextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.productById.image.length;
  }

  showPrevImage() {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.productById.image.length) % this.productById.image.length;
  }

  modalActive(){
    this.isModalActive = !this.isModalActive
  }
}
