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
import { faPlusCircle, faEye, faEdit, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Option } from 'src/app/shared/models/option';
import { OptionService } from 'src/app/shared/services/option.service';
var OptionsListComponent = /** @class */ (function () {
    function OptionsListComponent(optionService) {
        this.optionService = optionService;
        this.faPlusCircle = faPlusCircle;
        this.faEye = faEye;
        this.faEdit = faEdit;
        this.faTrash = faTrash;
        this.faSearch = faSearch;
        this.lstOptions = [];
        this.selectedOption = new Option;
        this.success = false;
        this.message = '';
        this.lastkeydown1 = 0;
    }
    OptionsListComponent.prototype.ngOnInit = function () {
        this.loadAllOptions();
    };
    OptionsListComponent.prototype.loadAllOptions = function () {
        var _this = this;
        this.optionService.getAll$().subscribe(function (options) { return _this.lstOptions = options; });
    };
    OptionsListComponent.prototype.onFindByBusinessObject = function (filter) {
        var _this = this;
        var businessObject = document.getElementById('businessObject').value;
        this.lstOptions = [];
        if (businessObject.length > 0) {
            if (filter.timeStamp - this.lastkeydown1 > 200) {
                this.optionService.getByBusinessObject$(businessObject).subscribe(function (lst_options) {
                    _this.lstOptions = lst_options;
                });
            }
        }
    };
    OptionsListComponent.prototype.onFindByAction = function (filter) {
        var _this = this;
        var action = document.getElementById('action').value;
        this.lstOptions = [];
        if (action.length > 0) {
            if (filter.timeStamp - this.lastkeydown1 > 200) {
                this.optionService.getByAction$(action).subscribe(function (lst_options) {
                    _this.lstOptions = lst_options;
                });
            }
        }
    };
    OptionsListComponent.prototype.newOption = function () {
        this.selectedOption = new Option;
    };
    OptionsListComponent.prototype.selectOption = function (option) {
        this.selectedOption = option;
    };
    OptionsListComponent.prototype.deleteOption = function () {
        var _this = this;
        this.optionService.delete$(this.selectedOption.pk_id_option).subscribe(function () {
            _this.loadAllOptions();
            _this.success = true;
            _this.message = 'Se elimina registro satisfactoriamente.';
        });
    };
    OptionsListComponent.prototype.onCreate = function (option) {
        var _this = this;
        this.optionService.store$(option).subscribe(function () {
            _this.loadAllOptions();
            _this.success = true;
            _this.message = 'Se crea registro satisfactoriamente.';
        });
    };
    OptionsListComponent.prototype.onUpdate = function (option) {
        var _this = this;
        this.optionService.update$(option).subscribe(function () {
            _this.loadAllOptions();
            _this.success = true;
            _this.message = 'Se actualiza registro satisfactoriamente.';
        });
    };
    OptionsListComponent = __decorate([
        Component({
            selector: 'app-options-list',
            templateUrl: 'options-list.component.html',
            styles: []
        }),
        __metadata("design:paramtypes", [OptionService])
    ], OptionsListComponent);
    return OptionsListComponent;
}());
export { OptionsListComponent };
//# sourceMappingURL=options-list.component.js.map