import { Injectable } from '@angular/core';
import { CuttingPeriod } from '../models/cutting-period';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CuttingPeriodService {
  private _url = environment.url_cutting_period;
  constructor(
    private http: HttpClient,
    private userService: UserService
    ) {
  }

  public getAllByProductionProcess$(id_production_process: number): Observable<CuttingPeriod[]> {
    let url = this._url + '/' + id_production_process.toString();
    return this.userService.validateOptionByToken('CUTT_PERIOD_LIST').pipe(
      switchMap(validate => {
        if (validate) {
          return this.http.get<CuttingPeriod[]>(url);
        }
      })
    );
  }
}
