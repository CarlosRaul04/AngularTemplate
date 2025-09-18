import { AppEnvironment } from './environment.model';

export const environment: AppEnvironment = {
  production: false,
  auth: {
    mode: 'mock',
    base: '/auth', // no se usa en mock
    mockCreds: { username: 'cristian', password: '123456' },
    mockUser: {
      username: 'cristian',
      nombre: 'Cristian',
      apellido: 'Roa',
      email: 'cristian.roa@neosaisolutions.com'
    }
  }
};
