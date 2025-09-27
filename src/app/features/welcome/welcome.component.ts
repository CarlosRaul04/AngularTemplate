import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@core/auth/auth.service';
import { Router } from '@angular/router';
import { ThemeService } from '@app/core/services/theme';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  auth = inject(AuthService);
  private router = inject(Router);
  theme = inject(ThemeService);

  toggleTheme() {
    console.log('[Welcome] toggleTheme (antes):', this.theme.active);
    this.theme.toggle(); // usa toggle para alternar
    console.log('[Welcome] toggleTheme (después):', this.theme.active);
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
