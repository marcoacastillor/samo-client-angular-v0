import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { CreditPayment } from '../models/credit-payment';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ResultOperation } from '../models/result-operation';

@Injectable({
  providedIn: 'root'
})
export class CreditPaymentService {

  private _url = environment.url_credit_payment;
  
  constructor(
    private http: HttpClient,
    private userService: UserService
    ) {
  }

  public getByCredit$(id_credit:number): Observable<CreditPayment[]> {
    let url = this._url + '/get-by-credit/' + id_credit.toString();
    return this.userService.validateOptionByToken('CreditPayment:getByCredit').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<CreditPayment[]>(url);
        }
      })
    );
  }

  public getFeePaymentByCredit$(id_credit:number): Observable<CreditPayment> {
    let url = this._url + '/get-fee-payment-by-credit/' + id_credit.toString();
    return this.userService.validateOptionByToken('CreditPayment:getFeePaymentByCredit').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<CreditPayment>(url);
        }
      })
    );
  }

  public getPaymentsByenterprise$(id_enterprise:number):Observable<any> {
    let url = this._url + '/get-payment-by-enterprise/' + id_enterprise.toString();
    return this.userService.validateOptionByToken('CreditPayment:getPaymentsByEnterprise').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<any>(url);
        }
      })
    );
  }

  public store$(creditPayment:CreditPayment): Observable<ResultOperation> {
    return this.userService.validateOptionByToken('CreditPayment:create').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<ResultOperation>(this._url,creditPayment);
        }
      })
    );
  }

}
