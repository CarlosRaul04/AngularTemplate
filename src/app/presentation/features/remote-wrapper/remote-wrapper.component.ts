import {
  Component,
  ViewChild,
  ViewContainerRef,
  Type,
  inject,
  OnInit,
  EnvironmentInjector,
  createEnvironmentInjector,
  StaticProvider,
  Injector,
} from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

// Tokens / clases de tu dominio (ajusta rutas si las mueves)
import { AuthRepository } from '@domain/repositories/auth.repository'; 
import { AuthRepositoryImpl } from '@infra/auth/auth.repository.impl'; 
import { LoginUseCase } from '@domain/usecases/login.usecase'; 
import { LoginUseCaseImpl } from '@app/application/auth/login.usecase.impl'; 
import { LogoutUseCase } from '@domain/usecases/logout.usecase'; 
import { LogoutUseCaseImpl } from '@app/application/auth/logout.usecae.impl'; 

// Componentes remotos que expones en el wrapper
import { LoginComponent } from '@presentation/features/auth/login/login.component'; 
import { WelcomeComponent } from '@presentation/features/welcome/welcome.component'; 
import { SettingsComponent } from '@presentation/features/settings/settings.component';
import { DocumentationComponent } from '@presentation/features/documentation/documentation.component';
import { ComponentsComponent } from '@presentation/features/components/components.component';
import { LayoutComponent } from '@presentation/features/layout/layout.component';

@Component({
  selector: 'app-remote-wrapper',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    AsyncPipe,
  ],
  template: `
    <div class="wrapper-container">
      <ng-container #dynamicContainer></ng-container>
      <p *ngIf="message" class="wrapper-message">{{ message }}</p>
    </div>
  `,
  styleUrls: ['./remote-wrapper.component.scss'],
})
export class RemoteWrapperComponent implements OnInit {
  private route = inject(ActivatedRoute);

  // 1) Intentamos obtener el EnvironmentInjector del host si lo compartió:
  private hostEnvInjector = (window as any).hostEnvironmentInjector as EnvironmentInjector | undefined;

  // 2) Base injector: si hay host, lo usamos como parent, si no usamos el local injector.
  private baseInjector: EnvironmentInjector | Injector = this.hostEnvInjector || inject(EnvironmentInjector);

  // 3) Lista de providers que el remoto necesita por defecto (los mismos que usas en appConfig)
  //    * Nota: aquí declaramos los providers tal y como los defines en appConfig.
  private remoteDefaultProviders: any[] = [
    // HttpClient provider (si el host no lo tiene, lo añadimos)
    provideHttpClient(withFetch()),

    // Repos / UseCases (ajusta si cambias implementaciones)
    { provide: AuthRepository, useClass: AuthRepositoryImpl, multi: false },
    { provide: LoginUseCase, useClass: LoginUseCaseImpl, multi: false },
    { provide: LogoutUseCase, useClass: LogoutUseCaseImpl, multi: false },
  ];

  // 4) EnvironmentInjector final que usaremos para crear componentes.
  //    Se establecerá en ngOnInit llamando a `ensureMergedInjector()`.
  private environmentInjector!: EnvironmentInjector;

  @ViewChild('dynamicContainer', { read: ViewContainerRef, static: true })
  dynamicContainer!: ViewContainerRef;

  message = '';

  private componentsMap: Record<string, Type<any>> = {
    login: LoginComponent,
    welcome: WelcomeComponent,
    settings: SettingsComponent,
    documentation: DocumentationComponent,
    components: ComponentsComponent,
    layout: LayoutComponent,
  };

  ngOnInit(): void {
    // Preparar el injector combinado (host + missing remote providers)
    this.ensureMergedInjector();

    // 2. Conectamos el router local con el del host (si existe)
    this.patchRouterForHost();

    const componentName = this.route.snapshot.paramMap.get('componentName');
    if (componentName) {
      this.loadComponent(componentName);
    } else {
      this.showMessage('⚠️ No se especificó ningún componente remoto.');
    }
  }

  /**
   * Crea un EnvironmentInjector que:
   *  - usa el injector del host como parent si existe
   *  - añade únicamente los providers que no se encuentran ya en el parent
   */
  private ensureMergedInjector(): void {
    const parent = (this.baseInjector as any);

    // Normaliza providers (some providers could be arrays)
    const flatten = (arr: any[]): StaticProvider[] =>
      arr.flatMap((p) => (Array.isArray(p) ? flatten(p) : p));

    const candidateProviders = flatten(this.remoteDefaultProviders);

    // Filtramos los providers que ya estén presentes en el parent injector
    const providersToAdd: StaticProvider[] = [];

    for (const p of candidateProviders) {
      // Si p tiene 'provide' usamos ese token, si no, intentamos usar el propio provider (raro)
      const token = (p as any).provide ?? (p as any).token ?? null;
      if (!token) {
        // Si no hay token explícito (casos raros), lo añadimos por seguridad
        providersToAdd.push(p);
        continue;
      }

      // Intentamos resolver en parent: si devuelve !== null/undefined existe y lo omitimos
      let exists = false;
      try {
        // Injector.get admite un segundo parámetro 'notFoundValue'
        const resolved = (parent as Injector).get(token as any, null);
        exists = resolved !== null && resolved !== undefined;
      } catch {
        exists = false;
      }

      if (!exists) {
        providersToAdd.push(p);
      } else {
        // debug
        // console.debug('[RemoteWrapper] token presente en host, no añadimos:', token);
      }
    }

    // Debug: mostrar qué providers añadiremos
    if (providersToAdd.length > 0) {
      console.info('[RemoteWrapper] Añadiendo providers faltantes:', providersToAdd);
    } else {
      console.info('[RemoteWrapper] El host ya provee todos los providers necesarios.');
    }

    // Creamos un EnvironmentInjector hijo con los providers faltantes y parent = baseInjector
    this.environmentInjector = createEnvironmentInjector(providersToAdd, this.baseInjector as EnvironmentInjector);
  }

  private loadComponent(name: string): void {
    this.dynamicContainer.clear();
    const componentType = this.componentsMap[name.toLowerCase()];

    if (!componentType) {
      this.showMessage(`❌ Componente remoto "${name}" no encontrado.`);
      return;
    }

    try {
      this.dynamicContainer.createComponent(componentType, {
        environmentInjector: this.environmentInjector,
      });
      this.message = '';
    } catch (error) {
      console.error('Error cargando componente remoto:', error);
      this.showMessage(`⚠️ Error al cargar el componente "${name}".`);
    }
  }

  private showMessage(text: string): void {
    this.message = text;
  }

  private patchRouterForHost(): void {
  try {
    const hostInjector = (window as any).hostEnvironmentInjector as EnvironmentInjector | undefined;
    if (!hostInjector) return;

    const hostRouter = hostInjector.get(Router);
    const localRouter = (this.baseInjector as Injector).get(Router);

    // 🔁 Monkey-patch de navigateByUrl y navigate
    const originalNavigateByUrl = localRouter.navigateByUrl.bind(localRouter);
    const originalNavigate = localRouter.navigate.bind(localRouter);

    localRouter.navigateByUrl = (url: any, extras?: any) => {
      if (hostRouter) return hostRouter.navigateByUrl(url, extras);
      return originalNavigateByUrl(url, extras);
    };

    localRouter.navigate = (commands: any[], extras?: any) => {
      if (hostRouter) return hostRouter.navigate(commands, extras);
      return originalNavigate(commands, extras);
    };

    console.info('[RemoteWrapper] Router remoto conectado con router del host.');
  } catch (err) {
    console.warn('[RemoteWrapper] No se pudo enlazar router con host:', err);
  }
}
}
