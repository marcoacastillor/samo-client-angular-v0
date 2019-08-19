import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Module } from '../models/module';
import { UserService } from './user.service';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class ModuleService {
  private _url = environment.url_module;
  
  constructor(
    private http: HttpClient,
    private userService: UserService
    ) {}

  public getAll$(): Observable<Module[]> {
    return this.userService.validateOptionByToken('Module:getAll').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Module[]>(this._url);
        }
      })
    );
  }

  public show$(id_module: number): Observable<Module> {
    const url = this._url + '/' +id_module;
    return this.userService.validateOptionByToken('Module:show').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Module>(url);
        }
      })
    );
  }

  public store$(module: Module): Observable<Module> {
    return this.userService.validateOptionByToken('Module:create').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<Module>(this._url, module);
        }
      })
    );
  }

  public update$(module: Module): Observable<Module> {
    return this.userService.validateOptionByToken('Module:update').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.put<Module>(this._url, module);
        }
      })
    );
  }

  public getAllDetailed$(id_rol: number): Observable<Module[]> {
    const url = this._url + '/get-modules-detailed/'+id_rol;

    return this.userService.validateOptionByToken('Module:getModulesDetailed').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Module[]>(url);
        }
      })
    );
  }

  public getModulesByRol$(id_rol: String): Observable<Module[]> {
    const url = this._url + '/get-modules-by-rol/' + id_rol;

    return this.userService.validateOptionByToken('Module:getByRol').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Module[]>(url);
        }
      })
    );
  }
  
  public delete$(id: number): Observable<Module> {
    const url = this._url + '/' + id.toString();
    return this.userService.validateOptionByToken('Module:delete').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.delete<Module>(url);
        }
      })
    );
  }
}
