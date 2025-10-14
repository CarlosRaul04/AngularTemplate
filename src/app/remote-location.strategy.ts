import { LocationChangeListener, LocationStrategy } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable()
export class RemoteLocationStrategy extends LocationStrategy {
  private _internalPath = '/';

  // Devuelve la "ruta interna" que mantiene el router del remoto.
  path(includeHash?: boolean): string {
    return this._internalPath;
  }

  // Convierte una URL interna en la URL externa. 
  // Aquí la devolvemos tal cual para mantener consistencia interna.
  prepareExternalUrl(internal: string): string {
    return internal;
  }

  // Cuando el Router pide pushState, actualizamos sólo el estado interno
  // SIN tocar window.history ni window.location.
  pushState(state: any, title: string, url: string, queryParams: string): void {
    this._internalPath = this._buildUrl(url, queryParams);
  }

  // Igual que pushState pero reemplaza el estado interno.
  replaceState(state: any, title: string, url: string, queryParams: string): void {
    this._internalPath = this._buildUrl(url, queryParams);
  }

  // Opcional: no hacemos nada con forward/back para no tocar la historia del host.
  forward(): void {
    // noop — o implementar lógica interna si quieres mantener un stack propio
  }

  back(): void {
    // noop
  }

  // Estas funciones son requeridas por la interfaz (para suscribirse a cambios).
  onPopState(fn: LocationChangeListener): void {
    // No expondremos popstate del navegador; si necesitas, podrías emitir eventos
    // custom para que tu app los maneje. Por ahora simplemente no llamamos fn.
  }

  getBaseHref(): string {
    return '/';
  }

  getState(): unknown {
    // Retorna un objeto vacío o el estado interno si lo necesitas.
    return {};
  }

  private _buildUrl(url: string, queryParams: string) {
    return queryParams ? `${url}?${queryParams}` : url;
  }
}
