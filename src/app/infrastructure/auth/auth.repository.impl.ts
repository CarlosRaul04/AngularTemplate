import { inject, Injectable } from '@angular/core';
import { AuthService } from '@app/core/auth/auth.service';
import { User } from '@app/domain/entities/user.entity';
import { AuthRepository, LoginRequest } from '@app/domain/repositories/auth.repository';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthRepositoryImpl extends AuthRepository {
  private readonly authService = inject(AuthService);

  login(request: LoginRequest): Observable<User> {
    // Delegamos en el servicio real (core/auth/auth.service)
    // Adaptamos el entity con la interfaz del authService
    return this.authService.login(request).pipe(
      map((coreUser) => ({
        username: coreUser.username,
        nombre: coreUser.nombre ?? '',
        apellido: coreUser.apellido ?? '',
        email: coreUser.email ?? '',
      })),
    );
  }

  override logout(): void {
    return this.authService.logout();
  }
}
