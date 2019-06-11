import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Authentication } from '../models/authentication';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationService {
  private _url = environment.url_authentication_ventas;
  constructor(private http: HttpClient) {
  }

  public store$(auth: Authentication): Observable<Authentication> {
    return this.http.post<Authentication>(this._url,auth);
  }
}
