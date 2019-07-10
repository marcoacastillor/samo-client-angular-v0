import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigatorComponent } from './navigator/navigator.component';
import { HeaderComponent } from './navigator/header/header.component';
import { MainComponent } from './navigator/main/main.component';
import { FooterComponent } from './navigator/footer/footer.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { InfoSystemComponent } from './navigator/info-system/info-system.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { AuthenticationService } from '../shared/services/authentication.service';
import { MenuLeftComponent } from './navigator/menu-lef/menu-left.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    MaterialModule
  ],
  declarations: [NavigatorComponent, HeaderComponent, MainComponent, FooterComponent, InfoSystemComponent, MenuLeftComponent],
  exports: [NavigatorComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    AuthenticationService
  ]
})
export class CoreModule { }
