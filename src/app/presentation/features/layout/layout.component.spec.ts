import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutComponent } from './layout.component';
import { AuthFacade } from '@app/presentation/facades/auth.facade';
import { LoginUseCase } from '@app/domain/usecases/login.usecase';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let mockAuthFacade: jasmine.SpyObj<AuthFacade>;
  let mockLoginUseCase: jasmine.SpyObj<LoginUseCase>;

  beforeEach(async () => {
    mockAuthFacade = jasmine.createSpyObj('AuthFacade', ['login']);
    mockLoginUseCase = jasmine.createSpyObj('LoginUseCase', ['execute']);

    await TestBed.configureTestingModule({
      imports: [LayoutComponent],
      providers: [
        { provide: AuthFacade, useValue: mockAuthFacade },
        { provide: LoginUseCase, useValue: mockLoginUseCase },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
