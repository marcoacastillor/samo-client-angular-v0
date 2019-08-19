import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { ParameterConfig } from '../models/parameter-config';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Parameter } from '../models/parameter';

@Injectable({
  providedIn: 'root'
})
export class ParameterConfigService {
  private _url = environment.url_parameter_config;
  constructor(
    private http: HttpClient,
    private userService: UserService
    ) {
  }

  public getByEnterprise$(id_enterprise: number): Observable<ParameterConfig[]> {
    let url = this._url + '/get-by-enterprise/' + id_enterprise.toString();
    return this.userService.validateOptionByToken('ParameterConfig:getByEnterprise').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<ParameterConfig[]>(url);
        }
      })
    );
  }

  public store$(cmp: ParameterConfig): Observable<ParameterConfig> {
    return this.userService.validateOptionByToken('ParameterConfig:create').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<ParameterConfig>(this._url, cmp);
        }
      })
    );
  }

  public createAllsParamsBytype$(type: string, id_enterprise: number): Observable<Boolean> {
    let url = this._url + '/create-all-params-by-type/' + type + '/' + id_enterprise.toString();
    return this.userService.validateOptionByToken('ParameterConfig:createAllParamsByType').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Boolean>(url);
        }
      })
    );
  }

  public update$(cmp: ParameterConfig): Observable<ParameterConfig> {
    return this.userService.validateOptionByToken('ParameterConfig:update').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.put<ParameterConfig>(this._url, cmp);
        }
      })
    );
  }

  public updateByEnterpriseAndCodeAndValue$(id_enterprise: number, code: string, value: string):Observable<ParameterConfig> {
    let url = this._url + '/update-by-enterprise-and-code-and-value/' + id_enterprise.toString() + '/' + code + '/' + value; 
    return this.userService.validateOptionByToken('ParameterConfig:updateByEnterpriseAndCodeAndValue').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<ParameterConfig>(url);
        }
      })
    );
  }

  public delete$(id: number): Observable<ParameterConfig> {
    let url = this._url + '/' + id.toString();
    return this.userService.validateOptionByToken('ParameterConfig:delete').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.delete<ParameterConfig>(url);
        }
      })
    );
  }
}
