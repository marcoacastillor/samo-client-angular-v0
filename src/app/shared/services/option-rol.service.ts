import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { RolOption } from '../models/rol-option';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { Option } from '../models/option';

@Injectable()
export class OptionRolService {
  private _url = environment.url_rol_option;
  constructor(
    private http: HttpClient,
    private userService: UserService
    ) {
  }

  public getModulesByRol$(rol_option: RolOption): Observable<boolean> {
    return this.userService.validateOptionByToken('OptionRol:getModulesByRol').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<boolean>(this._url,rol_option);
        }
      })
    );
  }

  public create$(pk_id_option:number,pk_id_rol:number):Observable<Option>{
    let url = this._url + '/create/' + pk_id_option + '/' + pk_id_rol;
    return this.userService.validateOptionByToken('OptionRol:create').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Option>(url);
        }
      })
    );
  }

  public delete$(id:number):Observable<any>{
    let url = this._url + '/' + id;
    return this.userService.validateOptionByToken('OptionRol:delete').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.delete<any>(url);
        }
      })
    );
  }
}
