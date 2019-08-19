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
    return this.userService.validateOptionByToken('Operation:getByType').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Results>(url);
        }
      })
    );
  }

  public getAllByTypeAndEnterprise$(type: string, id_enterprise: number): Observable<Operation[]> {
    let url = this._url + '/get-by-type-and-enterprise/' + type + '/' + id_enterprise;
    return this.userService.validateOptionByToken('Operation:getByTypeAndEnterprise').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Operation[]>(url);
        }
      })
    );
  }

  public getConsolidateByDates$(fromDate: string, toDate: string, type_operation: string): Observable<ConsolidateOperation> {
    let url = this._url + '/get-consolidate-operations-by-dates/'+fromDate+'/'+toDate+'/'+type_operation;
    return this.userService.validateOptionByToken('Operation:getConsolidateByDates').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<ConsolidateOperation>(url);
        }
      })
    );
  }

  public getListByProduct$(id: number,fromDate: string,toDate: string): Observable<AbstractStock> {
    let url = this._url + '/get-list-by-products/'+id.toString()+'/'+fromDate+'/'+toDate;
    return this.userService.validateOptionByToken('Operation:getListByProduct').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<AbstractStock>(url);
        }
      })
    );
  }

  public searchByFilter$(filter: string, type: string): Observable<Results> {
    let url = this._url + '/get-by-filter/' + filter + '/' + type;
    return this.userService.validateOptionByToken('Operation:getByFilter').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Results>(url);
        }
      })
    );
  }

  public getByNameProviderAndTypeAndEnterprise$(nameProvider:string,type:string,id_enterprise:number): Observable<Operation[]> {
    let url = this._url + '/get-by-providername-and-type-and-enterprise/' + nameProvider + '/' + type + '/' + id_enterprise.toString() ;
    return this.userService.validateOptionByToken('Operation:getByProviderNameAndTypeAndEnterprise').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Operation[]>(url);
        }
      })
    );
  }

  public getByDateOperationAndTypeAndEnterprise$(date_operation:string,type:string,id_enterprise:number): Observable<Operation[]> {
    let url = this._url + '/get-by-date-and-type-and-enterprise/' + date_operation + '/' + type + '/' + id_enterprise.toString() ;
    return this.userService.validateOptionByToken('Operation:getByDateAndTypeAndEnterprise').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Operation[]>(url);
        }
      })
    );
  }

  public getByPaymentTypeAndTypeAndEnterprise$(payment_type:string,type:string,id_enterprise:number): Observable<Operation[]> {
    let url = this._url + '/get-by-paymenttype-and-type-and-enterprise/' + payment_type + '/' + type + '/' + id_enterprise.toString() ;
    return this.userService.validateOptionByToken('Operation:getByPaymentTypeAndTypeAndEnterprise').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Operation[]>(url);
        }
      })
    );
  }

  public getByNumberInvoiceTypeAndTypeAndEnterprise$(number_invoice:string,type:string,id_enterprise:number): Observable<Operation[]> {
    let url = this._url + '/get-by-numberinvoice-and-type-and-enterprise/' + number_invoice + '/' + type + '/' + id_enterprise.toString() ;
    return this.userService.validateOptionByToken('Operation:getByNumberInvoiceAndTypeAndEnterprise').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Operation[]>(url);
        }
      })
    );
  }



  

  public storeOperation$(operation: Operation): Observable<Operation> {
    let url = this._url + '/create-operation';
    return this.userService.validateOptionByToken('Operation:create').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<Operation>(url, operation);
        }
      })
    );
  }

  public updateOperation$(operation: Operation): Observable<Operation> {
    return this.userService.validateOptionByToken('Operation:update').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.put<Operation>(this._url, operation);
        }
      })
    );
  }

  public changeState$(id: number, state: string): Observable<Operation> {
    let url = this._url + '/change-state/' + id.toString() + '/' + state;
    return this.userService.validateOptionByToken('Operation:changeState').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Operation>(url);
        }
      })
    );
  }

  public getOperationPDF$(id_operation: number): Observable<string> {
    let url = this._url + '/get-pdf-small-operation/' + id_operation.toString();
    return this.userService.validateOptionByToken('Operation:getPDFSmall').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<string>(url);
        }
      })
    );
  }

  public store_purchase$(purchase: Purchase): Observable<Purchase> {
    let url = this._url + '/create-purchase';
    return this.userService.validateOptionByToken('Operation:createPurchase').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<Purchase>(url, purchase);
        }
      })
    );
  }

  public store_purchase_file$(operation: Operation): Observable<StatusMessage[]> {
    let url = this._url + '/create-purchase-file';
    return this.userService.validateOptionByToken('Operation:createPurchaseFile').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<StatusMessage[]>(url, operation);
        }
      })
    );
  }

  public store_sale$(operation: Operation): Observable<Operation> {
    let url = this._url + '/create-sale';
    return this.userService.validateOptionByToken('Operation:createSale').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<Operation>(url, operation);
        }
      })
    );
  }

  public show_purchase$(id_purchase: number): Observable<Purchase> {
    const url = this._url + '/' + id_purchase;
    return this.userService.validateOptionByToken('Operation:show').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Purchase>(url);
        }
      })
    );
  }

  public getDetailOperation$(id_operation: number): Observable<Operation> {
    const url = this._url + '/get-detail/' + id_operation;
    return this.userService.validateOptionByToken('Operation:getDetail').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Operation>(url);
        }
      })
    );
  }

  public getOperationByProvider$(id_enterprise: number): Observable<Operation[]> {
    const url = this._url + '/get-operation-by-provider/' + id_enterprise;
    return this.userService.validateOptionByToken('Operation:getOperationsByProvider').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Operation[]>(url);
        }
      })
    );
  }

  public getOperationByClient$(id_person:number): Observable<Operation[]> {
    const url = this._url + '/get-operation-by-client/' + id_person;
    return this.userService.validateOptionByToken('Operation:getOperationsByClient').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Operation[]>(url);
        }
      })
    );
  }

  public getByPaymentTypeAndDatesAndType$(paymentType: string, fromDate: string, toDate: string, type_operation: string): Observable<Operation[]> {
    let params = {
      'payment_type': paymentType,
      'from_date': fromDate,
      'to_date': toDate,
      'type_operation': type_operation
    };
    let url = this._url + '/get-by-payment-type-and-dates-and-type';
    return this.userService.validateOptionByToken('Operation:getByPaymentTypeAndDatesAndType').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<Operation[]>(url,params);
        }
      })
    );
  }
}
