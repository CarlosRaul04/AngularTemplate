import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  auth = inject(AuthService);
  private router = inject(Router);

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
