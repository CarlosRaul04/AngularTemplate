import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs/operators';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  private _loading = signal(false);
  loading = () => this._loading();

  private _error = signal('');
  error = () => this._error();

  showPwd = signal(false);
  togglePwd() { this.showPwd.set(!this.showPwd()); }

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  submit() {
    if (this.form.invalid || this.loading()) return;
    this._error.set('');
    this._loading.set(true);

    this.auth.login(this.form.getRawValue()).pipe(
      take(1),
      finalize(() => this._loading.set(false))
    ).subscribe({
      next: () => this.router.navigateByUrl('/welcome'),
      error: () => this._error.set('Credenciales inválidas')
    });
  }
}
