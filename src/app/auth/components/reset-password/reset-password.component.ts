import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeInOut } from '../../../animations/fadeInOut';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
  animations: [fadeInOut],
})
export class ResetPasswordComponent {
  form: FormGroup;

  _authServices = inject(AuthService);
  toastr = inject(ToastrService);
  activateRout = inject(ActivatedRoute);
  router = inject(Router);

  isPasswordMatching = true;
  isButtonEnable = false;
  isButtonActive = true;
  resetToken?: any;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      password: ['', [Validators.required]],
      passwordConfirmation: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.activateRout.queryParams.subscribe((params) => {
      if (params) {
        this.resetToken = params;
      }
    });
  }

  async onSubmit() {
    const data = { ...this.form.value, ...this.resetToken };

    if (data.password !== data.passwordConfirmation) {
      this.isPasswordMatching = false;
      return;
    }

    if (data.code) {
      try {
        const resetResponse = await this._authServices.resetPassword(data);
        this.toastr.success(
          `la contraseña ha sido actualizada con exito`,
          '¡CONTRASEÑA ACTUALIZADA!'
        );
        this.isPasswordMatching = true;
      } catch (error) {
        let { message } = (error as any).error.error;
        this.toastr.warning(message, '¡AVISO!');
      }
    } else {
      this.toastr.warning('Token invalido, intenta nuevamente', '¡AVISO!');
      this.router.navigate(['/auth/forgot-password']);
      return;
    }
  }
}
