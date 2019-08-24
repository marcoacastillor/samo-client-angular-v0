var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { GlobalStoreService } from './global-store.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
var AuthInterceptorService = /** @class */ (function () {
    function AuthInterceptorService(globalStoreService) {
        var _this = this;
        this.globalStoreService = globalStoreService;
        this.handleError = function (err) {
            // let userMessage = 'Fatal error';
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    _this.globalStoreService.dispatchUserMessage(err.status.toString(), err.error.error);
                }
                else {
                    _this.globalStoreService.dispatchUserMessage(err.status.toString(), err.error.error);
                }
            }
        };
        this.globalStoreService.getUser$().subscribe(function (user) { return (_this.user = user); });
    }
    AuthInterceptorService.prototype.intercept = function (req, next) {
        var headers = new HttpHeaders({
            'Authorization': this.user.api_token + ':' + this.user.fk_id_enterprise,
            'Content-Type': 'application/json'
        });
        var cloneRq = req.clone({ headers: headers });
        return next.handle(cloneRq).pipe(tap(null, this.handleError));
    };
    AuthInterceptorService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [GlobalStoreService])
    ], AuthInterceptorService);
    return AuthInterceptorService;
}());
export { AuthInterceptorService };
//# sourceMappingURL=auth-interceptor.service.js.map