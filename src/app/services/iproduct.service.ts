import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class IproductService {
  httpClient = inject(HttpClient);
  // baseURL: string = 'https://generous-vibrancy-production.up.railway.app/api/i-products';
  baseURL: string = 'http://localhost:1337/api/i-products';

  populate: string = '?populate=*';

  getAll() {
    return this.httpClient.get<any>(`${this.baseURL}${this.populate}`);
  }

  getById(productId: number) {
    return this.httpClient.get<any>(
      `${this.baseURL}/${productId}${this.populate}`
    );
  }

  getFilters(
    company: string,
    minPrice: number,
    maxPrice: number,
    searchQuery: string,
    page: number = 1,
    pageSize: number = 8
  ) {
    let params = new HttpParams()
      .set('filters[price][$gte]', minPrice.toString())
      .set('filters[price][$lte]', maxPrice.toString())
      .set('pagination[page]', page.toString())
      .set('pagination[pageSize]', pageSize.toString())
      .set('populate', '*');
    // console.log(company)
    if (company) {
      params = params.set('filters[company][$eq]', company);
      }
    if (searchQuery) {
      params = params.set('filters[name][$containsi]', searchQuery);
      }

      console.log(params)
      return this.httpClient.get<any>(`${this.baseURL}`, {params});
  }
}
