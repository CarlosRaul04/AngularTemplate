import { provideHttpClient, withFetch } from '@angular/common/http';
import { AuthRepository } from '@domain/repositories/auth.repository';
import { AuthRepositoryImpl } from '@infra/auth/auth.repository.impl';
import { LoginUseCase } from '@domain/usecases/login.usecase';
import { LoginUseCaseImpl } from '@app/application/auth/login.usecase.impl';
import { LogoutUseCase } from '@domain/usecases/logout.usecase';
import { LogoutUseCaseImpl } from './app/application/auth/logout.usecae.impl'; 
import { AuthFacade } from '@app/presentation/facades/auth.facade';
import { ConfirmDialogService } from '@app/shared/services/confirm-dialog.service';

export const remoteProviders = [
  provideHttpClient(withFetch()),
  { provide: AuthRepository, useClass: AuthRepositoryImpl },
  { provide: LoginUseCase, useClass: LoginUseCaseImpl },
  { provide: LogoutUseCase, useClass: LogoutUseCaseImpl },
  AuthFacade,
  ConfirmDialogService,
];






