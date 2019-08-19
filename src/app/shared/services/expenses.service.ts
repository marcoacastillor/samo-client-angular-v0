import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { Results } from '../models/results';
import { switchMap } from 'rxjs/operators';
import { Expense } from '../models/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  private _url = environment.url_expenses;
  constructor(
    private http: HttpClient,
    private userService: UserService
    ) {
  }

  public getAll$(): Observable<Expense[]> {
    return this.userService.validateOptionByToken('Expense:getAll').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Expense[]>(this._url);
        }
      })
    );
  }

  public store$(expense: Expense): Observable<Expense> {
    return this.userService.validateOptionByToken('Expense:create').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<Expense>(this._url, expense);
        }
      })
    );
  }

  public show$(id_expense: number): Observable<Expense> {
    const url = this._url + '/' + id_expense;
    return this.userService.validateOptionByToken('Expense:show').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Expense>(url);
        }
      })
    );
  }

  public delete$(id: number): Observable<Expense> {
    const url = this._url + '/' + id.toString();
    return this.userService.validateOptionByToken('Expense:delete').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.delete<Expense>(url);
        }
      })
    );
  }

  public update$(expense: Expense): Observable<Expense> {
    return this.userService.validateOptionByToken('Expense:update').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.put<Expense>(this._url, expense);
        }
      })
    );
  }

  public getByFilter$(filter: any): Observable<Results> {
    const url = this._url + '/get-by-filter';
    return this.userService.validateOptionByToken('Expense:getByFilter').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<Results>(url,filter);
        }
      })
    );
  }
  
}
