import { ProductFilterFormComponent } from './../../shared/product-filter-form/product-filter-form.component';
import { Observable, Subscription, debounceTime, map } from 'rxjs';
import { Component, inject } from '@angular/core';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { IProduct } from '../../interfaces/product';
import { IproductService } from '../../services/iproduct.service';

import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgClass, TitleCasePipe } from '@angular/common';
import { FilterDataService } from '../../services/filter-data.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [ProductCardComponent, FormsModule, TitleCasePipe, ProductFilterFormComponent, NgClass, ReactiveFormsModule, AsyncPipe],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {
  _iproductService = inject(IproductService);
  _filterStore = inject(FilterDataService)
  router = inject(Router)
  activateRoute = inject(ActivatedRoute);
  subscribe?: Subscription;
  subscribePagination?: Subscription;
  searchControl = new FormControl('');
  showProducts: IProduct[] = [];
  brandSelected: string = '';
  filterActive: boolean = false;
  pageCount: number = 1;
  currentPage!: number;

  ngOnInit() {
    this.subscribe = this._iproductService.getFilters().subscribe((products) => {

      this.pageCount = products.meta.pagination.pageCount
      if (this.pageCount < this.currentPage) {
        this._filterStore.addFilters({page: 1})
      }

      this.showProducts = products.data.map(({ id, attributes }: any) => {

        let mainImage: string = attributes.image.data[0].attributes.formats.medium.url;
        let hoverImage: string = attributes.image.data[1].attributes.formats.medium.url;
        let thumbnail: string = attributes.image.data[0].attributes.formats.thumbnail.url
        attributes.image = [mainImage, hoverImage];
        attributes.thumbnail = [thumbnail]
        
        return { id, ...attributes };
      });
    }
  );

    this.chargePaginationState()
    this.searchFilter()
  }

  searchFilter() {
    this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value) => {
        this._filterStore.addFilters({searchQuery: value});
      });
  }

  brandSelect(brand: string) {
    this.brandSelected === brand
      ? (this.brandSelected = '')
      : (this.brandSelected = brand);
      this.chargeBrandStore()
  }

  chargeBrandStore(){
    let brandToSend: string[] = [];
    if (this.brandSelected !== "") {
      brandToSend = [this.brandSelected]
    }
    this.clearQueryParams()
    this._filterStore.addFilters({company: brandToSend})
  }

  filterActiver(){
    this.filterActive = !this.filterActive
  }

  clearQueryParams() {
    this.router.navigate([], {
      queryParams: {}
    });
  }

  goToPage(page: number) {
    this.currentPage = page
    this._filterStore.addFilters({page})
  }

  chargePaginationState() {
    this.subscribePagination = this.activateRoute.queryParams.subscribe(params => {
      if (params['page']) {
       this.currentPage = Number(params['page'])
      }
    })
  }

  ngOnDestroy() {
    this.subscribe?.unsubscribe();
    this.subscribePagination?.unsubscribe();
  }
}
