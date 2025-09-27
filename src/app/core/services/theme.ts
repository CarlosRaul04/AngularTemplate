import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private current: 'light' | 'dark' = 'light';

  constructor(@Inject(DOCUMENT) private document: Document) {
    // Inicializa según la clase en body si existe (útil para refresh)
    const b = this.document.body;
    if (b.classList.contains('theme--dark')) this.current = 'dark';
    if (b.classList.contains('theme--light')) this.current = 'light';
  }

  setTheme(theme: 'light' | 'dark') {
    this.current = theme;
    const body = this.document.body;
    body.classList.remove('theme--light', 'theme--dark');
    body.classList.add(`theme--${theme}`);
    console.log('[ThemeService] setTheme ->', theme, 'body.class:', body.className);
  }

  toggle() {
    this.setTheme(this.current === 'light' ? 'dark' : 'light');
  }

  get active() {
    return this.current;
  }
}
