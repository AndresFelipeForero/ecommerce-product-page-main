import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FilterDataService {

  private filteredData$ = new BehaviorSubject<any>({page: 1, pageSize: 5, minPrice: 1, maxPrice: 2000000, searchQuery: "", company: ""});

  private setProducts(filters: any) {
    this.filteredData$.next(filters);
  }

  addFilters(filters: any){
    let currProducts = this.filteredData$.getValue();
    let allFilters = {...currProducts, ...filters}
    this.setProducts(allFilters)
  }
  
  getFilters(){
    return this.filteredData$.asObservable()
  }

}
