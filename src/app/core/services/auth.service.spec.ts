import { TestBed } from '@angular/core/testing';
import { AuthService, User } from './auth.service';
import { environment } from '../../../environments/environment';
import { take } from 'rxjs/operators';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // ✅ agregado

describe('AuthService (mock mode)', () => {
  let service: AuthService;
  const mockUser = environment.auth.mockUser!;
  const mockCreds = environment.auth.mockCreds!;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // ✅ agrega este módulo
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('login with correct mock credentials sets user and localStorage', (done) => {
    service
      .login(mockCreds)
      .pipe(take(1))
      .subscribe({
        next: (u: User) => {
          expect(u).toEqual(mockUser);
          expect(service.getSnapshot()).toEqual(mockUser);
          expect(service.isLoggedIn()).toBeTrue();
          expect(localStorage.getItem('mockUser')).toBeTruthy();
          done();
        },
        error: done.fail,
      });
  });

  it('login with wrong credentials should fail', (done) => {
    service.login({ username: 'bad', password: 'wrong' }).subscribe({
      next: () => done.fail('Expected error for bad credentials'),
      error: (err) => {
        expect(err).toBeTruthy();
        expect(service.isLoggedIn()).toBeFalse();
        done();
      },
    });
  });

  it('logout should clear user and localStorage', (done) => {
    // Primero logueamos
    service
      .login(mockCreds)
      .pipe(take(1))
      .subscribe({
        next: () => {
          expect(service.isLoggedIn()).toBeTrue();

          service.logout();
          expect(service.getSnapshot()).toBeNull();
          expect(service.isLoggedIn()).toBeFalse();
          expect(localStorage.getItem('mockUser')).toBeNull();
          done();
        },
        error: done.fail,
      });
  });
});
