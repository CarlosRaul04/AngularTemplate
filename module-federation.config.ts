/* eslint-disable */

import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'neosTemplate',
  exposes: {
    // './App': './src/app/remote-entry/bootstrap.ts',
    './public-api': './src/public-api.ts',
  },
};

export default config;
