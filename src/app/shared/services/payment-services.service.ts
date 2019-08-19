import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { PaymentService } from '../models/payment-service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentServicesService {
  private _url = environment.url_payment_service;
  constructor(
    private http: HttpClient,
    private userService: UserService
    ) {
  }

  public store$(payment: PaymentService): Observable<PaymentService> {
    return this.userService.validateOptionByToken('PaymentService:create').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<PaymentService>(this._url, payment);
        }
      })
    );
  }

  public getByEnterpriseService$(id_contract_service: number): Observable<PaymentService[]> {
    let url = this._url + '/get-by-enterprise-service/' + id_contract_service.toString();
    return this.userService.validateOptionByToken('PaymentService:getByEnterpriseService').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<PaymentService[]>(url);
        }
      })
    );
  }
}
