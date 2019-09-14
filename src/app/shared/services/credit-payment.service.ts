import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { CreditPayment } from '../models/credit-payment';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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
    return this.userService.validateOptionByToken('CreditLine:getByCredit').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<CreditPayment[]>(url);
        }
      })
    );
  }

}
