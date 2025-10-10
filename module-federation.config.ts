/* eslint-disable */

import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'neosTemplate',
  exposes: {
    './App': './src/app/remote-entry/bootstrap.ts',
  },
};

export default config;
