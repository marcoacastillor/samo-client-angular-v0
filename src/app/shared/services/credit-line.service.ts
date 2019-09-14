import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { CreditLine } from '../models/credit-line';
import { switchMap } from 'rxjs/operators';
import { ResultOperation } from '../models/result-operation';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class CreditLineService {
  private _url = environment.url_credit_line;
  
  constructor(
    private http: HttpClient,
    private userService: UserService
    ) {
  }

  public getAll$(): Observable<CreditLine[]> {
    return this.userService.validateOptionByToken('CreditLine:getAll').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<CreditLine[]>(this._url);
        }
      })
    );
  }

  public show$(id:number): Observable<CreditLine> {
    let url = this._url + '/' + id.toString();
    return this.userService.validateOptionByToken('CreditLine:show').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<CreditLine>(url);
        }
      })
    );
  }

  public create$(creditLine:CreditLine): Observable<ResultOperation> {
    return this.userService.validateOptionByToken('CreditLine:create').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<ResultOperation>(this._url,creditLine);
        }
      })
    );
  }

  public update$(creditLine:CreditLine): Observable<ResultOperation> {
    let url = this._url + '/' + creditLine.pk_id_credit_line;
    return this.userService.validateOptionByToken('CreditLine:update').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.put<ResultOperation>(url,creditLine);
        }
      })
    );
  }

  public delete$(id:number): Observable<ResultOperation>{
    let url = this._url + '/' + id;
    return this.userService.validateOptionByToken('CreditLine:delete').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.delete<ResultOperation>(url);
        }
      })
    );
  }
}
