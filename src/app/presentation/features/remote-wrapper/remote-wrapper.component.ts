import {
  Component,
  ViewChild,
  ViewContainerRef,
  Type,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

// Importamos todos los componentes
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
  imports: [CommonModule, HttpClientModule],
  template: `
    <div class="wrapper-container">
      <ng-container #dynamicContainer></ng-container>
    </div>
  `,
  styleUrls: ['./remote-wrapper.component.scss'],
  providers: [AuthService, AuthFacade],
})
export class RemoteWrapperComponent implements OnInit {
  private route = inject(ActivatedRoute);

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

  ngOnInit(): void {
    const componentName = this.route.snapshot.paramMap.get('componentName');
    if (componentName) {
      this.loadComponent(componentName);
    } else {
      this.showMessage('⚠️ No se especificó ningún componente remoto.');
    }
  }

  private loadComponent(name: string) {
    this.dynamicContainer.clear();
    const componentType = this.componentsMap[name.toLowerCase()];

    if (!componentType) {
      this.showMessage(`❌ Componente remoto "${name}" no encontrado`);
      return;
    }

    this.dynamicContainer.createComponent(componentType);
  }

  private showMessage(text: string) {
    const el = document.createElement('p');
    el.textContent = text;
    this.dynamicContainer.element.nativeElement.appendChild(el);
  }
}
