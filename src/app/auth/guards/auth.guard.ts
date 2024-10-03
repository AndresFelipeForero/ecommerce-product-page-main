import { inject } from "@angular/core"
import { Router } from "@angular/router"
import { ToastrService } from "ngx-toastr";

export const authGuard = () => {
  let router = inject(Router)
  let toastr = inject(ToastrService)
  
  let allow = localStorage.getItem('token-auth')
  if (!allow) {
      toastr.warning('Debes estar logeado', 'Aviso!')
      router.navigate(['/auth/login'])
      return false
    } 
  return true;
};