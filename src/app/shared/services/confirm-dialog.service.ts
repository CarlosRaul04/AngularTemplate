import { Dialog } from '@angular/cdk/dialog';
import { inject, Injectable } from '@angular/core';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../components/confirm-dialog/confirm-dialog.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  private dialog = inject(Dialog);

  open(data: ConfirmDialogData): Observable<boolean | undefined> {
    const ref = this.dialog.open<boolean>(ConfirmDialogComponent, {
      data,
      disableClose: true, // te obliga a elegir una opción
      hasBackdrop: true,
      backdropClass: 'bg-black/50',
    });

    return ref.closed; // Devuelve un observable<boolean>
  }
}
