import { Component, inject } from '@angular/core';
import { CartStoreService } from '../../services/cart-store.service';
import { IProductCart } from '../../interfaces/product';
import { AsyncPipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cartFill = false;
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
        }
      });
  }

  onClickDelete(id: number) {
    this._storeService.deleteOne(id);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
