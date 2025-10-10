// src/app/remote-entry/bootstrap.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from '@app/app';
import { appConfig } from '../app.config'; // si tienes providers globales

// ⚙️ Inicializador que arranca la app remotamente
export async function mountNeosApp(element: HTMLElement) {
  // Crea dinámicamente el elemento raíz
  const root = document.createElement('div');
  root.id = 'neos-root';
  element.appendChild(root);

  // Bootstrap de la app
  await bootstrapApplication(App, appConfig);

  return root;
}
