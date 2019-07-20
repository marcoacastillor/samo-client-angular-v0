import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Authentication } from '../models/authentication';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthenticationService {
  private _url = environment.url_authentication_ventas;
  constructor(private http: HttpClient) {
  }

  public store$(auth: Authentication): Observable<Authentication> {
    return this.http.post<Authentication>(this._url,auth);
  }

  public refreshSales(): Observable<string>{
    let url = environment.url_refresh_sales;
    return this.http.get<string>(url)
  }

  public refreshUsers(): Observable<string>{
    let url = environment.url_refresh_users;
    return this.http.get<string>(url)
  }
}
