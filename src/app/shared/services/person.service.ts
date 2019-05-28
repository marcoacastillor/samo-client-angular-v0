import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../models/person';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { Results } from '../models/results';

@Injectable()
export class PersonService {
  private _url = environment.url_person;
  constructor(
    private http: HttpClient,
    private userService: UserService
    ) {
  }

  public index$(): Observable<Person[]> {
    return this.userService.validateOptionByToken('PRS_LIST').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Person[]>(this._url);
        }
      })
    );
  }

  public getEmployeesByEnterprise$(id_enterprise: number): Observable<Person[]> {
    const url = this._url + '/get-employees-by-enterprise-list/'+id_enterprise;
    return this.userService.validateOptionByToken('PRS_GET_EMPLOYEE_BY_ENTERPRISE').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Person[]>(url);
        }
      })
    );
  }

  public showByExternalReference$(externalReference: string): Observable<Person> {
    const url = this._url + '/show-external-reference/' + externalReference;
    return this.userService.validateOptionByToken('PRS_SHOW_EXTERNAL_REFERENCE').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Person>(url);
        }
      })
    );
  }

  public store$(person: Person): Observable<Person> {
    return this.userService.validateOptionByToken('PRS_CRT').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<Person>(this._url, person);
        }
      })
    );
  }

  public update$(person: Person): Observable<Person> {
    return this.userService.validateOptionByToken('PRS_UPD').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.put<Person>(this._url, person);
        }
      })
    );
  }

  public show$(id: number): Observable<Person> {
    const url = this._url+ '/' + id;
    return this.userService.validateOptionByToken('PRS_SHOW').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Person>(url);
        }
      })
    );
  }

  public showLogin$(id: number): Observable<Person> {
    const url = this._url+'/show-login/'+id;
    return this.http.get<Person>(url);
  }

  public getByTypeAndNumberId$(type: string, id: string): Observable<Person> {
    const url = this._url+ '/get-by-type-and-number-id/'+type+'/'+id;
    return this.userService.validateOptionByToken('PRS_GET_BY_ID').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Person>(url);
        }
      })
    );
  }

  public getEmployeesByEnterpriseRs$(id_enterprise: number): Observable<Results> {
    const url = this._url+ '/get-employees-by-enterprise/'+id_enterprise.toString();
    return this.userService.validateOptionByToken('PRS_EMPLOYEE_BY_ENTERPRISE').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Results>(url);
        }
      })
    );
  }

  public getClientsByEnterprise$(id_enterprise: number): Observable<Results> {
    const url = this._url+ '/get-clients-by-enterprise/'+id_enterprise.toString();
    return this.userService.validateOptionByToken('PRS_CLIENTS_BY_ENTERPRISE').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Results>(url);
        }
      })
    );
  }

  public searchEmployeeByFilter$(filter: string, id_enterprise: number): Observable<Results> {
    let url = this._url + '/get-employee-by-filter-and-enterprise/' + filter + '/' + id_enterprise;
    return this.userService.validateOptionByToken('PRS_GET_EMPLOYEE_BY_FILTER_AND_ENTERPRISE').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Results>(url);
        }
      })
    );
  }

  public searchClientsByFilter$(filter: string, id_enterprise: number): Observable<Results> {
    let url = this._url + '/get-client-by-filter-and-enterprise/' + filter + '/' + id_enterprise;
    return this.userService.validateOptionByToken('PRS_GET_CLIENT_BY_FILTER_AND_ENTERPRISE').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Results>(url);
        }
      })
    );
  }

  public inactivate$(id: number): Observable<Person> {
    const url = this._url + '/inactivate-employee/' + id.toString();
    return this.userService.validateOptionByToken('PRS_INACTIVATE').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Person>(url);
        }
      })
    );
  }
}
