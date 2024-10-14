import { Component, inject } from '@angular/core';
import { CartStoreService } from '../../services/cart-store.service';
import { IProductCart } from '../../interfaces/product';
import { DecimalPipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [DecimalPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cartFill = false;
  total = 0

  _storeService = inject(CartStoreService);
  products!: IProductCart[];
  private subscription!: Subscription;

  ngOnInit() {
    this.subscription = this._storeService
      .getProducts()
      .subscribe((products) => {
        if (!products.length) {
          this.cartFill = false;
          
          
        } else {
          this.cartFill = true;
          this.products = products;
          this.total = products.reduce((acc, curr) => 
            acc + curr.quantity * curr.finalPrice
          , 0)
        }
      });
  }

  onClickDelete(id: number) {
    this._storeService.deleteOne(id);
  }

  closeCart(){
    this._storeService.state = false
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
