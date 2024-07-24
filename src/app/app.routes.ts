import { Routes } from '@angular/router';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { InicioPageComponent } from './components/inicio-page/inicio-page.component';

export const routes: Routes = [
    {path:'', component: InicioPageComponent},
    {path:'main', component: MainPageComponent},
    {path:'main/:productID', component: ProductPageComponent}
];
