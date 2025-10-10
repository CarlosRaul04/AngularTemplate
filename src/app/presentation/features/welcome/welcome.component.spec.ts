import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WelcomeComponent } from './welcome.component';
import { LoginUseCase } from '@app/domain/usecases/login.usecase';
import { AuthFacade } from '@app/presentation/facades/auth.facade';

// Mock simple de LoginUseCase
class MockLoginUseCase {
  execute() {
    return Promise.resolve(true);
  }
}

// Mock simple de AuthFacade2
class MockAuthFacade2 {
  login() {
    return Promise.resolve(true);
  }
}

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomeComponent], // si es standalone
      providers: [
        { provide: LoginUseCase, useClass: MockLoginUseCase },
        { provide: AuthFacade, useClass: MockAuthFacade2 },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
