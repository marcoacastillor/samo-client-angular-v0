import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rol } from '../models/rol';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable()
export class RolService {
  private _url = environment.url_rol;
  constructor(
    private http: HttpClient,
    private userService: UserService
    ) {
  }

  public getAll$(): Observable<Rol[]> {
    return this.userService.validateOptionByToken('Rol:getAll').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Rol[]>(this._url);
        }
      })
    );
  }

  public store$(rol: Rol): Observable<Rol> {
    return this.userService.validateOptionByToken('Rol:create').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<Rol>(this._url, rol);
        }
      })
    );
  }

  public show$(id_rol: number): Observable<Rol> {
    const url = this._url + '/' + id_rol;
    return this.userService.validateOptionByToken('Rol:show').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Rol>(url);
        }
      })
    );
  }

  public delete$(id: number): Observable<Rol> {
    const url = this._url + '/' + id.toString();
    return this.userService.validateOptionByToken('Rol:delete').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.delete<Rol>(url);
        }
      })
    );
  }

  public getRolWithOptions$(id: number): Observable<Rol> {
    const url = this._url + '/get-options-selected-by-rol/' +id.toString();
    return this.userService.validateOptionByToken('Rol:getWithOptions').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Rol>(url);
        }
      })
    );
  }

  public update$(Rol: Rol): Observable<Rol> {
    return this.userService.validateOptionByToken('Rol:update').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.put<Rol>(this._url, Rol);
        }
      })
    );
  }
}
