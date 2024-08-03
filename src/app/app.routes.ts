import { Routes } from '@angular/router';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
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
