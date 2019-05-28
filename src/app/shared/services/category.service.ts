import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private _url = environment.url_category;
  constructor(
    private http: HttpClient,
    private userService: UserService
    ) {
  }

  public getAll$(): Observable<Category[]> {
    return this.userService.validateOptionByToken('CAT_LIST').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Category[]>(this._url);
        }
      })
    );
  }

  public store$(cmp: Category): Observable<Category> {
    return this.userService.validateOptionByToken('CAT_CRT').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<Category>(this._url, cmp);
        }
      })
    );
  }

  public show$(id_cmp: number): Observable<Category> {
    const url = this._url + '/' + id_cmp;
    return this.userService.validateOptionByToken('COMP_SHOW').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Category>(url);
        }
      })
    );
  }

  public update$(cmp: Category): Observable<Category> {
    return this.userService.validateOptionByToken('CAT_UPD').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.put<Category>(this._url, cmp);
        }
      })
    );
  }

  public delete$(id: number): Observable<Category> {
    const url = this._url + '/' + id.toString();
    return this.userService.validateOptionByToken('CAT_DEL').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.delete<Category>(url);
        }
      })
    );
  }
}