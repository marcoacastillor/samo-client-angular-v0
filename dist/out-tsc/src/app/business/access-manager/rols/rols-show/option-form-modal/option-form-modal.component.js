var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faArrowAltCircleRight, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { OptionService } from 'src/app/shared/services/option.service';
import { OptionRolService } from 'src/app/shared/services/option-rol.service';
import { tap } from 'rxjs/operators';
var OptionFormModalComponent = /** @class */ (function () {
    function OptionFormModalComponent(optionService, optionRolService) {
        this.optionService = optionService;
        this.optionRolService = optionRolService;
        this.faArrowAltCircleRight = faArrowAltCircleRight;
        this.faArrowAltCircleLeft = faArrowAltCircleLeft;
        this.refresh = new EventEmitter();
        this.lstOptions = [];
        this.lstSelectedOptions = [];
    }
    OptionFormModalComponent.prototype.ngOnInit = function () {
    };
    OptionFormModalComponent.prototype.ngOnChanges = function (changes) {
        if (changes.lstAllObjects) {
            if (changes.lstAllObjects.currentValue != changes.lstAllObjects.previousValue) {
                this.lstAllObjects = changes.lstAllObjects.currentValue;
                this.lstSelectedOptions = [];
            }
        }
    };
    OptionFormModalComponent.prototype.loadActionsByBusinessObject = function (business_object) {
        var _this = this;
        if (business_object != '') {
            this.optionService.getOptionsByBusinessObjectAndRol$(business_object, this.pk_id_rol).pipe(tap(function (lst_options) { return _this.lstSelectedOptions = lst_options; })).subscribe();
            this.optionService.getNotOptionsByBusinessObjectAndRol$(business_object, this.pk_id_rol).pipe(tap(function (lst_options) { return _this.lstOptions = lst_options; })).subscribe();
        }
    };
    OptionFormModalComponent.prototype.addOption = function (option) {
        var _this = this;
        this.optionRolService.create$(option.pk_id_option, this.pk_id_rol).subscribe(function () {
            _this.loadActionsByBusinessObject(option.business_object);
            _this.refresh.emit(_this.pk_id_rol);
        });
    };
    OptionFormModalComponent.prototype.delOption = function (id, business_object) {
        var _this = this;
        this.optionRolService.delete$(id).subscribe(function () {
            _this.loadActionsByBusinessObject(business_object);
            _this.refresh.emit(_this.pk_id_rol);
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], OptionFormModalComponent.prototype, "lstAllObjects", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], OptionFormModalComponent.prototype, "pk_id_rol", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], OptionFormModalComponent.prototype, "refresh", void 0);
    OptionFormModalComponent = __decorate([
        Component({
            selector: 'app-option-form-modal',
            templateUrl: 'option-form-modal.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [OptionService,
            OptionRolService])
    ], OptionFormModalComponent);
    return OptionFormModalComponent;
}());
export { OptionFormModalComponent };
//# sourceMappingURL=option-form-modal.component.js.map