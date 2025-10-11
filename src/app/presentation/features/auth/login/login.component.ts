import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs/operators';
import { AuthFacade } from '@app/presentation/facades/auth.facade';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthFacade]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authFacade = inject(AuthFacade);
  private router = inject(Router);

  private _loading = signal(false);
  loading = () => this._loading();

  private _error = signal('');
  error = () => this._error();

  showPwd = signal(false);
  togglePwd() {
    this.showPwd.update(() => !this.showPwd());
  }

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  submit() {
    if (this.form.invalid || this.loading()) return;
    this._error.set('');
    this._loading.set(true);

    this.authFacade
      .login(this.form.getRawValue())
      .pipe(
        take(1),
        finalize(() => this._loading.set(false)),
      )
      .subscribe({
        next: () => this.router.navigateByUrl('/welcome'),
        error: () => this._error.set('Credenciales inválidas'),
      });
  }
}
