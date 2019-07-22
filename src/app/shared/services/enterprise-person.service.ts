import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { EnterprisePerson } from '../models/enterprise-person';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnterprisePersonService {
  private _url = environment.url_enterprise_person;
  
  constructor(
    private http: HttpClient,
    private userService: UserService
    ) {}

  public getActiveInfoByPerson$(id: number): Observable<EnterprisePerson> {
    const url = this._url + '/get-active-info-by-person/'+ id.toString();
    return this.userService.validateOptionByToken('ENT_PERSON_GET_ACTIVE_INFO_BY_PERSON').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<EnterprisePerson>(url);
        }
      })
    );
  }

  public getAllInfoByPerson$(id: number): Observable<EnterprisePerson[]> {
    const url = this._url + '/get-all-by-person/'+ id.toString();
    return this.userService.validateOptionByToken('ENT_PERSON_GET_ALL_INFO_BY_PERSON').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<EnterprisePerson[]>(url);
        }
      })
    );
  }

  public show$(id: number): Observable<EnterprisePerson> {
    const url = this._url + '/'+ id.toString();
    return this.userService.validateOptionByToken('ENT_PERSON_GET_INFO').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<EnterprisePerson>(url);
        }
      })
    );
  }

  public inactivateContract$(id: number): Observable<EnterprisePerson> {
    const url = this._url + '/inactivate-contract/'+ id.toString();
    return this.userService.validateOptionByToken('ENT_PERSON_INACTIVATE_CONTRACT').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<EnterprisePerson>(url);
        }
      })
    );
  }

  public update$(enterprisePerson: EnterprisePerson): Observable<EnterprisePerson> {
    return this.userService.validateOptionByToken('ENT_PERSON_UPD').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.put<EnterprisePerson>(this._url,enterprisePerson);
        }
      })
    );
  }
}
