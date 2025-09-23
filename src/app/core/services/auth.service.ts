import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { environment as enviromentProd } from '../../../environments/environment.prod';

export interface User {
  username: string;
  nombre?: string;
  apellido?: string;
  email?: string;
}

type ApiUser = Partial<User> & {
  user?: string;
};

type LoginReq = { username: string; password: string };

// ✅ Mock SOLO si no es producción y además el env pide mock.
//    Esto evita que un reemplazo mal configurado deje mock activo en prod.
const USE_MOCK = !environment.production && environment.auth.mode === 'mock';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user$ = new BehaviorSubject<User | null>(null);
  user$ = this._user$.asObservable();

  private hydrated$?: Observable<boolean>;
  private http = inject(HttpClient);

  constructor() {
    // -- logs de diagnóstico (borra cuando verifiques) ------------------------
    // console.log('[ENV] production=', environment.production, 'mode=', environment.auth.mode);
    // console.log('[ENV] base=', environment.auth.base, 'USE_MOCK=', USE_MOCK);
    // ------------------------------------------------------------------------
    this.ensureSession().subscribe();
  }

  private mapApiUser(api: ApiUser): User {
    return {
      username: api?.username ?? api?.user ?? '',
      nombre: api?.nombre,
      apellido: api?.apellido,
      email: api?.email,
    };
  }

  /** Intenta hidratar el usuario una sola vez. */
  ensureSession(): Observable<boolean> {
    if (this._user$.value) return of(true);
    if (this.hydrated$) return this.hydrated$;

    if (USE_MOCK) {
      //const savedUser = localStorage.getItem('mockUser');
      //if (savedUser) {
      // En mock no auto-logueamos
      //this._user$.next(JSON.parse(savedUser));
      this._user$.next(null);
      this.hydrated$ = of(false).pipe(shareReplay(1));
      return this.hydrated$;
      //}
    }

    const base = enviromentProd.auth.base;
    this.hydrated$ = this.http.get<ApiUser>(`${base}/current-user`, { withCredentials: true }).pipe(
      map((api) => this.mapApiUser(api)),
      tap((u) => this._user$.next(u)),
      map(() => true),
      catchError(() => {
        this._user$.next(null);
        return of(false);
      }),
      shareReplay(1),
    );

    return this.hydrated$;
  }

  /** Login: mock (solo en dev) o remoto (prod). */
  login(body: LoginReq): Observable<User> {
    if (USE_MOCK) {
      const mockCredentials = environment.auth.mockCreds!;
      if (
        body.username === mockCredentials.username &&
        body.password === mockCredentials.password
      ) {
        const user = environment.auth.mockUser!;
        this._user$.next(user);
        localStorage.setItem('mockUser', JSON.stringify(user));
        return of(user);
      }
      return throwError(() => new Error('Credenciales inválidas'));
    }

    const base = enviromentProd.auth.base;
    return this.http.post(`${base}/login`, body, { withCredentials: true }).pipe(
      switchMap(() => this.http.get<ApiUser>(`${base}/current-user`, { withCredentials: true })),
      map((api) => this.mapApiUser(api)),
      tap((u) => this._user$.next(u)),
    );
  }

  logout(): void {
    this.hydrated$ = undefined;

    if (USE_MOCK) {
      this._user$.next(null);
      localStorage.removeItem('mockUser');
      return;
    }

    const base = enviromentProd.auth.base;
    this.http.post(`${base}/logout`, {}, { withCredentials: true }).subscribe({
      complete: () => this._user$.next(null),
      error: () => this._user$.next(null),
    });
  }

  isLoggedIn(): boolean {
    return !!this._user$.value;
  }

  getSnapshot(): User | null {
    return this._user$.value;
  }
}
