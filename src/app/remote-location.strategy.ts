import { LocationChangeListener, LocationStrategy } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable()
export class RemoteLocationStrategy extends LocationStrategy {
  private _internalPath = '/';
  private _state: any = {};

  path(includeHash?: boolean): string {
    return this._internalPath;
  }

  prepareExternalUrl(internal: string): string {
    return internal;
  }

  pushState(state: any, title: string, url: string, queryParams: string): void {
    this._internalPath = this._buildUrl(url, queryParams);
    this._state = state;

    console.log(
      `%c[RemoteLocationStrategy] pushState →`,
      'color: #4CAF50; font-weight: bold;',
      this._internalPath
    );
  }

  replaceState(state: any, title: string, url: string, queryParams: string): void {
    this._internalPath = this._buildUrl(url, queryParams);
    this._state = state;

    console.log(
      `%c[RemoteLocationStrategy] replaceState →`,
      'color: #FFC107; font-weight: bold;',
      this._internalPath
    );
  }

  forward(): void {
    console.log('%c[RemoteLocationStrategy] forward() → no-op', 'color: #2196F3;');
  }

  back(): void {
    console.log('%c[RemoteLocationStrategy] back() → no-op', 'color: #2196F3;');
  }

  onPopState(fn: LocationChangeListener): void {
    console.log('%c[RemoteLocationStrategy] onPopState() → no listener attached', 'color: #9E9E9E;');
  }

  getBaseHref(): string {
    return '/';
  }

  getState(): unknown {
    return this._state;
  }

  private _buildUrl(url: string, queryParams: string): string {
    return queryParams ? `${url}?${queryParams}` : url;
  }
}
