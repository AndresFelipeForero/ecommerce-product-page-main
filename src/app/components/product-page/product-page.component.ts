import { Component } from '@angular/core';
import { CarouselComponent } from '../../shered/carousel/carousel.component';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CarouselComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent {
  images = [
    '../../../assets/images/image-product-1.jpg',
    '../../../assets/images/image-product-2.jpg',
    '../../../assets/images/image-product-3.jpg',
    '../../../assets/images/image-product-4.jpg',
  ];
}
