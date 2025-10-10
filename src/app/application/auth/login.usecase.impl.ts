import { inject, Injectable } from '@angular/core';
import { User } from '@app/domain/entities/user.entity';
import { AuthRepository, LoginRequest } from '@app/domain/repositories/auth.repository';
import { LoginUseCase } from '@app/domain/usecases/login.usecase';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginUseCaseImpl implements LoginUseCase {
  private readonly authRepository = inject(AuthRepository);

  execute(request: LoginRequest): Observable<User> {
    if (!request.username || !request.password) {
      return throwError(() => new Error('Usuario y contrasenia son obligatorias'));
    }

    return this.authRepository.login(request);
  }
}
