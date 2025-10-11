
export type AuthMode = 'mock' | 'remote';

export interface AuthEnv {
  mode: AuthMode;
  base: string; // p.ej. https://auth.neosaisolutions.com/auth
  mockCreds?: { username: string; password: string };
  mockUser?: { username: string; nombre?: string; apellido?: string; email?: string };
}

export interface AppEnvironment {
  production: boolean;
  auth: AuthEnv;
}
