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
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
var PersonService = /** @class */ (function () {
    function PersonService(http, userService) {
        this.http = http;
        this.userService = userService;
        this._url = environment.url_person;
    }
    PersonService.prototype.index$ = function () {
        var _this = this;
        return this.userService.validateOptionByToken('Person:getAll').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(_this._url);
            }
        }));
    };
    PersonService.prototype.getEmployeesByEnterprise$ = function (id_enterprise) {
        var _this = this;
        var url = this._url + '/get-employees-by-enterprise-list/' + id_enterprise;
        return this.userService.validateOptionByToken('Person:getEmployeeByEnterpriseList').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    PersonService.prototype.getActiveEmployeesByEnterprise$ = function (id_enterprise) {
        var _this = this;
        var url = this._url + '/get-active-employee-by-enterprise/' + id_enterprise;
        return this.userService.validateOptionByToken('Person:getActiveEmployeeByEnterprise').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    PersonService.prototype.showByExternalReference$ = function (externalReference) {
        var _this = this;
        var url = this._url + '/show-external-reference/' + externalReference;
        return this.userService.validateOptionByToken('Person:getByExternalRererence').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    PersonService.prototype.createPerson$ = function (person) {
        var _this = this;
        var url = this._url + '/create-person';
        return this.userService.validateOptionByToken('Person:createPerson').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.post(url, person);
            }
        }));
    };
    PersonService.prototype.createEmployee$ = function (person) {
        var _this = this;
        var url = this._url + '/create-employee';
        return this.userService.validateOptionByToken('Person:createEmployee').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.post(url, person);
            }
        }));
    };
    PersonService.prototype.updateClient$ = function (person) {
        var _this = this;
        var url = this._url + '/update-client';
        return this.userService.validateOptionByToken('Person:udateClient').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.put(url, person);
            }
        }));
    };
    PersonService.prototype.updateEmployee$ = function (person) {
        var _this = this;
        var url = this._url + '/update-employee';
        return this.userService.validateOptionByToken('Person:updateEmployee').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.put(url, person);
            }
        }));
    };
    PersonService.prototype.show$ = function (id) {
        var _this = this;
        var url = this._url + '/' + id;
        return this.userService.validateOptionByToken('Person:show').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    PersonService.prototype.showLogin$ = function (id) {
        var url = this._url + '/show-login/' + id;
        return this.http.get(url);
    };
    PersonService.prototype.getByTypeAndNumberId$ = function (type, id) {
        var _this = this;
        var url = this._url + '/get-by-type-and-number-id/' + type + '/' + id;
        return this.userService.validateOptionByToken('Person:getByTypeIdAndNumber').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    PersonService.prototype.getEmployeesByEnterpriseRs$ = function (id_enterprise) {
        var _this = this;
        var url = this._url + '/get-employees-by-enterprise/' + id_enterprise.toString();
        return this.userService.validateOptionByToken('Person:getEmployeeByEnterprise').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    PersonService.prototype.getClientsByEnterprise$ = function (id_enterprise) {
        var _this = this;
        var url = this._url + '/get-clients-by-enterprise/' + id_enterprise.toString();
        return this.userService.validateOptionByToken('Person:getClientsByEnterprise').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    PersonService.prototype.searchEmployeeByFilter$ = function (filter, id_enterprise) {
        var _this = this;
        var url = this._url + '/get-employee-by-filter-and-enterprise/' + filter + '/' + id_enterprise;
        return this.userService.validateOptionByToken('Person:getEmployeeByFilterAndEnterprise').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    PersonService.prototype.searchClientsByFilter$ = function (filter, id_enterprise) {
        var _this = this;
        var url = this._url + '/get-client-by-filter-and-enterprise/' + filter + '/' + id_enterprise;
        return this.userService.validateOptionByToken('Person:getClientByFilterAndEnterprise').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    PersonService.prototype.inactivate$ = function (id) {
        var _this = this;
        var url = this._url + '/inactivate-employee/' + id.toString();
        return this.userService.validateOptionByToken('Person:inactiveEmployee').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    PersonService.prototype.getPersonsByIdFilter$ = function (id_client) {
        var _this = this;
        var url = this._url + '/get-persons-by-id-filter/' + id_client.toString();
        return this.userService.validateOptionByToken('Person:getPersionsByIdFilter').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    PersonService.prototype.getPersonsByNamesFilter$ = function (names_client) {
        var _this = this;
        var url = this._url + '/get-persons-by-names-filter/' + names_client.toString();
        return this.userService.validateOptionByToken('Person:getPersonsByNameFilter').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    PersonService.prototype.getLaboralInfoByPerson$ = function (id_person) {
        var _this = this;
        var url = this._url + '/get-laboral-info-by-person/' + id_person.toString();
        return this.userService.validateOptionByToken('Person:getLaboralInfoByPerson').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    PersonService.prototype.deleteLaboralInfo$ = function (id) {
        var _this = this;
        var url = this._url + '/delete-laboral-info-of-person/' + id.toString();
        return this.userService.validateOptionByToken('Person:deleteLaboralInfoByPerson').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.delete(url);
            }
        }));
    };
    PersonService.prototype.deleteClient$ = function (id) {
        var _this = this;
        var url = this._url + '/delete-client/' + id.toString();
        return this.userService.validateOptionByToken('Person:deleteClient').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.delete(url);
            }
        }));
    };
    PersonService.prototype.update$ = function (person) {
        var _this = this;
        return this.userService.validateOptionByToken('Person:update').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.put(_this._url, person);
            }
        }));
    };
    PersonService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient,
            UserService])
    ], PersonService);
    return PersonService;
}());
export { PersonService };
//# sourceMappingURL=person.service.js.map