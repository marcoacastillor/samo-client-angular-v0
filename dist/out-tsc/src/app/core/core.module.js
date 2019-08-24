var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigatorComponent } from './navigator/navigator.component';
import { MainComponent } from './navigator/main/main.component';
import { FooterComponent } from './navigator/footer/footer.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { AuthenticationService } from '../shared/services/authentication.service';
import { MenuLeftComponent } from './navigator/menu-lef/menu-left.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
var CoreModule = /** @class */ (function () {
    function CoreModule() {
    }
    CoreModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                HttpClientModule,
                RouterModule,
                FontAwesomeModule,
                MaterialModule
            ],
            declarations: [NavigatorComponent, MainComponent, FooterComponent, MenuLeftComponent],
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
    ], CoreModule);
    return CoreModule;
}());
export { CoreModule };
//# sourceMappingURL=core.module.js.map