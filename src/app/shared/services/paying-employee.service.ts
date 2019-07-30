import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { PayingEmployee } from '../models/paying-employee';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PayingEmployeeService {
  private _url = environment.url_payment_employee;
  
  constructor(
    private http: HttpClient,
    private userService: UserService
    ) {}

  public getInfoByEnterprisePerson$(id: number): Observable<PayingEmployee[]> {
    const url = this._url + '/'+id;
    return this.userService.validateOptionByToken('PAYING_EMPLOYEE_GET_INFO_BY_CONTRACT').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<PayingEmployee[]>(url);
        }
      })
    );
  }

  public getSettlementInfoByCuttingPeriodAndEnterprise$(id_period: number, id_enterprise: number): Observable<any>{
    const url = this._url + '/get-by-cutting-period-and-enterprise/'+id_period.toString() + '/' + id_enterprise.toString();
    return this.userService.validateOptionByToken('PAYING_EMPLOYEE_GET_INFO_BY_CUTTING_PERIOD_AND_ENTERPRISE').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<any>(url);
        }
      })
    );
  }

  public generateSettlementByPeriodAndContract$(id_cutting_period: number, id_contract:number): Observable<any>{
    const url = this._url + '/generate-settlement-by-period-and-contract/'+id_cutting_period.toString() + '/' + id_contract.toString();
    return this.userService.validateOptionByToken('PAYING_EMPLOYEE_GENERATE_SETTLEMENT_BY_PERIOD_AND_CONTRACT').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<any>(url);
        }
      })
    );
  }

  public generateAllSettlementAndEnterprise$(id_cutting_period: number, id_enterprise: number): Observable<any>{
    const url = this._url + '/generate-all-settlement-by-period-and-enterprise/'+id_cutting_period.toString() + '/' + id_enterprise.toString();
    return this.userService.validateOptionByToken('PAYING_EMPLOYEE_GENERATE_ALL_SETTLEMENT_BY_PERIOD_AND_ENTERPRISE').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<any>(url);
        }
      })
    );
  }

  
  public deletePayingByContract$(id_cutting_period:number): Observable<any>{
    const url = this._url + '/delete-by-contract/' + id_cutting_period.toString();
    return this.userService.validateOptionByToken('PAYING_EMPLOYEE_DEL').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.delete<any>(url);
        }
      })
    );
  }

  public paymentPayingByContract$(id_cutting_period:number): Observable<any>{
    const url = this._url + '/payment-by-contract/' + id_cutting_period.toString();
    return this.userService.validateOptionByToken('PAYING_EMPLOYEE_PAYMENT').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<any>(url);
        }
      })
    );
  }
}
