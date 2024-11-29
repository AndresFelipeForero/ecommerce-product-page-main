import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Register } from '../interfaces/register';
import { Login } from '../interfaces/login';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient)
  baseURL: string = environment.baseUrl;
  loginRoad:string = 'auth/local';
  registerRoad:string = 'auth/local/register';
  forgotRoad: string = 'auth/forgot-password'

  register(data: Register){
    return firstValueFrom(
      this.http.post(`${this.baseURL}/${this.registerRoad}`, data)
    )
  }
  
  logIn(data: Login){
    return firstValueFrom(
      this.http.post(`${this.baseURL}/${this.loginRoad}`, data)
    )
  }

  isLogged() {
    return !!localStorage.getItem('token-auth')
  }

  forgotPassword(email: Login){
    return firstValueFrom(
      this.http.post(`${this.baseURL}/${this.forgotRoad}`, email)
    )
  }
}
