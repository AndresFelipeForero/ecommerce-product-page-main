import { HttpInterceptorFn } from '@angular/common/http';
import { LoaderService } from '../services/loader.service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  let _loaderService = inject(LoaderService);
  _loaderService.show()
  
  return next(req).pipe(
    finalize(() => {
      setTimeout(()=>{
        _loaderService.hide()
      }, 300)
    })
  );
};
