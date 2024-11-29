import { loaderInterceptor } from './interceptors/loader.interceptor';
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';



import { routes } from './app.routes';
import { authInterceptor } from './auth/interceptor/auth.interceptor';
import { errorInterceptor } from './interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(withInterceptors([authInterceptor, loaderInterceptor, errorInterceptor])),
    provideAnimations(),
    provideToastr()
  ]
};
