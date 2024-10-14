import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FilterDataService {
  private router = inject(Router);

  private filteredData$ = new BehaviorSubject<any>({
    page: 1,
    pageSize: 3,
    minPrice: 1,
    maxPrice: 2000000,
    searchQuery: '',
    company: [],
  });

  private setProducts(filters: any) {
    this.filteredData$.next(filters);
  }

  addFilters(filters: any) {
    let currProducts = this.filteredData$.getValue();
    let allFilters = { ...currProducts, ...filters };
    this.setProducts(allFilters);
    this.chargeParams(allFilters);
  }

  getFilters() {
    return this.filteredData$.asObservable();
  }

  chargeParams(params: any) {
    if (params) {
      this.router.navigate([], {
        queryParams: params,
        queryParamsHandling: 'merge', // Esto conserva los otros query params si los hay
      });
    }
  }
}
