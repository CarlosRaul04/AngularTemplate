import { Routes } from '@angular/router';
import { authGuard } from '@core/auth/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'welcome' },
  {
    path: 'login',
    loadComponent: () =>
      import('../app/presentation/features/auth/login/login.component').then(
        (m) => m.LoginComponent,
      ),
  },
  {
    path: 'welcome',
    canActivate: [authGuard],
    loadComponent: () =>
      import('../app/presentation/features/welcome/welcome.component').then(
        (m) => m.WelcomeComponent,
      ),
  },
  { path: '**', redirectTo: 'welcome' },
];
