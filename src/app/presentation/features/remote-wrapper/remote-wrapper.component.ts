// src/app/presentation/features/remote-wrapper/remote-wrapper.component.ts
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewContainerRef,
  ViewChild,
  Type,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Importamos todos los componentes que queremos exponer
import { LoginComponent } from '../auth/login/login.component';
import { WelcomeComponent } from '../welcome/welcome.component';
import { SettingsComponent } from '../settings/settings.component';
import { DocumentationComponent } from '../documentation/documentation.component';
import { ComponentsComponent } from '../components/components.component';
import { LayoutComponent } from '../layout/layout.component';

// Importamos servicios (facades/core)
import { AuthService } from '@app/core/services/auth.service';
import { AuthFacade } from '@app/presentation/facades/auth.facade';

@Component({
  selector: 'app-remote-wrapper',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div class="wrapper-container">
      <ng-container #dynamicContainer></ng-container>
    </div>
  `,
  styleUrls: ['./remote-wrapper.component.scss'],
  providers: [AuthService, AuthFacade],
})
export class RemoteWrapperComponent implements OnChanges {
  @Input() componentName: string = ''; // Nombre del componente que se quiere mostrar

  @ViewChild('dynamicContainer', { read: ViewContainerRef, static: true })
  dynamicContainer!: ViewContainerRef;

  private componentsMap: Record<string, Type<any>> = {
    login: LoginComponent,
    welcome: WelcomeComponent,
    settings: SettingsComponent,
    documentation: DocumentationComponent,
    components: ComponentsComponent,
    layout: LayoutComponent,
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['componentName']) {
      this.loadComponent();
    }
  }

  private loadComponent() {
    this.dynamicContainer.clear();
    const componentType = this.componentsMap[this.componentName.toLowerCase()];
    if (!componentType) {
      const message = document.createElement('p');
      message.textContent = `Componente "${this.componentName}" no encontrado`;
      this.dynamicContainer.element.nativeElement.appendChild(message);
      return;
    }
    this.dynamicContainer.createComponent(componentType);
  }
}
