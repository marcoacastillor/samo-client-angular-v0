var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { ActivatedRoute } from '@angular/router';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { faThList, faEye } from '@fortawesome/free-solid-svg-icons';
import { OperationService } from 'src/app/shared/services/operation.service';
import { tap } from 'rxjs/operators';
var ProviderShowComponent = /** @class */ (function () {
    function ProviderShowComponent(activateRoute, enterpriseService, operationService) {
        this.activateRoute = activateRoute;
        this.enterpriseService = enterpriseService;
        this.operationService = operationService;
        this.faEye = faEye;
        this.faThList = faThList;
        this.enterprise = new Enterprise;
        this.lstOperations = [];
        this.success = false;
        this.message = '';
    }
    ProviderShowComponent.prototype.ngOnInit = function () {
        this.id_enterprise = this.activateRoute.snapshot.params['id'];
        this.getInfo(this.id_enterprise);
    };
    ProviderShowComponent.prototype.getInfo = function (id) {
        var _this = this;
        this.enterpriseService.show$(id).pipe(tap(function (enterprise) { return _this.enterprise = enterprise; }), tap(function (enterprise) {
            _this.operationService.getOperationByProvider$(enterprise.pk_id_enterprise).subscribe(function (operations) { return _this.lstOperations = operations; });
        })).subscribe();
    };
    ProviderShowComponent = __decorate([
        Component({
            selector: 'app-provider-show',
            templateUrl: 'provider-show.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            EnterpriseService,
            OperationService])
    ], ProviderShowComponent);
    return ProviderShowComponent;
}());
export { ProviderShowComponent };
//# sourceMappingURL=provider-show.component.js.map