import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeService } from '../models/type-service';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TypeServiceService {
  private _url = environment.url_type_service;
  
  constructor(
    private http: HttpClient,
    private userService: UserService
    ) {
  }

  public getAll$(): Observable<TypeService[]> {
    return this.userService.validateOptionByToken('TYPE_SERVICE_LIST').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<TypeService[]>(this._url);
        }
      })
    );
  }

  public getBySizes$(size:string): Observable<TypeService[]> {
    let url = this._url + '/get-by-sizes-enterprise/' + size.trim();
    return this.userService.validateOptionByToken('TYPE_SERVICE_GET_BY_SIZE').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<TypeService[]>(url);
        }
      })
    );
  }

  public store$(typService: TypeService): Observable<TypeService> {
    return this.userService.validateOptionByToken('TYPE_SERVICE_CRT').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<TypeService>(this._url, typService);
        }
      })
    );
  }

  public update$(typseService: TypeService): Observable<TypeService> {
    return this.userService.validateOptionByToken('TYPE_SERVICE_UPD').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.put<TypeService>(this._url, typseService);
        }
      })
    );
  }

  public show$(id_type_service: number): Observable<TypeService> {
    const url = this._url + '/' + id_type_service;
    return this.userService.validateOptionByToken('TYPE_SERVICE_SHOW').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<TypeService>(url);
        }
      })
    );
  }

  public delete$(id: number): Observable<TypeService> {
    const url = this._url + '/' + id.toString();
    return this.userService.validateOptionByToken('TYPE_SERVICE_DEL').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.delete<TypeService>(url);
        }
      })
    );
  }
}
