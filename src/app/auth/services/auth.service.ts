import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Register } from '../interfaces/register';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient)
  baseURL: string = 'http://localhost:1337/api/';
  loginRoad:string = 'auth/local';
  registerRoad:string = 'auth/local/register';



  register(data: Register){
    return firstValueFrom(
      this.http.post(this.baseURL+this.registerRoad, data)
    )
  }
  
  logIn(data: Login){
    return firstValueFrom(
      this.http.post(this.baseURL+this.loginRoad, data)
    )
  }
}
