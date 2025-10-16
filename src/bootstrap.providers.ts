import { provideHttpClient, withFetch } from '@angular/common/http';
import { AuthRepository } from '@domain/repositories/auth.repository';
import { AuthRepositoryImpl } from '@infra/auth/auth.repository.impl';
import { LoginUseCase } from '@domain/usecases/login.usecase';
import { LoginUseCaseImpl } from '@app/application/auth/login.usecase.impl';
import { LogoutUseCase } from '@domain/usecases/logout.usecase';
import { LogoutUseCaseImpl } from './app/application/auth/logout.usecae.impl'; 
import { AuthFacade } from '@app/presentation/facades/auth.facade';
import { ConfirmDialogService } from '@app/shared/services/confirm-dialog.service';
import { RemoteLocationStrategy } from '@app/remote-location-strategy';
import { LocationStrategy } from '@angular/common';
import { APP_BASE_HREF } from '@angular/common';

export const remoteProviders = [
  provideHttpClient(withFetch()),
  { provide: APP_BASE_HREF, useValue: '/neos' },
  { provide: AuthRepository, useClass: AuthRepositoryImpl },
  { provide: LoginUseCase, useClass: LoginUseCaseImpl },
  { provide: LogoutUseCase, useClass: LogoutUseCaseImpl },
  { provide: LocationStrategy, useClass: RemoteLocationStrategy },
  AuthFacade,
  ConfirmDialogService,
];



