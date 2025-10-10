// app.providers.ts
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app.routes';

export const appProviders = [
  importProvidersFrom(
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ),
];