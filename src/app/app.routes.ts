import { Routes } from '@angular/router';
import { authGuard } from '@core/auth/auth.guard';
import { DialogDemo } from './features/dialog-demo/dialog-demo';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'welcome' },
  {
    path: 'login',
    loadComponent: () =>
      import('../app/features/auth/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'welcome',
    canActivate: [authGuard],
    loadComponent: () =>
      import('../app/features/welcome/welcome.component').then(m => m.WelcomeComponent),
  },
  { path: 'dialog-demo', component: DialogDemo },
  { path: '**', redirectTo: 'welcome' },
];
