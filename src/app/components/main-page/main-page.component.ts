import { ProductFilterFormComponent } from './../../shared/product-filter-form/product-filter-form.component';
import { Subscription } from 'rxjs';
import { Component, inject } from '@angular/core';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { IProduct } from '../../interfaces/product';
import { IproductService } from '../../services/iproduct.service';

import { FormsModule } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { FilterDataService } from '../../services/filter-data.service';


@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [ProductCardComponent, FormsModule, TitleCasePipe, ProductFilterFormComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  _iproductService = inject(IproductService);
  _filterStore = inject(FilterDataService)
  products?: IProduct[] = [];
  subscribe?: Subscription;
  inputSearch = '';
  showProducts?: IProduct[];
  brandSelected: string = '';

  ngOnInit() {
    this.subscribe = this._iproductService.getFilters().subscribe((products) => {
      this.products = products.data.map(({ id, attributes }: any) => {

        let mainImage: string = attributes.image.data[0].attributes.formats.medium.url;
        let hoverImage: string = attributes.image.data[1].attributes.formats.medium.url;
        let thumbnail: string = attributes.image.data[0].attributes.formats.thumbnail.url
        attributes.image = [mainImage, hoverImage];
        attributes.thumbnail = [thumbnail]
        
        return { id, ...attributes };
      });

      this.showProducts = this.products;
    }
  );
  }

  searchFilter() {
    this.showProducts = this.products?.filter(({ name }) =>
      name.toLowerCase().includes(this.inputSearch.toLowerCase().trim())
    );
  }

  brandSelect(string: string) {
    this.brandSelected === string
      ? (this.brandSelected = '')
      : (this.brandSelected = string);
  }

  ngOnDestroy() {
    this.subscribe?.unsubscribe();
  }
}
