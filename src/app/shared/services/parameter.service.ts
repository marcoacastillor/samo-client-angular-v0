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
    return this.userService.validateOptionByToken('Parameter:create').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<Parameter>(this._url, cmp);
        }
      })
    );
  }


  public getByCodeCategory$(code: string): Observable<Parameter[]> {
    const url = this._url + '/get-param-by-categ/' +code;
    return this.userService.validateOptionByToken('Parameter:getByCategory').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Parameter[]>(url);
        }
      })
    );
  }

  public getByMultipleCodeCategory$(codes: any): Observable<any[]> {
    const url = this._url + '/get-param-by-multiple-categ';
    return this.userService.validateOptionByToken('Parameter:getByMultipleCategory').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<any[]>(url,codes);
        }
      })
    );
  }
  
  public update$(cmp: Parameter): Observable<Parameter> {
    return this.userService.validateOptionByToken('Parameter:update').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.put<Parameter>(this._url, cmp);
        }
      })
    );
  }

  public delete$(id: number): Observable<Parameter> {
    const url = this._url + '/' + id.toString();
    return this.userService.validateOptionByToken('Parameter:delete').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.delete<Parameter>(url);
        }
      })
    );
  }
}
