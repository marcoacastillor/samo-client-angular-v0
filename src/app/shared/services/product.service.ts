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
    return this.userService.validateOptionByToken('Product:getAll').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Results>(this._url);
        }
      })
    );
  }

  public getValueStock$(): Observable<any> {
    const url = this._url + '/get-value-stock';
    return this.userService.validateOptionByToken('Product:getValueStock').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<any>(url);
        }
      })
    );
  }

  public show$(id_product: number): Observable<Product> {
    const url = this._url + '/' + id_product;
    return this.userService.validateOptionByToken('Product:show').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Product>(url);
        }
      })
    );
  }

  public update$(product: Product): Observable<Product> {
    return this.userService.validateOptionByToken('Product:update').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.put<Product>(this._url, product);
        }
      })
    );
  }

  public delete$(id: number): Observable<Product> {
    let url = this._url + '/' + id;
    return this.userService.validateOptionByToken('Product:delete').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.delete<Product>(url);
        }
      })
    );
  }

  public getTopSoldProducts$(from_date: string, to_date: string): Observable<any> {
    let url = this._url + '/get-top-sold-products/'+from_date+'/'+to_date;
    return this.userService.validateOptionByToken('Product:getTopSoldProducts').pipe(
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
    return this.userService.validateOptionByToken('Product:getByFilter').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<Results>(url,product);
        }
      })
    );
  }

  public getByCode$(code: string,type:string): Observable<Product> {
    let url = this._url + '/get-by-code-and-type/' + code+'/'+type;
    return this.userService.validateOptionByToken('Product:getByCodeAndType').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Product>(url);
        }
      })
    );
  }

  public getSalesProductsByCodeFilter$(codeProduct: string): Observable<Product[]> {
    let url = this._url + '/get-sales-products-by-code-filter/' + codeProduct;
    return this.userService.validateOptionByToken('Product:getSalesProductByCodeFilter').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Product[]>(url);
        }
      })
    );
  }

  public getSalesProductsByNameFilter$(nameProduct: string): Observable<Product[]> {
    let url = this._url + '/get-sales-products-by-name-filter/' + nameProduct;
    return this.userService.validateOptionByToken('Product:getSalesProductByNameFilter').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Product[]>(url);
        }
      })
    );
  }

  public getNotSalesProductsByNameFilter$(nameProduct: string): Observable<Product[]> {
    let url = this._url + '/get-not-sales-products-by-name-filter/' + nameProduct;
    return this.userService.validateOptionByToken('Product:getNotSalesProductsByNameFilter').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Product[]>(url);
        }
      })
    );
  }

  public getPaymentsProductsByNameFilter$(nameProduct: string): Observable<Product[]> {
    let url = this._url + '/get-payments-products-by-name-filter/' + nameProduct;
    return this.userService.validateOptionByToken('Product:getPaymentsProductsByNameFilter').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Product[]>(url);
        }
      })
    );
  }


  

  public getByCodeFilterAndType$(codeProduct: string): Observable<Product[]> {
    let url = this._url + '/get-by-code-filter-and-type/' + codeProduct;
    return this.userService.validateOptionByToken('Product:getByCodeFilterAndType').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Product[]>(url);
        }
      })
    );
  }

  public getByNameFilterAndType$(nameProduct: string): Observable<Product[]> {
    let url = this._url + '/get-by-name-filter-and-type/' + nameProduct;
    return this.userService.validateOptionByToken('Product:getByNameFilterAndType').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Product[]>(url);
        }
      })
    );
  }

  /**
   * 
   */
  public getByCodeFilterAndTypeINProduction$(codeProduct: string): Observable<Product[]> {
    let url = this._url + '/get-by-code-filter-and-type-inproduction/' + codeProduct;
    return this.userService.validateOptionByToken('Product:getByCodeFilterAndTypeINProduction').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Product[]>(url);
        }
      })
    );
  }

  public getByNameFilterAndTypeINProduction$(nameProduct: string): Observable<Product[]> {
    let url = this._url + '/get-by-name-filter-and-type-inproduction/' + nameProduct;
    return this.userService.validateOptionByToken('Product:getByNameFilterAndTypeINProduction').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Product[]>(url);
        }
      })
    );
  }

  public store$(product: Product): Observable<Product> {
    return this.userService.validateOptionByToken('Product:create').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<Product>(this._url, product);
        }
      })
    );
  }

  public getByType$(type: string): Observable<Product[]> {
    let url = this._url + '/get-by-type/' + type;
    return this.userService.validateOptionByToken('Product:getByType').pipe(
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
    return this.userService.validateOptionByToken('Product:getAllByEnterprise').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Product[]>(url);
        }
      })
    );
  }

  public getByCodeFilterAndEnterprise$(code:string, id:number):Observable<Product[]> {
    let url = this._url + '/get-all-by-codeFilter-and-enterprise/' + code + '/' + id.toString();
    return this.userService.validateOptionByToken('Product:getAllByCodeFilterAndEnterprise').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Product[]>(url);
        }
      })
    );
  }

  public getByNameFilterAndEnterprise$(code:string, id:number):Observable<Product[]> {
    let url = this._url + '/get-all-by-nameFilter-and-enterprise/' + code + '/' + id.toString();
    return this.userService.validateOptionByToken('Product:getAllByNameFilterAndEnterprise').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Product[]>(url);
        }
      })
    );
  }

  public getByReferenceFilterAndEnterprise$(code:string, id:number):Observable<Product[]> {
    let url = this._url + '/get-all-by-referenceFilter-and-enterprise/' + code + '/' + id.toString();
    return this.userService.validateOptionByToken('Product:getAllbyReferenceFilterAndEnterprise').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Product[]>(url);
        }
      })
    );
  }
}
