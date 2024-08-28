import { Routes } from '@angular/router';
import { InicioPageComponent } from './components/inicio-page/inicio-page.component';

export const routes: Routes = [
  { path: '', component: InicioPageComponent },
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
];
