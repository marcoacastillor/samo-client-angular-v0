import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { Enterprise } from '../models/enterprise';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {
  private _url = environment.url_enterprise;
  
  constructor(
    private http: HttpClient,
    private userService: UserService
    ) {}

  public getAll$(): Observable<Enterprise[]> {
    return this.userService.validateOptionByToken('ENT_LIST').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Enterprise[]>(this._url);
        }
      })
    );
  }

  public showByExternalReference$(externalReference: string): Observable<Enterprise> {
    const url = this._url + '/show-external-reference/' + externalReference;
    return this.userService.validateOptionByToken('ENT_SHOW_EXTERNAL_REFERENCE').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Enterprise>(url);
        }
      })
    );
  }

  public getByType$(type: string): Observable<Enterprise[]> {
    const url = this._url + '/get-by-type/' + type;
    return this.userService.validateOptionByToken('ENT_GET_BY_TYPE').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Enterprise[]>(url);
        }
      })
    );
  }
  

  public show$(id_enterprise: number): Observable<Enterprise> {
    const url = this._url + '/' + id_enterprise;
    return this.userService.validateOptionByToken('ENT_SHOW').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Enterprise>(url);
        }
      })
    );
  }

  public store$(enterprise: Enterprise): Observable<Enterprise> {
    return this.userService.validateOptionByToken('ENT_CRT').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<Enterprise>(this._url, enterprise);
        }
      })
    );
  }
}
