import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { switchMap } from 'rxjs/operators';


@Injectable()
export class UserService {
  private _url = environment.url_user;
  
  constructor(
    private http: HttpClient
    ) {
  }

  public sendCredential$(credential: User): Observable<User> {
    const url = this._url + '/login';
    return this.http.post<User>(url, credential);
  }

  public validateOptionByToken(code_option: string): Observable <any> {
    const url = this._url + '/validate-option-by-token-and-code-option'+'/'+code_option;
    return this.http.get<any>(url);
  }

  public getAll$(): Observable<User[]> {
    return this.validateOptionByToken('User:getAll').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<User[]>(this._url);
        }
      })
    );
  }

  public show$(id: number): Observable<User> {
    const url = this._url + '/' + id.toString();
    return this.validateOptionByToken('User:show').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<User>(url);
        }
      })
    );
  }

  public store$(user: User): Observable<User> {
    return this.validateOptionByToken('User:create').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<User>(this._url, user);
        }
      })
    );
  }

  public delete$(id: number): Observable<User> {
    const url = this._url + '/' + id.toString();
    return this.validateOptionByToken('User:delete').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.delete<User>(url);
        }
      })
    );
  }

  public update$(user: User): Observable<User> {
    return this.validateOptionByToken('User:update').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.put<User>(this._url, user);
        }
      })
    );
  }

  public inactiveUserByPerson$(id_person: number): Observable<User> {
    const url = this._url + '/inactive-user-by-person/' + id_person.toString()
    return this.validateOptionByToken('User:inactiveByPerson').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<User>(url);
        }
      })
    );
  }
}
