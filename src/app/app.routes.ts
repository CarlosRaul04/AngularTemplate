import { Routes } from '@angular/router';
import { authGuard } from '@app/core/guards/auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'welcome' },
  {
    path: 'login',
    loadComponent: () =>
      import('@presentation/features/auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('@presentation/features/layout/layout.component').then((m) => m.LayoutComponent),
    children: [
      {
        path: 'welcome',
        loadComponent: () =>
          import('@presentation/features/welcome/welcome.component').then(
            (m) => m.WelcomeComponent,
          ),
      },
      {
        path: 'components',
        loadComponent: () =>
          import('@presentation/features/components/components.component').then(
            (m) => m.ComponentsComponent,
          ),
      },
      {
        path: 'documentation',
        loadComponent: () =>
          import('@presentation/features/documentation/documentation.component').then(
            (m) => m.DocumentationComponent,
          ),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('@presentation/features/settings/settings.component').then(
            (m) => m.SettingsComponent,
          ),
      },
    ],
  },
  { path: '**', redirectTo: 'welcome' },
];
