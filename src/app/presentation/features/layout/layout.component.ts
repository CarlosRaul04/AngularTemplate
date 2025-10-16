import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet, ActivatedRoute } from '@angular/router';
import { AuthFacade } from '@app/presentation/facades/auth.facade';
import { ConfirmDialogService } from '@app/shared/services/confirm-dialog.service';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  // Importamos el dialog de confirmación
  private confirmDialog = inject(ConfirmDialogService);
  authFacade = inject(AuthFacade);
  private router = inject(Router);
  //private nav = inject(NavigationService);
  private route = inject(ActivatedRoute);

  user$ = this.authFacade.user$();

  logout() {
    this.confirmDialog
      .open({
        title: 'Cerrar Sesión',
        message: '¿Seguro que deseas cerrar sesión?',
        cancelText: 'Cancelar',
        confirmText: 'Confirmar',
      })
      .subscribe((result) => {
        if (result) {
          console.log('Usuario confirmo logout');
          this.authFacade.logout();
          //this.nav.goToLogin();
          this.router.navigate(['/login'], { relativeTo: this.route });
        } else {
          console.log('Usuario canceló logout');
        }
      });
  }
}
