import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AuthFacade } from '@app/presentation/facades/auth.facade';
import { User } from '@app/domain/entities/user.entity';
import { LoginUseCase } from '@app/domain/usecases/login.usecase';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authFacadeSpy: jasmine.SpyObj<AuthFacade>;
  let routerSpy: jasmine.SpyObj<Router>;
  let loginUseCaseSpy: jasmine.SpyObj<LoginUseCase>;

  beforeEach(async () => {
    // Creamos mocks
    authFacadeSpy = jasmine.createSpyObj('AuthFacade', ['login']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    loginUseCaseSpy = jasmine.createSpyObj('LoginUseCase', ['execute']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, LoginComponent], // Standalone
      providers: [
        { provide: LoginUseCase, useValue: loginUseCaseSpy },
        { provide: AuthFacade, useValue: authFacadeSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form when empty', () => {
    expect(component.form.valid).toBeFalse();
  });

  it('should toggle password visibility', () => {
    const initial = component.showPwd();
    component.togglePwd();
    expect(component.showPwd()).toBe(!initial);
  });

  it('should call login when form is valid', () => {
    // Preparamos valores válidos
    component.form.setValue({ username: 'user', password: 'pass' });

    // ⚡ Mockeamos un User válido del dominio
    const mockUser: User = {
      username: 'testUser',
      nombre: 'Test',
      apellido: 'User',
      email: 'test@demo.com',
    };

    authFacadeSpy.login.and.returnValue(of(mockUser));

    component.submit();

    expect(authFacadeSpy.login).toHaveBeenCalled();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/welcome');
  });

  it('should set error message on login failure', () => {
    component.form.setValue({ username: 'user', password: 'pass' });
    authFacadeSpy.login.and.returnValue(throwError(() => new Error('fail')));

    component.submit();

    expect(component.error()).toBe('Credenciales inválidas');
  });
});
