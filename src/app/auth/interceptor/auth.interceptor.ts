import { HttpInterceptorFn } from '@angular/common/http';

let prueba:any;

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let clonedReq = req;

  if (localStorage.getItem('token-auth')) {
    clonedReq = req.clone({
      setHeaders: {
        Authorization: localStorage.getItem('token-auth')!
      }
    })
  }
  return next(clonedReq);
};
