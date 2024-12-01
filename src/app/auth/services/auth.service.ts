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
  loginPath:string = 'auth/local';
  registerPath:string = 'auth/local/register';
  forgotPath: string = 'auth/forgot-password';
  resetPath: string = 'auth/reset-password';


  register(data: Register){
    return firstValueFrom(
      this.http.post(`${this.baseURL}/${this.registerPath}`, data)
    )
  }
  
  logIn(data: Login){
    return firstValueFrom(
      this.http.post(`${this.baseURL}/${this.loginPath}`, data)
    )
  }

  isLogged() {
    return !!localStorage.getItem('token-auth')
  }

  forgotPassword(email: Login){
    return firstValueFrom(
      this.http.post(`${this.baseURL}/${this.forgotPath}`, email)
    )
  }

  resetPassword(data: Login){
    return firstValueFrom(
      this.http.post(`${this.baseURL}/${this.resetPath}`, data)
    )
  }
}
