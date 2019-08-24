var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsRoutingModule } from './clients-routing.module';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientShowComponent } from './client-show/client-show.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { PersonService } from 'src/app/shared/services/person.service';
import { OperationService } from 'src/app/shared/services/operation.service';
import { ClientFormComponent } from './client-form/client-form.component';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { PreferenceClientService } from 'src/app/shared/services/preference-client.service';
var ClientsModule = /** @class */ (function () {
    function ClientsModule() {
    }
    ClientsModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                ClientsRoutingModule,
                SharedModule,
                FontAwesomeModule,
                OwlDateTimeModule,
                OwlNativeDateTimeModule,
            ],
            providers: [
                PersonService, OperationService, ParameterService, PreferenceClientService
            ],
            declarations: [ClientListComponent, ClientShowComponent, ClientFormComponent]
        })
    ], ClientsModule);
    return ClientsModule;
}());
export { ClientsModule };
//# sourceMappingURL=clients.module.js.map