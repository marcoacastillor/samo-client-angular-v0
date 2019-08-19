import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { Position } from '../models/position';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  private _url = environment.url_position;
  
  constructor(
    private http: HttpClient,
    private userService: UserService
    ) {
  }

  public getByEnterpsie$(id_enterprise: number): Observable<Position[]> {
    let url = this._url + '/list/' + id_enterprise;
    return this.userService.validateOptionByToken('Position:getByEnterprise').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Position[]>(url);
        }
      })
    );
  }

  public store$(position: Position): Observable<Position> {
    return this.userService.validateOptionByToken('Position:create').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<Position>(this._url, position);
        }
      })
    );
  }

  public update$(position: Position): Observable<Position> {
    return this.userService.validateOptionByToken('Position:update').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.put<Position>(this._url, position);
        }
      })
    );
  }

  public show$(id_position: number): Observable<Position> {
    const url = this._url + '/' + id_position;
    return this.userService.validateOptionByToken('Position:show').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Position>(url);
        }
      })
    );
  }

  public delete$(id: number): Observable<Position> {
    const url = this._url + '/' + id.toString();
    return this.userService.validateOptionByToken('Position:delete').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.delete<Position>(url);
        }
      })
    );
  }
  
}
