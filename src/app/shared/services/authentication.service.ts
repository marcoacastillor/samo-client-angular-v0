import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Authentication } from '../models/authentication';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) {
  }

  public storeSales$(auth: Authentication): Observable<Authentication> {
    let url = environment.url_authentication_ventas;
    return this.http.post<Authentication>(url,auth);
  }

  public storeCredits$(auth: Authentication): Observable<Authentication> {
    let url = environment.url_authentication_credits;
    return this.http.post<Authentication>(url,auth);
  }

  public refreshSales(): Observable<string>{
    let url = environment.url_refresh_sales;
    return this.http.get<string>(url)
  }

  public refreshUsers(): Observable<string>{
    let url = environment.url_refresh_users;
    return this.http.get<string>(url)
  }

  public refreshCredits(): Observable<string>{
    let url = environment.url_refresh_credits;
    return this.http.get<string>(url)
  }
}
