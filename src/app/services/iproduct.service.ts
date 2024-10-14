import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FilterDataService } from './filter-data.service';
import { Observable, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IproductService {
  httpClient = inject(HttpClient);
  // baseURL: string = 'https://generous-vibrancy-production.up.railway.app/api/i-products';
  _filterStore = inject(FilterDataService);
  baseURL: string = environment.baseUrl;
  table: string = 'i-products'

  populate: string = '?populate=*';

  getAll() {
    return this.httpClient.get<any>(`${this.baseURL}/${this.table}`);
  }

  getById(productId: number) {
    return this.httpClient.get<any>(
      `${this.baseURL}/${this.table}/${productId}${this.populate}`
    );
  }

  getFilters(): Observable<any> {
    return this._filterStore.getFilters().pipe(
      switchMap((filter) => {
        let { minPrice, maxPrice, page, pageSize, searchQuery, company } =
          filter;

        let params = new HttpParams()
          .set('filters[finalPrice][$gte]', minPrice.toString())
          .set('filters[finalPrice][$lte]', maxPrice.toString())
          .set('pagination[page]', page.toString())
          .set('pagination[pageSize]', pageSize.toString())
          .set('populate', 'image');

        if (company) {
          if (Array.isArray(company)) {
            company.forEach(
              (company: string) =>
                (params = params.append('filters[company][$eq]', company))
            );
          } else {
            params = params.set('filters[company][$eq]', company);
          }
        }

        if (searchQuery) {
          params = params.set('filters[name][$containsi]', searchQuery);
        }

        return this.httpClient.get<any>(`${this.baseURL}/${this.table}`, { params });
      })
    );
  }
}
