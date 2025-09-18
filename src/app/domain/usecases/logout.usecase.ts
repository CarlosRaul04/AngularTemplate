import { Observable } from 'rxjs';

export abstract class LogoutUseCase {
  abstract execute(): void;
}
