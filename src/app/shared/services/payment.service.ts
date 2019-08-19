import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Payment } from '../models/payment';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private _url = environment.url_payment;
  constructor(
    private http: HttpClient,
    private userService: UserService
    ) {
  }

  public store$(payment: Payment): Observable<Payment> {
    return this.userService.validateOptionByToken('Payment:create').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<Payment>(this._url, payment);
        }
      })
    );
  }

  public delete$(id: number): Observable<Payment> {
    let url = this._url + '/' + id.toString();
    return this.userService.validateOptionByToken('Payment:delete').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.delete<Payment>(url);
        }
      })
    );
  }

  public getPaymentsByOperation$(id_operation: number): Observable<Payment[]> {
    let url = this._url + '/get-by-operation/' + id_operation.toString();
    return this.userService.validateOptionByToken('Payment:getByOperation').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Payment[]>(url);
        }
      })
    );
  }
}
