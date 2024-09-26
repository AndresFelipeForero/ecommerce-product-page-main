import { IProduct } from '../../interfaces/product';
import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { CartStoreService } from '../../services/cart-store.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  _storeService = inject(CartStoreService);
  toastr = inject(ToastrService);

  @Input() product!: IProduct;
  imageSelected: number = 0;

  changeImage(number: number) {
    this.imageSelected = number;
  }

  addOneToCart(product: IProduct) {
    this._storeService.addProduct({ ...product, quantity: 1 });
    this.toastr.success(`${product.name}`, 'Añadido!', {
      positionClass: 'toast-top-center',
      progressBar: true,
      timeOut: 2000,
      toastClass: 'ngx-toastr custom-toast',
    });
  }
}
