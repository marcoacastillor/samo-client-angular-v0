import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { Operation } from '../models/operation';
import { switchMap } from 'rxjs/operators';
import { Purchase } from '../models/purchase';
import { Results } from '../models/results';
import { StatusMessage } from '../models/status-message';
import { AbstractStock } from '../models/abstract-stock';
import { ConsolidateOperation } from '../models/consolidate-operation';

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

  public getAllByTypeAndEnterprise$(type: string, id_enterprise: number): Observable<Operation[]> {
    let url = this._url + '/get-by-type-and-enterprise/' + type + '/' + id_enterprise;
    return this.userService.validateOptionByToken('OPE_LIST_BY_TYPE_AND_ENTERPRISE').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Operation[]>(url);
        }
      })
    );
  }

  public getConsolidateByDates$(fromDate: string, toDate: string, type_operation: string): Observable<ConsolidateOperation> {
    let url = this._url + '/get-consolidate-operations-by-dates/'+fromDate+'/'+toDate+'/'+type_operation;
    return this.userService.validateOptionByToken('OPE_GET_OPERATIONS_BY_DATES').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<ConsolidateOperation>(url);
        }
      })
    );
  }

  public getListByProduct$(id: number,fromDate: string,toDate: string): Observable<AbstractStock> {
    let url = this._url + '/get-list-by-products/'+id.toString()+'/'+fromDate+'/'+toDate;
    return this.userService.validateOptionByToken('OPE_GET_OPERATIONS_BY_PRODUCT').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<AbstractStock>(url);
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

  public storeOperation$(operation: Operation): Observable<Operation> {
    let url = this._url + '/create-operation';
    return this.userService.validateOptionByToken('OPE_OPERATION_CRT').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<Operation>(url, operation);
        }
      })
    );
  }

  public updateOperation$(operation: Operation): Observable<Operation> {
    return this.userService.validateOptionByToken('OPE_OPERATION_UPD').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.put<Operation>(this._url, operation);
        }
      })
    );
  }

  public changeState$(id: number, state: string): Observable<Operation> {
    let url = this._url + '/change-state/' + id.toString() + '/' + state;
    return this.userService.validateOptionByToken('OPE_CHANGE_STATE').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Operation>(url);
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

  public store_purchase_file$(operation: Operation): Observable<StatusMessage[]> {
    let url = this._url + '/create-purchase-file';
    return this.userService.validateOptionByToken('OPE_PURCHASE_FILE_CRT').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<StatusMessage[]>(url, operation);
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

  public getDetailOperation$(id_operation: number): Observable<Operation> {
    const url = this._url + '/get-detail/' + id_operation;
    return this.userService.validateOptionByToken('OPE_OPERATION_GET_DETAIL').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Operation>(url);
        }
      })
    );
  }

  public getOperationByProvider$(id_enterprise: number): Observable<Operation[]> {
    const url = this._url + '/get-operation-by-provider/' + id_enterprise;
    return this.userService.validateOptionByToken('OPE_OPERATION_GET_BY_PROVIDER').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Operation[]>(url);
        }
      })
    );
  }

  public getOperationByClient$(id_person:number): Observable<Operation[]> {
    const url = this._url + '/get-operation-by-client/' + id_person;
    return this.userService.validateOptionByToken('OPE_OPERATION_GET_BY_CLIENT').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Operation[]>(url);
        }
      })
    );
  }
}
