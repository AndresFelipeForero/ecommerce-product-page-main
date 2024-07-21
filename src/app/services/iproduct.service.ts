import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class IproductService {

httpClient = inject(HttpClient);
baseURL: string = 'https://generous-vibrancy-production.up.railway.app/api/i-products';
populate: string = '?populate=*'

getAll() {
  return this.httpClient.get<any>(`${this.baseURL}${this.populate}`);
}

getById(productId: number) {
  return this.httpClient.get<any>(`${this.baseURL}/${productId}${this.populate}`);
}

}
