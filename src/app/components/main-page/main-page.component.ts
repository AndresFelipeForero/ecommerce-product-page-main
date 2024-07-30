import { Subscription } from 'rxjs';
import { Component, inject } from '@angular/core';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { IProduct } from '../../interfaces/product';
import { IproductService } from '../../services/iproduct.service';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [ProductCardComponent, FormsModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  _iproductService = inject(IproductService);
  products?: IProduct[] = [];
  subscribe?: Subscription;
  inputSearch = "";
  showProducts?: IProduct[];

  ngOnInit() {
    this.subscribe = this._iproductService.getAll().subscribe((products) => {
      this.products = products.data.map(({ id, attributes }: any) => {
        console.log(attributes.image.data[0].attributes.formats.medium.url);
        let mainImage = attributes.image.data[0].attributes.formats.medium.url;
        let hoverImage = attributes.image.data[1].attributes.formats.medium.url;
        attributes.image = [mainImage, hoverImage];
        return { id, ...attributes };
        });
      this.showProducts = this.products
    });

  }

  searchFilter(){
    this.showProducts = this.products?.filter(({name}) =>  name.toLowerCase().includes(this.inputSearch.toLowerCase().trim())
    )
  }

  ngOnDestroy() {
    this.subscribe?.unsubscribe()
  }
}
