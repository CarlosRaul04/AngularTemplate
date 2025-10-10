import { Observable } from 'rxjs';
import { User } from '../entities/user.entity';

export interface LoginRequest {
  username: string;
  password: string;
}

export abstract class AuthRepository {
  abstract login(request: LoginRequest): Observable<User>;
  abstract getUser$(): Observable<User | null>;
  abstract logout(): void;
}
