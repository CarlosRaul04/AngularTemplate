import { LocationChangeListener, LocationStrategy } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable()
export class RemoteLocationStrategy extends LocationStrategy {
  private internalPath = '';

  path(): string {
    return this.internalPath;
  }

  prepareExternalUrl(internal: string): string {
    return internal;
  }

  pushState(_state: any, _title: string, url: string, queryParams: string): void {
    this.internalPath = queryParams ? `${url}?${queryParams}` : url;
    console.log('[REMOTE] pushState →', this.internalPath);
  }

  replaceState(_state: any, _title: string, url: string, queryParams: string): void {
    this.internalPath = queryParams ? `${url}?${queryParams}` : url;
    console.log('[REMOTE] replaceState →', this.internalPath);
  }

  forward(): void {}
  back(): void {}
  onPopState(_fn: LocationChangeListener): void {}
  getBaseHref(): string {
    return '/';
  }
  getState(): unknown {
    return {};
  }
}
