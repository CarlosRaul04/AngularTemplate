import { Observable } from 'rxjs';
import { LoginRequest } from '../repositories/auth.repository';
import { User } from '../entities/user.entity';

export abstract class LoginUseCase {
  abstract execute(request: LoginRequest): Observable<User>;
}
