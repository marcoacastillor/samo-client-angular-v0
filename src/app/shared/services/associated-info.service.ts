import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { AssociatedInfo } from '../models/associated-info';
import { switchMap } from 'rxjs/operators';
import { ResultOperation } from '../models/result-operation';

@Injectable({
  providedIn: 'root'
})
export class 
AssociatedInfoService {
  private _url = environment.url_associated_info
  
  constructor(
    private http: HttpClient,
    private userService: UserService
    ) {
  }

  public getAll$(): Observable<AssociatedInfo[]> {
    return this.userService.validateOptionByToken('AssociatedInfo:getAll').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<AssociatedInfo[]>(this._url);
        }
      })
    );
  }

  public getAssociatedByEnterprise$(id_enterprise: number): Observable<AssociatedInfo[]> {
    const url = this._url + '/get-associated-by-enterprise/'+id_enterprise;
    return this.userService.validateOptionByToken('AssociatedInfo:getAssociatedByEnterprise').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<AssociatedInfo[]>(url);
        }
      })
    );
  }

  public getValuesByEnterprise$(id_enterprise: number): Observable<any> {
    const url = this._url + '/get-values-by-enterprise/'+id_enterprise;
    return this.userService.validateOptionByToken('AssociatedInfo:getValuesByEnterprise').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<any>(url);
        }
      })
    );
  }


  public create$(associatedInfo:AssociatedInfo): Observable<ResultOperation> {
    return this.userService.validateOptionByToken('AssociatedInfo:create').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<ResultOperation>(this._url,associatedInfo);
        }
      })
    );
  }

  public update$(associatedInfo:AssociatedInfo): Observable<ResultOperation> {
    let url = this._url + '/' + associatedInfo.pk_id_associated_info;
    return this.userService.validateOptionByToken('AssociatedInfo:update').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.put<ResultOperation>(url,associatedInfo);
        }
      })
    );
  }

  public deleteAssociated$(id:number): Observable<ResultOperation> {
    let url = this._url + '/' + id.toString();
    return this.userService.validateOptionByToken('AssociatedInfo:delete').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.delete<ResultOperation>(url);
        }
      })
    );
  }

  
  public show$(id:number): Observable<AssociatedInfo> {
    let url = this._url + '/' + id.toString();
    return this.userService.validateOptionByToken('AssociatedInfo:show').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<AssociatedInfo>(url);
        }
      })
    );
  }
}
