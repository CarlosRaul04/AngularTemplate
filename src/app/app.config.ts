
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withHashLocation } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AuthRepository } from './domain/repositories/auth.repository';
import { AuthRepositoryImpl } from './infrastructure/auth/auth.repository.impl';
import { LoginUseCase } from './domain/usecases/login.usecase';
import { LoginUseCaseImpl } from './application/auth/login.usecase.impl';
import { LogoutUseCaseImpl } from './application/auth/logout.usecae.impl';
import { LogoutUseCase } from './domain/usecases/logout.usecase';
//import { errorInterceptor } from './core/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(
      withFetch(),
      // withInterceptors([
      //   errorInterceptor
      // ])
    ),
    { provide: AuthRepository, useClass: AuthRepositoryImpl },
    { provide: LoginUseCase, useClass: LoginUseCaseImpl },
    { provide: LogoutUseCase, useClass: LogoutUseCaseImpl },
    provideRouter(routes, withComponentInputBinding(), withHashLocation()),
  ],
};
