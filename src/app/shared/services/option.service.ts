import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Option } from '../models/option';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { Results } from '../models/results';

@Injectable({
  providedIn: 'root'
})
export class OptionService {
  private _url = environment.url_option;
  constructor(
    private http: HttpClient,
    private userService: UserService
    ) {
  }

  public getAll$(): Observable<Option[]> {
    return this.userService.validateOptionByToken('Option:getAll').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Option[]>(this._url);
        }
      })
    );
  }

  public getBusinessObject$(): Observable<Option[]>{
    const url = this._url + '/get-business-object';
    return this.userService.validateOptionByToken('Option:getBusinessObject').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Option[]>(url);
        }
      })
    );
  }

  public getOptionsByBusinessObjectAndRol$(buss_object:string,id_rol:number): Observable<Option[]>{
    const url = this._url + '/get-options-by-business-object-and-rol/' + buss_object + '/' + id_rol;
    return this.userService.validateOptionByToken('Option:getOptionsByBusinessObjectAndRol').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Option[]>(url);
        }
      })
    );
  }

  public getNotOptionsByBusinessObjectAndRol$(buss_object:string,id_rol:number): Observable<Option[]>{
    const url = this._url + '/get-not-options-by-business-object-and-rol/' + buss_object + '/' + id_rol;
    return this.userService.validateOptionByToken('Option:getNotOptionsByBusinessObjectAndRol').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Option[]>(url);
        }
      })
    );
  }


  public getByBusinessObject$(business_object: string): Observable<Option[]> {
    const url = this._url + '/get-by-business-object/' + business_object;
    return this.userService.validateOptionByToken('Option:getByBusinessObject').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Option[]>(url);
        }
      })
    );
  }

  public getByAction$(action: string): Observable<Option[]> {
    const url = this._url + '/get-by-action/' + action;
    return this.userService.validateOptionByToken('Option:getByAction').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Option[]>(url);
        }
      })
    );
  }

  public getByRol$(id:number): Observable<Option[]> {
    const url = this._url + '/get-by-rol/' + id;
    return this.userService.validateOptionByToken('Option:getByRol').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Option[]>(url);
        }
      })
    );
  }

  public store$(option: Option): Observable<Option> {
    return this.userService.validateOptionByToken('Option:create').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<Option>(this._url, option);
        }
      })
    );
  }

  public show$(id_option: number): Observable<Option> {
    const url = this._url + '/' + id_option;
    return this.userService.validateOptionByToken('Option:show').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get< Option>(url);
        }
      })
    );
  }

  public delete$(id: number): Observable<Option> {
    const url = this._url + '/' + id.toString();
    return this.userService.validateOptionByToken('Option:delete').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.delete<Option>(url);
        }
      })
    );
  }

  public update$(option: Option): Observable<Option> {
    return this.userService.validateOptionByToken('Option:update').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.put<Option>(this._url, option);
        }
      })
    );
  }
}
