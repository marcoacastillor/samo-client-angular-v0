import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { LaboralCondition } from '../models/laboral-condition';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LaboralConditionService {
  private _url = environment.url_laboral_condition;
  
  constructor(
    private http: HttpClient,
    private userService: UserService
    ) {}

  public getInfoByEnterprisePerson$(id: number): Observable<LaboralCondition> {
    const url = this._url + '/'+id;
    return this.userService.validateOptionByToken('LABORAL_CONDITION_GET_INFO_BY_CONTRACT').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<LaboralCondition>(url);
        }
      })
    );
  }

  public create$(laboralCondition: LaboralCondition): Observable<LaboralCondition> {
    return this.userService.validateOptionByToken('LABORAL_CONDITION_CRT').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<LaboralCondition>(this._url, laboralCondition);
        }
      })
    );
  }

  public update$(laboralCondition: LaboralCondition): Observable<LaboralCondition> {
    return this.userService.validateOptionByToken('LABORAL_CONDITION_UPD').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.put<LaboralCondition>(this._url, laboralCondition);
        }
      })
    );
  }
}
