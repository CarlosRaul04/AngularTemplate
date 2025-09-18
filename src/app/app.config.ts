import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AuthRepository } from './domain/repositories/auth.repository';
import { AuthRepositoryImpl } from './infrastructure/auth/auth.repository.impl';
import { LoginUseCase } from './domain/usecases/login.usecase';
import { LoginUseCaseImpl } from './application/auth/login.usecase.impl';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withFetch()),
    { provide: AuthRepository, useClass: AuthRepositoryImpl },
    { provide: LoginUseCase, useClass: LoginUseCaseImpl },
    provideRouter(routes, withComponentInputBinding()),
  ],
};
