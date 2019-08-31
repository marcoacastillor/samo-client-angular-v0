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
    return this.userService.validateOptionByToken('Enterprise:getAll').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Enterprise[]>(url);
        }
      })
    );
  }

  public getCypherKeyByEnterprise$(id:number): Observable<string> {
    const url = this._url + '/get-cypher-key-by-enterprise/'+id.toString();
    return this.userService.validateOptionByToken('Enterprise:getCypherKeyByEnterprise').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<string>(url);
        }
      })
    );
  }

  public getProvidersByProduct$(id_product:number): Observable<string[]> {
    const url = this._url + '/get-provider-by-product/'+id_product.toString();
    return this.userService.validateOptionByToken('Enterprise:getProviderByProduct').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<string[]>(url);
        }
      })
    );
  }

  public getByFilter$(filter: any, type: string): Observable<Results> {
    const url = this._url + '/get-list-by-filter-and-type/' + type;
    return this.userService.validateOptionByToken('Enterprise:listByFilterAndType').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<Results>(url, filter);
        }
      })
    );
  }

  public getByNameFilter$(filter: string, type: string): Observable<Enterprise[]> {
    const url = this._url + '/get-list-by-name-filter-and-type/' + filter + '/' + type;
    return this.userService.validateOptionByToken('Enterprise:getByNameFilterAndType').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Enterprise[]>(url);
        }
      })
    );
  }

  public getByCodeFilter$(filter: string, type: string): Observable<Enterprise[]> {
    const url = this._url + '/get-list-by-code-filter-and-type/' + filter + '/' + type;
    return this.userService.validateOptionByToken('Enterprise:getByCodeFilterAndType').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Enterprise[]>(url);
        }
      })
    );
  }



  public showByExternalReference$(externalReference: string): Observable<Enterprise> {
    const url = this._url + '/show-external-reference/' + externalReference;
    return this.userService.validateOptionByToken('Enterprise:showByExternalReference').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Enterprise>(url);
        }
      })
    );
  }

  public getByType$(type: string): Observable<Enterprise[]> {
    const url = this._url + '/get-by-type/' + type;
    return this.userService.validateOptionByToken('Enterprise:getByType').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Enterprise[]>(url);
        }
      })
    );
  }

  public getInfoEnterprise$(): Observable<Enterprise> {
    const url = this._url + '/get-info-enterprise';
    return this.userService.validateOptionByToken('Enterprise:getInfoEnteprise').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Enterprise>(url);
        }
      })
    );
  }
  

  public show$(id_enterprise: number): Observable<Enterprise> {
    const url = this._url + '/' + id_enterprise;
    return this.userService.validateOptionByToken('Enterprise:show').pipe(
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
    return this.userService.validateOptionByToken('Enterprise:update').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.put<Enterprise>(this._url, enterprise);
        }
      })
    );
  }


  public store$(enterprise: Enterprise): Observable<Enterprise> {
    return this.userService.validateOptionByToken('Enterprise:create').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<Enterprise>(this._url, enterprise);
        }
      })
    );
  }

  public delete$(id:number): Observable<Enterprise> {
    let url = this._url + '/' + id.toString()
    return this.userService.validateOptionByToken('Enterprise:delete').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.delete<Enterprise>(url);
        }
      })
    );
  }

}