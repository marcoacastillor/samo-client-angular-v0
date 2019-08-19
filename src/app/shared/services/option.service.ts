import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Option } from '../models/option';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { Results } from '../models/results';

@Injectable({
  providedIn: 'root'
})
export class OptionService {
  private _url = environment.url_option;
  constructor(
    private http: HttpClient,
    private userService: UserService
    ) {
  }

  public getAll$(): Observable<Results> {
    return this.userService.validateOptionByToken('Option:getAll').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Results>(this._url);
        }
      })
    );
  }

  public getByFilter$(filter: string): Observable<Results> {
    const url = this._url + '/get-by-filter/' + filter;
    return this.userService.validateOptionByToken('Option:getByFilter').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Results>(url);
        }
      })
    );
  }

  public store$(option: Option): Observable<Option> {
    return this.userService.validateOptionByToken('Option:create').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<Option>(this._url, option);
        }
      })
    );
  }

  public show$(id_option: number): Observable<Option> {
    const url = this._url + '/' + id_option;
    return this.userService.validateOptionByToken('Option:show').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get< Option>(url);
        }
      })
    );
  }

  public delete$(id: number): Observable<Option> {
    const url = this._url + '/' + id.toString();
    return this.userService.validateOptionByToken('Option:delete').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.delete<Option>(url);
        }
      })
    );
  }

  public update$(option: Option): Observable<Option> {
    return this.userService.validateOptionByToken('Option:update').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.put<Option>(this._url, option);
        }
      })
    );
  }
}
