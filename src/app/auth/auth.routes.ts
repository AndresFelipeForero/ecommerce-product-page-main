import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',  loadComponent: () => import('./components/login/login.component').then(c => c.LoginComponent)
    },
    {
        path: 'register',  loadComponent: () => import('./components/register/register.component').then(c => c.RegisterComponent)
    },
    {
        path: 'forgot-password',  loadComponent: () => import('./components/forgot-password/forgot-password.component').then(c => c.ForgotPasswordComponent)
    }
]