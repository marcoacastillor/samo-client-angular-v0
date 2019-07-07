import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { Enterprise } from '../models/enterprise';
import { switchMap } from 'rxjs/operators';
import { Results } from '../models/results';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {
  private _url = environment.url_enterprise;
  
  constructor(
    private http: HttpClient,
    private userService: UserService
    ) {}

  public getAllByType$(type: string): Observable<Enterprise[]> {
    const url = this._url + '/index/'+type;
    return this.userService.validateOptionByToken('ENT_LIST').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Enterprise[]>(url);
        }
      })
    );
  }

  public getByFilter$(filter: any, type: string): Observable<Results> {
    const url = this._url + '/get-list-by-filter-and-type/' + type;
    return this.userService.validateOptionByToken('ENT_LIST_BY_FILTER_AND_TYPE').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<Results>(url, filter);
        }
      })
    );
  }

  public getByNameFilter$(filter: string, type: string): Observable<Enterprise[]> {
    const url = this._url + '/get-list-by-name-filter-and-type/' + filter + '/' + type;
    return this.userService.validateOptionByToken('ENT_GET_BY_NAMEFILTER_AND_TYPE').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Enterprise[]>(url);
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

  public getInfoEnterprise$(): Observable<Enterprise> {
    const url = this._url + '/get-info-enterprise';
    return this.userService.validateOptionByToken('ENT_GET_INFO_ENTERPRISE').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Enterprise>(url);
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

  public showLogin$(id_enterprise: number): Observable<Enterprise> {
    const url = this._url + '/show-login/' + id_enterprise;
    return this.http.get<Enterprise>(url);
  }

  public update$(enterprise: Enterprise): Observable<Enterprise> {
    return this.userService.validateOptionByToken('ENT_UPD').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.put<Enterprise>(this._url, enterprise);
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