import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { AuthFacade } from '@app/presentation/facades/auth.facade';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  //auth = inject(AuthService);
  authFacade = inject(AuthFacade);

  user$ = this.authFacade.user$();
}
