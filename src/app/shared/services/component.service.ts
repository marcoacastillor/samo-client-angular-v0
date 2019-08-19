import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { MComponent } from '../models/m-component';
import { UserService } from './user.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {
  private _url = environment.url_component;
  constructor(
    private http: HttpClient,
    private userService: UserService
    ) {
  }

  public getAll$(): Observable<MComponent[]> {
    return this.userService.validateOptionByToken('Component:getAll').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<MComponent[]>(this._url);
        }
      })
    );
  }

  public store$(cmp: MComponent): Observable<MComponent> {
    return this.userService.validateOptionByToken('Component:create').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<MComponent>(this._url, cmp);
        }
      })
    );
  }

  public addOptionsByComponent$(options_component: any): Observable<MComponent> {
    const url = this._url + '/asign-options'
    return this.userService.validateOptionByToken('Component:asignOptions').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<MComponent>(url, options_component);
        }
      })
    );
  }

  public show$(id_cmp: number): Observable<MComponent> {
    const url = this._url + '/' + id_cmp;
    return this.userService.validateOptionByToken('Component:show').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<MComponent>(url);
        }
      })
    );
  }

  public update$(cmp: MComponent): Observable<MComponent> {
    return this.userService.validateOptionByToken('Component:update').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.put<MComponent>(this._url, cmp);
        }
      })
    );
  }

  public delete$(id: number): Observable<MComponent> {
    const url = this._url + '/' + id.toString();
    return this.userService.validateOptionByToken('Component:delete').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.delete<MComponent>(url);
        }
      })
    );
  }

  public getComponentsByModule$(id_module: number): Observable<MComponent[]> {
    const url = this._url + '/get-components-by-module/' + id_module;
    return this.userService.validateOptionByToken('Component:getByModule').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<MComponent[]>(url);
        }
      })
    );
  }
}
