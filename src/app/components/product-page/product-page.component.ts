import { Component } from '@angular/core';
import { CarouselComponent } from '../../shered/carousel/carousel.component';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CarouselComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent {

  images = []

}
