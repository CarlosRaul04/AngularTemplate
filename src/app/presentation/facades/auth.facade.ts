import { inject, Injectable } from '@angular/core';
import { User } from '@app/domain/entities/user.entity';
import { AuthRepository, LoginRequest } from '@app/domain/repositories/auth.repository';
import { LoginUseCase } from '@app/domain/usecases/login.usecase';
import { LogoutUseCase } from '@app/domain/usecases/logout.usecase';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private readonly loginUseCase = inject(LoginUseCase);
  private readonly logoutUseCase = inject(LogoutUseCase);
  private readonly authRepository = inject(AuthRepository);

  user$(): Observable<User | null> {
    return this.authRepository.getUser$();
  }

  login(request: LoginRequest): Observable<User> {
    return this.loginUseCase.execute(request);
  }

  logout(): void {
    return this.logoutUseCase.execute();
  }
}
