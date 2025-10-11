import {
  Component,
  ViewChild,
  ViewContainerRef,
  Type,
  inject,
  OnInit,
  EnvironmentInjector,
} from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';

// Importación de componentes locales (asegúrate de que sean standalone o declarados correctamente)
import { LoginComponent } from '../auth/login/login.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import { SettingsComponent } from '../settings/settings.component';
import { DocumentationComponent } from '../documentation/documentation.component';
import { ComponentsComponent } from '../components/components.component';
import { LayoutComponent } from '../layout/layout.component';

// Servicios compartidos
import { AuthService } from '@app/core/services/auth.service';
import { AuthFacade } from '@app/presentation/facades/auth.facade';

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
  providers: [AuthService, AuthFacade],
})
export class RemoteWrapperComponent implements OnInit {
  private route = inject(ActivatedRoute);
  environmentInjector =
  (window as any).hostEnvironmentInjector ||
  inject(EnvironmentInjector);


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
    const componentName = this.route.snapshot.paramMap.get('componentName');
    if (componentName) {
      this.loadComponent(componentName);
    } else {
      this.showMessage('⚠️ No se especificó ningún componente remoto.');
    }
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
      this.message = ''; // limpiar mensaje si todo sale bien
    } catch (error) {
      console.error('Error cargando componente remoto:', error);
      this.showMessage(`⚠️ Error al cargar el componente "${name}".`);
    }
  }

  private showMessage(text: string): void {
    this.message = text;
  }
}
