import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { fadeInOut } from '../../../animations/fadeInOut';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [fadeInOut]
})
export class LoginComponent {

  form: FormGroup;
  _authService = inject(AuthService)
  router = inject(Router)

  constructor(private fb: FormBuilder){
    this.form = this.fb.group({
      identifier: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required]]
    })
  }


  async onSubmit(){
    try {
      const response = await this._authService.logIn(this.form.value)
      console.log(response)
      // localStorage.setItem('token-auth', response.data)
      // this.router.navigate(['/inicio'])
    } catch (error) {
      console.log(error)
    }
  }
}
