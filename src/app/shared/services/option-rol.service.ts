import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { RolOption } from '../models/rol-option';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';

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
}
