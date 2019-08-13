import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FinancialReportService {
  private _url = environment.url_financial_report;
  
  constructor(
    private http: HttpClient,
    private userService: UserService
    ) {}

  public getResultsByPeriodAndEnterprise$(from_date:string, to_date:string,id_enterprise:number): Observable<any> {
    let url = this._url + '/statement-income-by-period-and-enterprise/' + from_date + '/' + to_date + '/'+ id_enterprise.toString();
    return this.userService.validateOptionByToken('GET_STATEMENT_INCOME_REPORT').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<any>(url);
        }
      })
    );
  }

  public getBalanceByPeriodAndEnterprise$(from_date:string, to_date:string,id_enterprise:number): Observable<any> {
    let url = this._url + '/balance-by-period-and-enterprise/' + from_date + '/' + to_date + '/'+ id_enterprise.toString();
    return this.userService.validateOptionByToken('GET_BALANCE_REPORT').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<any>(url);
        }
      })
    );
  }

  public getCashFlowByDateAndEnterprise$(actual_date:string, id_enterprise:number): Observable<any> {
    let url = this._url + '/cashflow-by-date-and-enterprise/' + actual_date + '/'+ id_enterprise.toString();
    return this.userService.validateOptionByToken('GET_CASH_FLOW_BY_DATES_AND_ENTERPRISE_REPORT').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<any>(url);
        }
      })
    );
  }
}
