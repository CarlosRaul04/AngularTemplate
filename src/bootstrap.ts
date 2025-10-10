// src/bootstrap.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';
import { NgZone } from '@angular/core';

// Función para montar la app dentro del shell
export async function mountNeosApp(container?: HTMLElement) {
  const root = container || document.createElement('div');
  if (!container) document.body.appendChild(root);

  // Creamos el elemento <app-root> dentro del contenedor
  const appRoot = document.createElement('app-root');
  root.appendChild(appRoot);

  // Flag para indicar que es microfrontend
  window.IS_MICROFRONTEND = true;

  // Montamos la app directamente sobre el elemento
  await bootstrapApplication(App, {
    ...appConfig,
    // aquí no hay hostElement, bootstrapApplication lo monta sobre <app-root> automáticamente
  });
}

declare global {
  interface Window {
    IS_MICROFRONTEND?: boolean;
  }
}

// Para ejecución standalone del remoto
if (!window['IS_MICROFRONTEND']) {
  bootstrapApplication(App, appConfig).catch((err) => console.error(err));
}



