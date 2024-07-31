import { IProduct } from '../../interfaces/product';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';



@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

  @Input() product!: IProduct;
  imageSelected:number = 0 

  changeImage(number: number){
    this.imageSelected = number
  }

}
