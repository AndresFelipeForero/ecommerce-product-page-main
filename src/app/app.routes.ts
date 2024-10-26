import { Routes } from '@angular/router';
import { InicioPageComponent } from './components/inicio-page/inicio-page.component';
import { authGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'init', pathMatch:'full'},
  { path: 'init', component: InicioPageComponent },
  {
    path: 'main',
    loadComponent: () =>
      import('./components/main-page/main-page.component').then(
        (c) => c.MainPageComponent
      ),
  },
  {
    path: 'main/:productID',
    loadComponent: () =>
      import('./components/product-page/product-page.component').then(
        (c) => c.ProductPageComponent
      ),
  },
  {
    path: 'about-us',
    loadComponent: () =>
      import('./components/about-us-page/about-us-page.component').then(
        (c) => c.AboutUsPageComponent
      ),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./components/contact-page/contact-page.component').then(
        (c) => c.ContactPageComponent
      ),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(r => r.routes),
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/profile-page/profile-page.component').then(
        (c) => c.ProfilePageComponent,
      )
  },
  {
    path: 'terms',
    loadComponent: () =>
      import('./components/terms-page/terms-page.component').then(
        (c) => c.TermsPageComponent,
      )
  },
  {
    path: 'warranty',
    loadComponent: () =>
      import('./components/warranty-page/warranty-page.component'
      ).then(
        (c) => c.WarrantyPageComponent
      )
  },
  {
    path: 'refund',
    loadComponent: () =>
      import('./components/refund-page/refund-page.component'
      ).then(
        (c) => c.RefundPageComponent
      )
  },
  {
    path: 'check-out',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/check-out-page/check-out-page.component').then(
        (c) => c.CheckOutPageComponent,
      )
  },
  {
    path: '**',
    redirectTo: 'init'
  },
];

