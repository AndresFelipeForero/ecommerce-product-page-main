import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { IProductCart } from '../../interfaces/product';
import { CartStoreService } from '../../services/cart-store.service';
import { Subscription } from 'rxjs';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [NgClass, CartComponent, RouterLinkActive, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  isNavActive: boolean = false;
  isCartActive = false;
  cartSpan = 0;
  _storeService = inject(CartStoreService);
  private subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this._storeService
      .getProducts()
      .subscribe((products) => {
        this.cartSpanCalc(products);
      });
  }

  toggleNav(): void {
    this.isNavActive = !this.isNavActive;
  }

  closeNav(): void {
    this.isNavActive = false;
  }

  cartToggle() {
    this.isCartActive = !this.isCartActive;
  }

  cartSpanCalc(products: IProductCart[]) {
    this.cartSpan = products.reduce((acum, { quantity }) => acum + quantity, 0);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
