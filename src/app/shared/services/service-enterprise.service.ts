import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { ServiceEnterprise } from '../models/service-enterprise';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceEnterpriseService {
  private _url = environment.url_service_enterprise;
  constructor(
    private http: HttpClient,
    private userService: UserService
    ) {
  }

  public getAll$(): Observable<ServiceEnterprise[]> {
    return this.userService.validateOptionByToken('ServiceEnterprise:getAll').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<ServiceEnterprise[]>(this._url);
        }
      })
    );
  }

  public show$(id:number): Observable<ServiceEnterprise> {
    let url = this._url + '/' + id.toString();
    return this.userService.validateOptionByToken('ServiceEnterprise:show').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<ServiceEnterprise>(url);
        }
      })
    );
  }

  public store$(serviceEnterprise: ServiceEnterprise): Observable<ServiceEnterprise> {
    return this.userService.validateOptionByToken('ServiceEnterprise:create').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<ServiceEnterprise>(this._url,serviceEnterprise);
        }
      })
    );
  }

  public update$(serviceEnterprise: ServiceEnterprise): Observable<ServiceEnterprise> {
    return this.userService.validateOptionByToken('ServiceEnterprise:update').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.put<ServiceEnterprise>(this._url,serviceEnterprise);
        }
      })
    );
  }

  public delete$(id:number): Observable<ServiceEnterprise> {
    let url = this._url + '/' + id.toString();
    return this.userService.validateOptionByToken('ServiceEnterprise:delete').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.delete<ServiceEnterprise>(url);
        }
      })
    );
  }
}
