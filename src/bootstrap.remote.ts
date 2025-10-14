// src/bootstrap-remote.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from '@app/app';
import { appConfig } from './app/app.config';

let appRef: any;

export async function mount(container: HTMLElement) {
  // opcional: crear un root element dentro del container
  const root = document.createElement('div');
  root.id = `remote-root-${Math.random().toString(36).slice(2)}`;
  container.appendChild(root);

  // bootstrap the remote app into that element
  appRef = await bootstrapApplication(App, {
    providers: [...(appConfig.providers ?? [])]
  });

  // devuelve un destroy si quieres desmontar
  return {
    destroy: () => {
      try {
        appRef?.destroy?.();
        if (root.parentNode) root.parentNode.removeChild(root);
      } catch (e) { console.error('error unmounting remote', e); }
    }
  };
}
