import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { PayingEmployee } from '../models/paying-employee';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PayingEmployeeService {
  private _url = environment.url_payment_employee;
  
  constructor(
    private http: HttpClient,
    private userService: UserService
    ) {}

  public getInfoByEnterprisePerson$(id: number): Observable<PayingEmployee[]> {
    const url = this._url + '/'+id;
    return this.userService.validateOptionByToken('PAYING_EMPLOYEE_GET_INFO_BY_CONTRACT').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<PayingEmployee[]>(url);
        }
      })
    );
  }
}
