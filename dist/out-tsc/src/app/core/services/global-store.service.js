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
import { BehaviorSubject, timer } from 'rxjs';
import { User } from '../../shared/models/user';
import { CacheService } from './cache.service';
import { environment } from '../../../environments/environment';
var GlobalStoreService = /** @class */ (function () {
    function GlobalStoreService(cache) {
        var _this = this;
        this.cache = cache;
        this.clearMessageDelayMs = environment.clearMessageDelayMs;
        this.state = { code: null, desc: null, serverDesc: 'Exitoso' };
        this.userMessage$ = new BehaviorSubject(this.state);
        this.user$ = new BehaviorSubject(new User());
        this.selectUserMessage$ = function () { return _this.userMessage$.asObservable(); };
        this.getUser$ = function () { return _this.user$.asObservable(); };
        this.setUser = function (user) {
            _this.cache.set('user', user);
            _this.user$.next(user);
        };
        this.clearSession = function () {
            _this.cache.clear();
            _this.user$.next(new User);
        };
        this.getUser = function () { return _this.cache.get('user'); };
        this.dispatchUserMessage = function (code, userMessage) {
            _this.state.code = code;
            _this.state.desc = userMessage;
            _this.userMessage$.next(_this.state);
            var subs = timer(_this.clearMessageDelayMs).subscribe(function () {
                _this.state.code = null;
                _this.state.desc = '';
                _this.userMessage$.next(_this.state);
                subs.unsubscribe();
            });
        };
    }
    GlobalStoreService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [CacheService])
    ], GlobalStoreService);
    return GlobalStoreService;
}());
export { GlobalStoreService };
//# sourceMappingURL=global-store.service.js.map