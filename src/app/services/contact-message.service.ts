import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ContactForm } from '../interfaces/contact-form';


@Injectable({
  providedIn: 'root'
})
export class ContactMessageService {
  http = inject(HttpClient)
  baseURL: string = 'http://localhost:1337/api/';
  table: string = 'contact-messages'

  createContactMessage(message: ContactForm){
    return firstValueFrom(this.http.post(this.baseURL + this.table, {data: message}))
  }
}
