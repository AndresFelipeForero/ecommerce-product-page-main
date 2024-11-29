import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ErrorService } from '../services/error.service';
import { catchError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  let _errorService = inject(ErrorService);
  let toastr = inject(ToastrService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const errorMessage = _errorService.getErrorMessage(error);
      toastr.warning(`${errorMessage}`, 'Error', {
        positionClass: 'toast-top-center',
        progressBar: true,
        timeOut: 2000,
        toastClass: 'ngx-toastr custom-toast',
      });
      throw error;
    })
  );
};
