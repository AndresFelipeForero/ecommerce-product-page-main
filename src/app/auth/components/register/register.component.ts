import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { fadeInOut } from '../../../animations/fadeInOut';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  animations: [fadeInOut]
})
export class RegisterComponent {

  form: FormGroup;

  _authServices = inject(AuthService)
  toastr = inject(ToastrService)

  isPaswordMatching = true
  isButtonEnable = false
  isEmailValid = true
  isButtonActive = true
  

  constructor(private fb: FormBuilder){
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required,  Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      password: ['', [Validators.required]],
      passwordConfirm: ['', [Validators.required]]
    })
  }

  
  async onSubmit(){
    const {passwordConfirm, ...userData} = this.form.value

    if (userData.password !== passwordConfirm) {
      this.isPaswordMatching = false
      return
    }

    try {
      const userRegistred = await this._authServices.register(userData)
      this.toastr.success(`El usuario ${userData.username} ha sido registrado`, '¡REGISTRO EXITOSO!');
      this.isPaswordMatching = true;
    } catch (error) {
      let {message} = (error as any).error.error
      console.log({message})
      this.toastr.warning(message, '¡AVISO!')
    }
  }
}