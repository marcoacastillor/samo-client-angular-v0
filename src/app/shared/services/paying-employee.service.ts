import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { PayingEmployee } from '../models/paying-employee';
import { switchMap } from 'rxjs/operators';
import { WorkerNews } from '../models/worker-news';

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
    return this.userService.validateOptionByToken('PayingEmployee:getByenterprisePerson').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<PayingEmployee[]>(url);
        }
      })
    );
  }

  public getSettlementInfoByCuttingPeriodAndEnterprise$(id_period: number, id_enterprise: number): Observable<any>{
    const url = this._url + '/get-by-cutting-period-and-enterprise/'+id_period.toString() + '/' + id_enterprise.toString();
    return this.userService.validateOptionByToken('PayingEmployee:getByCuttingPeriodAndEnterprise').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<any>(url);
        }
      })
    );
  }

  public generateSettlementByPeriodAndContract$(id_cutting_period: number, id_contract:number): Observable<any>{
    const url = this._url + '/generate-settlement-by-period-and-contract/'+id_cutting_period.toString() + '/' + id_contract.toString();
    return this.userService.validateOptionByToken('PayingEmployee:generateSettlementByPeriodAndContract').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<any>(url);
        }
      })
    );
  }

  public generateAllSettlementAndEnterprise$(id_cutting_period: number, id_enterprise: number): Observable<any>{
    const url = this._url + '/generate-all-settlement-by-period-and-enterprise/'+id_cutting_period.toString() + '/' + id_enterprise.toString();
    return this.userService.validateOptionByToken('PayingEmployee:generateAllSettlementByPeriodAndEnterprise').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<any>(url);
        }
      })
    );
  }

  public updatePayingEmpworkerNewloyeeByIdAnd$(id:number,id_worker:number):Observable<PayingEmployee>{
    const url = this._url + '/update-paying-employee-by-worker_news/'+id.toString()+'/'+id_worker.toString();
    return this.userService.validateOptionByToken('PayingEmployee:UpdatePayingEmployeeByWorkerWews').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<any>(url);
        }
      })
    );
  }

  
  public deletePayingByContract$(id_cutting_period:number): Observable<any>{
    const url = this._url + '/delete-by-contract/' + id_cutting_period.toString();
    return this.userService.validateOptionByToken('PayingEmployee:delete').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.delete<any>(url);
        }
      })
    );
  }

  public paymentPayingByContract$(id_cutting_period:number): Observable<any>{
    const url = this._url + '/payment-by-contract/' + id_cutting_period.toString();
    return this.userService.validateOptionByToken('PayingEmployee:getByPaymentByContract').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<any>(url);
        }
      })
    );
  }
}
