import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Results } from '../models/results';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _url = environment.url_products;
  constructor(
    private http: HttpClient,
    private userService: UserService
    ) {
  }

  public getAll$(): Observable<Results> {
    return this.userService.validateOptionByToken('PRD_LIST').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Results>(this._url);
        }
      })
    );
  }

  public getValueStock$(): Observable<any> {
    const url = this._url + '/get-value-stock';
    return this.userService.validateOptionByToken('PRD_GET_VALUE_STOCK').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<any>(url);
        }
      })
    );
  }

  public show$(id_product: number): Observable<Product> {
    const url = this._url + '/' + id_product;
    return this.userService.validateOptionByToken('PRD_SHOW').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Product>(url);
        }
      })
    );
  }

  public update$(product: Product): Observable<Product> {
    return this.userService.validateOptionByToken('PRD_UPD').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.put<Product>(this._url, product);
        }
      })
    );
  }

  public delete$(id: number): Observable<Product> {
    let url = this._url + '/' + id;
    return this.userService.validateOptionByToken('PRD_DEL').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.delete<Product>(url);
        }
      })
    );
  }

  public getTopSoldProducts$(from_date: string, to_date: string): Observable<any> {
    let url = this._url + '/get-top-sold-products/'+from_date+'/'+to_date;
    return this.userService.validateOptionByToken('PRD_REPORT_TOP_SOLD_PRODUCTS').pipe(
      switchMap(validate => {
        if(validate){
          //return this.http.post<any>(url,report);
          return this.http.get<any>(url);
        }
      })
    );
  }

  public searchByFilter$(product: Product): Observable<Results> {
    let url = this._url + '/get-by-filter';
    return this.userService.validateOptionByToken('PRD_GET_BY_FILTER').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<Results>(url,product);
        }
      })
    );
  }

  public getByCode$(code: string,type:string): Observable<Product> {
    let url = this._url + '/get-by-code-and-type/' + code+'/'+type;
    return this.userService.validateOptionByToken('PRD_GET_BY_CODE_AND_TYPE').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Product>(url);
        }
      })
    );
  }

  public getSalesProductsByCodeFilter$(codeProduct: string): Observable<Product[]> {
    let url = this._url + '/get-sales-products-by-code-filter/' + codeProduct;
    return this.userService.validateOptionByToken('PRD_GET_SALES_PRODUCTS_BY_CODEFILTER').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Product[]>(url);
        }
      })
    );
  }

  public getSalesProductsByNameFilter$(nameProduct: string): Observable<Product[]> {
    let url = this._url + '/get-sales-products-by-name-filter/' + nameProduct;
    return this.userService.validateOptionByToken('PRD_GET_SALES_PRODUCTS_BY_NAMEFILTER').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Product[]>(url);
        }
      })
    );
  }

  public getNotSalesProductsByNameFilter$(nameProduct: string): Observable<Product[]> {
    let url = this._url + '/get-not-sales-products-by-name-filter/' + nameProduct;
    return this.userService.validateOptionByToken('PRD_GET_NOT_SALES_PRODUCTS_BY_NAMEFILTER').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Product[]>(url);
        }
      })
    );
  }

  public getByCodeFilterAndType$(codeProduct: string): Observable<Product[]> {
    let url = this._url + '/get-by-code-filter-and-type/' + codeProduct;
    return this.userService.validateOptionByToken('PRD_GET_BY_CODEFILTER_AND_TYPE').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Product[]>(url);
        }
      })
    );
  }

  public getByNameFilterAndType$(nameProduct: string): Observable<Product[]> {
    let url = this._url + '/get-by-name-filter-and-type/' + nameProduct;
    return this.userService.validateOptionByToken('PRD_GET_BY_NAMEFILTER_AND_TYPE').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Product[]>(url);
        }
      })
    );
  }

  public store$(product: Product): Observable<Product> {
    return this.userService.validateOptionByToken('PRD_CRT').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<Product>(this._url, product);
        }
      })
    );
  }

  public getByType$(type: string): Observable<Product[]> {
    let url = this._url + '/get-by-type/' + type;
    return this.userService.validateOptionByToken('PRD_GET_BY_TYPE').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Product[]>(url);
        }
      })
    );
  }

  /**
   * Obtiene productos por empresa
   */
  public getAllByEnterprise$(id_enterprise: number):Observable<Product[]> {
    let url = this._url + '/get-all-by-enterprise/' + id_enterprise.toString();
    return this.userService.validateOptionByToken('PRD_GET_ALL_BY_ENTERPRISE').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Product[]>(url);
        }
      })
    );
  }

  public getByCodeFilterAndEnterprise$(code:string, id:number):Observable<Product[]> {
    let url = this._url + '/get-all-by-codeFilter-and-enterprise/' + code + '/' + id.toString();
    return this.userService.validateOptionByToken('PRD_GET_ALL_BY_CODEFILTER_AND_ENTERPRISE').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Product[]>(url);
        }
      })
    );
  }

  public getByNameFilterAndEnterprise$(code:string, id:number):Observable<Product[]> {
    let url = this._url + '/get-all-by-nameFilter-and-enterprise/' + code + '/' + id.toString();
    return this.userService.validateOptionByToken('PRD_GET_ALL_BY_NAMEFILTER_AND_ENTERPRISE').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Product[]>(url);
        }
      })
    );
  }

  public getByReferenceFilterAndEnterprise$(code:string, id:number):Observable<Product[]> {
    let url = this._url + '/get-all-by-referenceFilter-and-enterprise/' + code + '/' + id.toString();
    return this.userService.validateOptionByToken('PRD_GET_ALL_BY_REFERENCEFILTER_AND_ENTERPRISE').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Product[]>(url);
        }
      })
    );
  }
}
