import { inject, Injectable } from '@angular/core';
import { AuthRepository } from '@app/domain/repositories/auth.repository';
import { LogoutUseCase } from '@app/domain/usecases/logout.usecase';

@Injectable({
  providedIn: 'root',
})
export class LogoutUseCaseImpl implements LogoutUseCase {
  private readonly authRepository = inject(AuthRepository);

  execute(): void {
    return this.authRepository.logout();
  }
}
