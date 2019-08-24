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
import { UserService } from './user.service';
import { switchMap } from 'rxjs/operators';
var ProductService = /** @class */ (function () {
    function ProductService(http, userService) {
        this.http = http;
        this.userService = userService;
        this._url = environment.url_products;
    }
    ProductService.prototype.getAll$ = function () {
        var _this = this;
        return this.userService.validateOptionByToken('Product:getAll').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(_this._url);
            }
        }));
    };
    ProductService.prototype.getValueStock$ = function () {
        var _this = this;
        var url = this._url + '/get-value-stock';
        return this.userService.validateOptionByToken('Product:getValueStock').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    ProductService.prototype.show$ = function (id_product) {
        var _this = this;
        var url = this._url + '/' + id_product;
        return this.userService.validateOptionByToken('Product:show').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    ProductService.prototype.update$ = function (product) {
        var _this = this;
        return this.userService.validateOptionByToken('Product:update').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.put(_this._url, product);
            }
        }));
    };
    ProductService.prototype.delete$ = function (id) {
        var _this = this;
        var url = this._url + '/' + id;
        return this.userService.validateOptionByToken('Product:delete').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.delete(url);
            }
        }));
    };
    ProductService.prototype.getTopSoldProducts$ = function (from_date, to_date) {
        var _this = this;
        var url = this._url + '/get-top-sold-products/' + from_date + '/' + to_date;
        return this.userService.validateOptionByToken('Product:getTopSoldProducts').pipe(switchMap(function (validate) {
            if (validate) {
                //return this.http.post<any>(url,report);
                return _this.http.get(url);
            }
        }));
    };
    ProductService.prototype.searchByFilter$ = function (product) {
        var _this = this;
        var url = this._url + '/get-by-filter';
        return this.userService.validateOptionByToken('Product:getByFilter').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.post(url, product);
            }
        }));
    };
    ProductService.prototype.getByCode$ = function (code, type) {
        var _this = this;
        var url = this._url + '/get-by-code-and-type/' + code + '/' + type;
        return this.userService.validateOptionByToken('Product:getByCodeAndType').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    ProductService.prototype.getSalesProductsByCodeFilter$ = function (codeProduct) {
        var _this = this;
        var url = this._url + '/get-sales-products-by-code-filter/' + codeProduct;
        return this.userService.validateOptionByToken('Product:getSalesProductByCodeFilter').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    ProductService.prototype.getSalesProductsByNameFilter$ = function (nameProduct) {
        var _this = this;
        var url = this._url + '/get-sales-products-by-name-filter/' + nameProduct;
        return this.userService.validateOptionByToken('Product:getSalesProductByNameFilter').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    ProductService.prototype.getNotSalesProductsByNameFilter$ = function (nameProduct) {
        var _this = this;
        var url = this._url + '/get-not-sales-products-by-name-filter/' + nameProduct;
        return this.userService.validateOptionByToken('Product:getNotSalesProductsByNameFilter').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    ProductService.prototype.getByCodeFilterAndType$ = function (codeProduct) {
        var _this = this;
        var url = this._url + '/get-by-code-filter-and-type/' + codeProduct;
        return this.userService.validateOptionByToken('Product:getByCodeFilterAndType').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    ProductService.prototype.getByNameFilterAndType$ = function (nameProduct) {
        var _this = this;
        var url = this._url + '/get-by-name-filter-and-type/' + nameProduct;
        return this.userService.validateOptionByToken('Product:getByNameFilterAndType').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    /**
     *
     */
    ProductService.prototype.getByCodeFilterAndTypeINProduction$ = function (codeProduct) {
        var _this = this;
        var url = this._url + '/get-by-code-filter-and-type-inproduction/' + codeProduct;
        return this.userService.validateOptionByToken('Product:getByCodeFilterAndTypeINProduction').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    ProductService.prototype.getByNameFilterAndTypeINProduction$ = function (nameProduct) {
        var _this = this;
        var url = this._url + '/get-by-name-filter-and-type-inproduction/' + nameProduct;
        return this.userService.validateOptionByToken('Product:getByNameFilterAndTypeINProduction').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    ProductService.prototype.store$ = function (product) {
        var _this = this;
        return this.userService.validateOptionByToken('Product:create').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.post(_this._url, product);
            }
        }));
    };
    ProductService.prototype.getByType$ = function (type) {
        var _this = this;
        var url = this._url + '/get-by-type/' + type;
        return this.userService.validateOptionByToken('Product:getByType').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    /**
     * Obtiene productos por empresa
     */
    ProductService.prototype.getAllByEnterprise$ = function (id_enterprise) {
        var _this = this;
        var url = this._url + '/get-all-by-enterprise/' + id_enterprise.toString();
        return this.userService.validateOptionByToken('Product:getAllByEnterprise').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    ProductService.prototype.getByCodeFilterAndEnterprise$ = function (code, id) {
        var _this = this;
        var url = this._url + '/get-all-by-codeFilter-and-enterprise/' + code + '/' + id.toString();
        return this.userService.validateOptionByToken('Product:getAllByCodeFilterAndEnterprise').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    ProductService.prototype.getByNameFilterAndEnterprise$ = function (code, id) {
        var _this = this;
        var url = this._url + '/get-all-by-nameFilter-and-enterprise/' + code + '/' + id.toString();
        return this.userService.validateOptionByToken('Product:getAllByNameFilterAndEnterprise').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    ProductService.prototype.getByReferenceFilterAndEnterprise$ = function (code, id) {
        var _this = this;
        var url = this._url + '/get-all-by-referenceFilter-and-enterprise/' + code + '/' + id.toString();
        return this.userService.validateOptionByToken('Product:getAllbyReferenceFilterAndEnterprise').pipe(switchMap(function (validate) {
            if (validate) {
                return _this.http.get(url);
            }
        }));
    };
    ProductService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient,
            UserService])
    ], ProductService);
    return ProductService;
}());
export { ProductService };
//# sourceMappingURL=product.service.js.map