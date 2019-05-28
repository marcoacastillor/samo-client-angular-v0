import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Parameter } from '../models/parameter';

@Injectable({
  providedIn: 'root'
})
export class ParameterService {
  private _url = environment.url_parameter;
  constructor(
    private http: HttpClient,
    private userService: UserService
    ) {
  }

  public store$(cmp: Parameter): Observable<Parameter> {
    return this.userService.validateOptionByToken('PARAM_CRT').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<Parameter>(this._url, cmp);
        }
      })
    );
  }


  public getByCodeCategory$(code: string): Observable<Parameter[]> {
    const url = this._url + '/get-param-by-categ/' +code;
    return this.userService.validateOptionByToken('PARAM_GET_PARAM_BY_CATEG').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Parameter[]>(url);
        }
      })
    );
  }
  
  public update$(cmp: Parameter): Observable<Parameter> {
    return this.userService.validateOptionByToken('PARAM_UPD').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.put<Parameter>(this._url, cmp);
        }
      })
    );
  }

  public delete$(id: number): Observable<Parameter> {
    const url = this._url + '/' + id.toString();
    return this.userService.validateOptionByToken('PARAM_DEL').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.delete<Parameter>(url);
        }
      })
    );
  }
}
