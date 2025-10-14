// src/bootstrap.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';

// // Flag global para microfrontend
// declare global {
//   interface Window {
//     IS_MICROFRONTEND?: boolean;
//   }
// }

// /**
//  * Función para montar la app desde un shell.
//  * Nota: Angular standalone no permite pasar un host DOM arbitrario.
//  * La app remota se monta como SPA completa.
//  */
// export async function mountNeosApp() {
//   // Indicamos que se está ejecutando como microfrontend
//   window.IS_MICROFRONTEND = true;

//   // Arrancamos la app remota
//   return bootstrapApplication(App, appConfig);
// }

// // Para ejecución standalone del remoto
// if (!window.IS_MICROFRONTEND) {
//   bootstrapApplication(App, appConfig).catch((err) => console.error(err));
// }

bootstrapApplication(App, appConfig)
  .catch(err => console.error(err));


