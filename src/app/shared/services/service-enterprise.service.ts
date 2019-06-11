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
  private _url = environment.url_enterprise;
  constructor(
    private http: HttpClient,
    private userService: UserService
    ) {
  }

  public getAll$(): Observable<ServiceEnterprise[]> {
    return this.userService.validateOptionByToken('SERVICE_ENTERPRISE_LIST').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<ServiceEnterprise[]>(this._url);
        }
      })
    );
  }
}
