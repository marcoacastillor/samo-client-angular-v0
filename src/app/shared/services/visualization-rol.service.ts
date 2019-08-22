import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { VisualizationRol } from '../models/visualization-rol';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VisualizationRolService {
  private _url = environment.url_visualization_rol;
  
  constructor(
    private http: HttpClient,
    private userService: UserService
    ) {}

  public create$(id_module:number,id_component:number,id_rol:number): Observable<VisualizationRol> {
    let url = this._url + '/create/' + id_module +'/'+ id_component + '/' + id_rol;
    return this.userService.validateOptionByToken('VisualizationRol:create').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<VisualizationRol>(url);
        }
      })
    );
  }

  public delete$(id:number):Observable<VisualizationRol>{
    let url = this._url + '/' + id;
    return this.userService.validateOptionByToken('VisualizationRol:delete').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.delete<VisualizationRol>(url)
        }
      })
    )
  }
  
}
