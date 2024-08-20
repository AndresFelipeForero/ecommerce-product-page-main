import { IProduct } from '../../interfaces/product';
import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { CartStoreService } from '../../services/cart-store.service';



@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

  _storeService = inject(CartStoreService);

  @Input() product!: IProduct;
  imageSelected:number = 0 

  changeImage(number: number){
    this.imageSelected = number
  }

  addOneToCart(product: IProduct){
    this._storeService.addProduct({...product, quantity: 1})
  }
}
