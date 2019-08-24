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
import { environment } from 'src/environments/environment';
var UtilsService = /** @class */ (function () {
    function UtilsService() {
    }
    /*
    * ------------------------------------------
    * Funciones visualización
    * ------------------------------------------
    */
    UtilsService.prototype.getClassNew = function (createFlag) {
        if (createFlag) {
            return 'visible col-sm-12';
        }
        else {
            return 'hidden';
        }
    };
    UtilsService.prototype.getClassList = function (listFlag) {
        if (listFlag) {
            return 'visible col-sm-12';
        }
        else {
            return 'hidden';
        }
    };
    UtilsService.prototype.getClassShow = function (showFlag) {
        if (showFlag) {
            return 'visible col-sm-12';
        }
        else {
            return 'hidden';
        }
    };
    UtilsService.prototype.getClassReport = function (showFlag) {
        if (showFlag) {
            return 'visible col-sm-12';
        }
        else {
            return 'hidden';
        }
    };
    UtilsService.prototype.getClassByUnits = function (units) {
        var valMin = environment.min_products;
        var valMedium = environment.medium_products;
        if (units < valMin) {
            return 'text-danger mb-2 mr-1';
        }
        if (units >= valMin && units <= valMedium) {
            return 'text-warning mb-2 mr-1';
        }
        if (units > valMedium) {
            return 'text-success mb-2 mr-1';
        }
    };
    UtilsService.prototype.getClassBySelectedComponent = function (condition) {
        if (condition) {
            return 'tab-pane fade active';
        }
        else {
            return 'tab-pane fade';
        }
    };
    UtilsService.prototype.getClassBySelected = function (condition) {
        if (condition === 'true') {
            return 'hidden';
        }
        else {
            return 'visible';
        }
    };
    UtilsService.prototype.getClassBySelectedObject = function (id_row, id_select) {
        if (id_row == id_select) {
            return 'bg-light text-white';
        }
        else {
            return 'bg-info text-white';
        }
    };
    UtilsService.prototype.getClassHeaderTable = function (condition) {
        if (condition == '0') {
            return 'myWidth font-weight-bold';
        }
        else {
            return 'myWidth';
        }
    };
    UtilsService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], UtilsService);
    return UtilsService;
}());
export { UtilsService };
//# sourceMappingURL=utils.service.js.map