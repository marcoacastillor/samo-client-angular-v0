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


  public create$(creditAssociated:CreditAssociated): Observable<ResultOperation> {
    return this.userService.validateOptionByToken('CreditAssociated:create').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<ResultOperation>(this._url,creditAssociated);
        }
      })
    );
  }

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
}
