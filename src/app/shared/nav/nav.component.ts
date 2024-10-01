import { NgClass, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { IProductCart } from '../../interfaces/product';
import { CartStoreService } from '../../services/cart-store.service';
import { Subscription } from 'rxjs';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [NgClass, CartComponent, RouterLinkActive, RouterLink, NgIf],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  _auth = inject(AuthService)
  isNavActive: boolean = false;
  isCartActive = false;
  cartSpan = 0;
  _storeService = inject(CartStoreService);
  router = inject(Router)
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

  logout() {
    if (localStorage.getItem('token-auth')) {
      localStorage.removeItem('token-auth')
      this.router.navigate(['/init'])
      console.log('deslogueado', localStorage.getItem('auth-token'))
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    
  }
}
