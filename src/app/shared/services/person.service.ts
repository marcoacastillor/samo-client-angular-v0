import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../models/person';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { Results } from '../models/results';
import { EnterprisePerson } from '../models/enterprise-person';

@Injectable()
export class PersonService {
  private _url = environment.url_person;
  constructor(
    private http: HttpClient,
    private userService: UserService
    ) {
  }

  public index$(): Observable<Person[]> {
    return this.userService.validateOptionByToken('Person:getAll').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Person[]>(this._url);
        }
      })
    );
  }

  public getEmployeesByEnterprise$(id_enterprise: number): Observable<Person[]> {
    const url = this._url + '/get-employees-by-enterprise-list/'+id_enterprise;
    return this.userService.validateOptionByToken('Person:getEmployeeByEnterpriseList').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Person[]>(url);
        }
      })
    );
  }

  public getActiveEmployeesByEnterprise$(id_enterprise: number): Observable<Person[]> {
    const url = this._url + '/get-active-employee-by-enterprise/'+id_enterprise;
    return this.userService.validateOptionByToken('Person:getActiveEmployeeByEnterprise').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Person[]>(url);
        }
      })
    );
  }


  public showByExternalReference$(externalReference: string): Observable<Person> {
    const url = this._url + '/show-external-reference/' + externalReference;
    return this.userService.validateOptionByToken('Person:getByExternalRererence').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Person>(url);
        }
      })
    );
  }

  public createPerson$(person: Person): Observable<Person> {
    let url = this._url + '/create-person';
    return this.userService.validateOptionByToken('Person:createPerson').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<Person>(url, person);
        }
      })
    );
  }

  public createPersonBasic$(person: Person): Observable<Person> {
    let url = this._url + '/create-person-basic';
    return this.userService.validateOptionByToken('Person:createPersonBasic').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<Person>(url, person);
        }
      })
    );
  }

  

  public createEmployee$(person: Person): Observable<Person> {
    let url = this._url + '/create-employee';
    return this.userService.validateOptionByToken('Person:createEmployee').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<Person>(url, person);
        }
      })
    );
  }

  public updateClient$(person: Person): Observable<Person> {
    let url = this._url + '/update-client'
    return this.userService.validateOptionByToken('Person:udateClient').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.put<Person>(url, person);
        }
      })
    );
  }

  public updateEmployee$(person: Person): Observable<Person> {
    let url = this._url + '/update-employee'
    return this.userService.validateOptionByToken('Person:updateEmployee').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.put<Person>(url, person);
        }
      })
    );
  }

  public show$(id: number): Observable<Person> {
    const url = this._url+ '/' + id;
    return this.userService.validateOptionByToken('Person:show').pipe(
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
    return this.userService.validateOptionByToken('Person:getByTypeIdAndNumber').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Person>(url);
        }
      })
    );
  }

  public getEmployeesByEnterpriseRs$(id_enterprise: number): Observable<Results> {
    const url = this._url+ '/get-employees-by-enterprise/'+id_enterprise.toString();
    return this.userService.validateOptionByToken('Person:getEmployeeByEnterprise').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Results>(url);
        }
      })
    );
  }

  public getClientsByEnterprise$(id_enterprise: number): Observable<Person[]> {
    const url = this._url+ '/get-clients-by-enterprise/'+id_enterprise.toString();
    return this.userService.validateOptionByToken('Person:getClientsByEnterprise').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Person[]>(url);
        }
      })
    );
  }

  public searchEmployeeByFilter$(filter: string, id_enterprise: number): Observable<Results> {
    let url = this._url + '/get-employee-by-filter-and-enterprise/' + filter + '/' + id_enterprise;
    return this.userService.validateOptionByToken('Person:getEmployeeByFilterAndEnterprise').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Results>(url);
        }
      })
    );
  }

  public searchClientsByFilter$(filter: string, id_enterprise: number): Observable<Results> {
    let url = this._url + '/get-client-by-filter-and-enterprise/' + filter + '/' + id_enterprise;
    return this.userService.validateOptionByToken('Person:getClientByFilterAndEnterprise').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Results>(url);
        }
      })
    );
  }

  public inactivate$(id: number): Observable<Person> {
    const url = this._url + '/inactivate-employee/' + id.toString();
    return this.userService.validateOptionByToken('Person:inactiveEmployee').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Person>(url);
        }
      })
    );
  }

  public getPersonsByIdFilter$(id_client: string): Observable<Person[]> {
    const url = this._url + '/get-persons-by-id-filter/' + id_client.toString();
    return this.userService.validateOptionByToken('Person:getPersionsByIdFilter').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Person[]>(url);
        }
      })
    );
  }

  public getPersonsByNamesFilter$(names_client: string): Observable<Person[]> {
    const url = this._url + '/get-persons-by-names-filter/' + names_client.toString();
    return this.userService.validateOptionByToken('Person:getPersonsByNameFilter').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Person[]>(url);
        }
      })
    );
  }

  public getLaboralInfoByPerson$(id_person: number): Observable<Person> {
    const url = this._url + '/get-laboral-info-by-person/' + id_person.toString();
    return this.userService.validateOptionByToken('Person:getLaboralInfoByPerson').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Person>(url);
        }
      })
    );
  }

  public deleteLaboralInfo$(id:number): Observable<EnterprisePerson> {
    const url = this._url + '/delete-laboral-info-of-person/' + id.toString();
    return this.userService.validateOptionByToken('Person:deleteLaboralInfoByPerson').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.delete<EnterprisePerson>(url);
        }
      })
    );
  }

  public deleteClient$(id:number): Observable<Person> {
    const url = this._url + '/delete-client/' + id.toString();
    return this.userService.validateOptionByToken('Person:deleteClient').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.delete<Person>(url);
        }
      })
    );
  }

  public update$(person:Person): Observable<Person> {
    return this.userService.validateOptionByToken('Person:update').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.put<Person>(this._url,person);
        }
      })
    );
  }

}
