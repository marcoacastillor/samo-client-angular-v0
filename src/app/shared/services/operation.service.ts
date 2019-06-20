import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { Operation } from '../models/operation';
import { switchMap } from 'rxjs/operators';
import { Purchase } from '../models/purchase';
import { Results } from '../models/results';

@Injectable({
  providedIn: 'root'
})
export class OperationService {
  private _url = environment.url_operation;
  constructor(
    private http: HttpClient,
    private userService: UserService
    ) {
  }

  public getByType$(type: string): Observable<Results> {
    let url = this._url + '/get-by-type/' + type;
    return this.userService.validateOptionByToken('OPE_LIST_OPERATIONS').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Results>(url);
        }
      })
    );
  }

  public getConsolidateByDates$(fromDate: string, toDate: string, type_operation: string): Observable<Operation[]> {
    let url = this._url + '/get-consolidate-operations-by-dates/'+fromDate+'/'+toDate+'/'+type_operation;
    return this.userService.validateOptionByToken('OPE_GET_CONSOLIDATE_BY_DATES').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Operation[]>(url);
        }
      })
    );
  }

  public getListByProduct$(id: number,fromDate: string,toDate: string): Observable<Operation[]> {
    let url = this._url + '/get-list-by-products/'+id.toString()+'/'+fromDate+'/'+toDate;
    return this.userService.validateOptionByToken('OPE_GET_OPERATIONS_BY_PRODUCT').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Operation[]>(url);
        }
      })
    );
  }

  public searchByFilter$(filter: string, type: string): Observable<Results> {
    let url = this._url + '/get-by-filter/' + filter + '/' + type;
    return this.userService.validateOptionByToken('OPE_GET_BY_FILTER').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Results>(url);
        }
      })
    );
  }

  public store_purchase$(purchase: Purchase): Observable<Purchase> {
    let url = this._url + '/create-purchase';
    return this.userService.validateOptionByToken('OPE_PURCHASE_CRT').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<Purchase>(url, purchase);
        }
      })
    );
  }

  public store_sale$(operation: Operation): Observable<Operation> {
    let url = this._url + '/create-sale';
    return this.userService.validateOptionByToken('OPE_SALE_CRT').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<Operation>(url, operation);
        }
      })
    );
  }

  public show_purchase$(id_purchase: number): Observable<Purchase> {
    const url = this._url + '/' + id_purchase;
    return this.userService.validateOptionByToken('OPE_OPERATION_SHOW').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Purchase>(url);
        }
      })
    );
  }
}