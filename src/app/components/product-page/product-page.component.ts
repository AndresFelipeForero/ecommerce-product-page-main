import { Subscription } from 'rxjs';
import { Component, inject } from '@angular/core';
import { CarouselComponent } from '../../shared/carousel/carousel.component';
import { IProduct } from '../../interfaces/product';
import { CartStoreService } from '../../services/cart-store.service';
import { NgClass } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IproductService } from '../../services/iproduct.service';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CarouselComponent, NgClass],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent {
  _iproductService = inject(IproductService);
  _storeService = inject(CartStoreService);
  activateRout = inject(ActivatedRoute);

  productById!: IProduct;
  productAmount = 0;
  currentImageIndex = 0;
  isModalActive = false;
  subscribe?:Subscription;
  
  ngOnInit() {
     this.activateRout.params.subscribe((params) => {
      let ID: number = params['productID'];
      this.subscribe = this._iproductService
        .getById(ID)
        .subscribe(({ data: { id, attributes } }) => {
          let mainImages = attributes.image.data.map((image: any):string => {
            return image.attributes.formats.medium.url;
          });
          let thumbnails = attributes.image.data.map((thumbnail: any):string => {
            return thumbnail.attributes.formats.thumbnail.url;
          });

         this.productById = {
            id,
            company: attributes.company,
            name: attributes.name,
            description: attributes.description,
            price: attributes.price,
            discount: attributes.discount,
            image: mainImages,
            thumbnail: thumbnails
          };
        });
    });
  }

  plus() {
    this.productAmount++;
  }

  minus() {
    if (this.productAmount > 0) {
      this.productAmount--;
    }
  }

  addToCart() {
    if (this.productAmount > 0) {
      this._storeService.addProduct({
        ...this.productById,
        quantity: this.productAmount,
      });
    }
  }

  imgSelected($index: number) {
    this.currentImageIndex = $index;
  }

  showNextImage() {
    this.currentImageIndex =
      (this.currentImageIndex + 1) % this.productById.image.length;
  }

  showPrevImage() {
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.productById.image.length) %
      this.productById.image.length;
  }

  modalActive() {
    this.isModalActive = !this.isModalActive;
  }

  ngOnDestroy() {
    this.subscribe?.unsubscribe()
  }
}
