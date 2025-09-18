import { AppEnvironment } from './environment.model';

export const environment: AppEnvironment = {
  production: true,
  auth: {
    mode: 'remote',
    base: 'https://auth.neosaisolutions.com/auth'
  }
};
