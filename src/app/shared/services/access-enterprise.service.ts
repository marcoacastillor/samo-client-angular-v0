import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';
import { AccessEnterprise } from '../models/access-enterprise';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccessEnterpriseService {
  private _url = environment.url_access_enterprise;
  constructor(
    private http: HttpClient,
    private userService: UserService
    ) {
  }

  public store$(access: AccessEnterprise): Observable<AccessEnterprise> {
    return this.userService.validateOptionByToken('AccessEnterprise:create').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<AccessEnterprise>(this._url, access);
        }
      })
    );
  }

  public getAccessByEnterprise$(id:number): Observable<AccessEnterprise> {
    let url = this._url + '/get-token-access/' + id.toString();
    return this.userService.validateOptionByToken('AccessEnterprise:getTokenAccess').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<AccessEnterprise>(url);
        }
      })
    );
  }

}
