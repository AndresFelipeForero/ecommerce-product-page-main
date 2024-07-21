import { Routes } from '@angular/router';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';

export const routes: Routes = [
    {path:'', component: MainPageComponent},
    {path:':productID', component: ProductPageComponent}
];
