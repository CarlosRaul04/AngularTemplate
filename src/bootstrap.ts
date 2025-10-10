// src/bootstrap.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';
import { NgZone } from '@angular/core';

// ⚡ Función para montar la app dentro del shell
export async function mountNeosApp(container?: HTMLElement) {
  // Si no se pasa un contenedor, se crea uno en body
  const root = container || document.createElement('div');
  if (!container) document.body.appendChild(root);

  // Creamos una nueva Angular Zone independiente para evitar conflictos
  const zone = new NgZone({ enableLongStackTrace: false });

  await zone.run(() => bootstrapApplication(App, appConfig));
}

declare global {
  interface Window {
    IS_MICROFRONTEND?: boolean;
  }
}

// ⚠️ Para ejecución standalone del remoto
if (!window['IS_MICROFRONTEND']) {
  bootstrapApplication(App, appConfig).catch((err) => console.error(err));
}



