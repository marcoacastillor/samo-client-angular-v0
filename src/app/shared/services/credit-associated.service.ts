import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { CreditAssociated } from '../models/credit-associated';
import { switchMap } from 'rxjs/operators';
import { ResultOperation } from '../models/result-operation';

@Injectable({
  providedIn: 'root'
})
export class CreditAssociatedService {
  private _url = environment.url_credit_associated;
  
  constructor(
    private http: HttpClient,
    private userService: UserService
    ) {
  }

  public getAll$(): Observable<CreditAssociated[]> {
    return this.userService.validateOptionByToken('CreditAssociated:getAll').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<CreditAssociated[]>(this._url);
        }
      })
    );
  }

  public getAllByEnterprise$(id_enterprise:number): Observable<CreditAssociated[]> {
    let url = this._url + '/get-all-by-enterprise/' + id_enterprise;
    return this.userService.validateOptionByToken('CreditAssociated:getAllByEnterprise').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<CreditAssociated[]>(url);
        }
      })
    );
  }

  public getByAssociated$(id:number): Observable<CreditAssociated[]> {
    let url = this._url + '/get-by-associated/' + id.toString();
    return this.userService.validateOptionByToken('CreditAssociated:getByAssociated').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<CreditAssociated[]>(url);
        }
      })
    );
  }

  public getByEnterpriseAndState$(id_enterprise:number,state:string): Observable<CreditAssociated[]> {
    let url = this._url + '/get-by-enterprise-and-state/' + id_enterprise.toString() + '/' + state;
    return this.userService.validateOptionByToken('CreditAssociated:getByEnterpriseAndState').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<CreditAssociated[]>(url);
        }
      })
    );
  }

  public getValuesByEnterpriseAndState$(id_enterprise:number,state:string): Observable<any> {
    let url = this._url + '/get-values-by-enterprise-and-state/' + id_enterprise.toString() + '/' + state;
    return this.userService.validateOptionByToken('CreditAssociated:getValuesByEnterpriseAndState').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<any>(url);
        }
      })
    );
  }

  public getPerformanceByEnterprise$(id_enterprise:number): Observable<any> {
    let url = this._url + '/get-performance-by-enterprise/' + id_enterprise.toString();
    return this.userService.validateOptionByToken('CreditAssociated:getPerformanceByEnterprise').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<any>(url);
        }
      })
    );
  }

  public create$(creditAssociated:CreditAssociated): Observable<ResultOperation> {
    return this.userService.validateOptionByToken('CreditAssociated:create').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<ResultOperation>(this._url,creditAssociated);
        }
      })
    );
  }

  public update$(creditAssociated:CreditAssociated): Observable<ResultOperation> {
    return this.userService.validateOptionByToken('CreditAssociated:update').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.put<ResultOperation>(this._url,creditAssociated);
        }
      })
    );
  }

  public updateState$(creditAssociated:CreditAssociated): Observable<ResultOperation> {
    let url = this._url + '/update-state-credit';
    return this.userService.validateOptionByToken('CreditAssociated:updateStateCredit').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.put<ResultOperation>(url,creditAssociated);
        }
      })
    );
  }

  public updateDisbursmentDate$(creditAssociated:CreditAssociated): Observable<ResultOperation> {
    let url = this._url + '/update-disbursment-date';
    return this.userService.validateOptionByToken('CreditAssociated:updateDisbursmentDate').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.put<ResultOperation>(url,creditAssociated);
        }
      })
    );
  }

  //

  public show$(id:number): Observable<CreditAssociated> {
    let url = this._url + '/' + id.toString();
    return this.userService.validateOptionByToken('CreditAssociated:show').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<CreditAssociated>(url);
        }
      })
    );
  }

  public delete$(id:number): Observable<ResultOperation> {
    let url = this._url + '/' + id.toString();
    return this.userService.validateOptionByToken('CreditAssociated:delete').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.delete<ResultOperation>(url);
        }
      })
    );
  }

  public getPMT$(interest:number,time_term:string,term:number,loan:number): Observable<number> {
    let url = this._url + '/get-pmt/' + interest.toString() + '/' + time_term +'/' + term.toString() + '/' + loan.toString();
    return this.userService.validateOptionByToken('CreditAssociated:getPMT').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<number>(url);
        }
      })
    );
  }
}
