import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { fadeInOut } from '../../../animations/fadeInOut';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  form: FormGroup;
  _authService = inject(AuthService)
  router = inject(Router)
  toastr = inject(ToastrService)

  constructor(private fb: FormBuilder){
    this.form = this.fb.group({
      identifier: ['', [Validators.required, Validators.minLength(3)]],
    })
  }


  async onSubmit(){
    try {
      const response = await this._authService.logIn(this.form.value)
      let {jwt, user} = response as any
      localStorage.setItem('token-auth', jwt)
      this.router.navigate(['/init'])
      this.toastr.success( 'Logueado con exito!', `${user.username}`, {
        positionClass: 'toast-top-center',
        progressBar: true,
        timeOut: 2000,
        toastClass: 'ngx-toastr custom-toast'
      })
    } catch (error) {
      let {message} = (error as any).error.error
      this.toastr.warning(`${message}`, 'Error', {
        positionClass: 'toast-top-center',
        progressBar: true,
        timeOut: 2000,
        toastClass: 'ngx-toastr custom-toast'
      })
    }
  }
}
