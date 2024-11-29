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
  styleUrl: './forgot-password.component.scss',
  animations: [fadeInOut]
})
export class ForgotPasswordComponent {

  form: FormGroup;
  _authService = inject(AuthService)
  router = inject(Router)
  toastr = inject(ToastrService)

  constructor(private fb: FormBuilder){
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
    })
  }


  async onSubmit(){
    try {
      const response = await this._authService.forgotPassword(this.form.value)
      this.toastr.success( `Hemos enviado un correo a ${this.form.value.email}!`, `¡Enviado!`, {
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
