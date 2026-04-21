import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', redirectTo: 'landing', pathMatch: 'full'},
  {path: 'landing', loadComponent: () => import('./pages/landing/landing').then(m => m.Landing)},
  {path: 'login', loadComponent: () => import('./pages/login/login').then(m => m.Login)},
  {path:'register', loadComponent: () => import('./pages/register/register').then(m => m.Register)},
  {path:'home',loadComponent:()=>import('./pages/home/home').then(m=>m.Home)}
];
