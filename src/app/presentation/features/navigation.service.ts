import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private router = inject(Router);

  goToLogin() {
    this.router.navigate(['login']);
  }

  goToWelcome() {
    this.router.navigate(['layout', 'welcome']);
  }

}



