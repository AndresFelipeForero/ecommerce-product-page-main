import { Routes } from '@angular/router';
import { InicioPageComponent } from './components/inicio-page/inicio-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch:'full'},
  { path: 'inicio', component: InicioPageComponent },
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
];
