import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { ProductionProcess } from '../models/production-process';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductionProcessService {
  private _url = environment.url_production_process;
  constructor(
    private http: HttpClient,
    private userService: UserService
    ) {
  }

  public getAllByEnterprise$(id_enterprise: number): Observable<ProductionProcess[]> {
    let url = this._url + '/' + id_enterprise.toString();
    return this.userService.validateOptionByToken('PRD_PRCSS_LIST').pipe(
      switchMap(validate => {
        if (validate) {
          return this.http.get<ProductionProcess[]>(url);
        }
      })
    );
  }
}
