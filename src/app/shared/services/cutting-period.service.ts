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

  public show$(id:number): Observable<CuttingPeriod> {
    let url = this._url + '/' + id.toString();
    return this.userService.validateOptionByToken('CuttingPeriod:show').pipe(
      switchMap(validate => {
        if (validate) {
          return this.http.get<CuttingPeriod>(url);
        }
      })
    );
  }

  public getAllByProductionProcess$(id_production_process: number): Observable<CuttingPeriod[]> {
    let url = this._url + '/get-by-period/' + id_production_process.toString();
    return this.userService.validateOptionByToken('CuttingPeriod:getByPeriod').pipe(
      switchMap(validate => {
        if (validate) {
          return this.http.get<CuttingPeriod[]>(url);
        }
      })
    );
  }

  public getAllByEnterprise$(id_enterprise:number): Observable<CuttingPeriod[]> {
    let url = this._url + '/get-all-by-enterprise/' + id_enterprise.toString();
    return this.userService.validateOptionByToken('CuttingPeriod:getAllByEnterprise').pipe(
      switchMap(validate => {
        if (validate) {
          return this.http.get<CuttingPeriod[]>(url);
        }
      })
    );
  }

  public getAllActiveSettlementByEnterprise$(id_enterprise:number): Observable<CuttingPeriod[]> {
    let url = this._url + '/get-all-active-settlement-by-enterprise/' + id_enterprise.toString();
    return this.userService.validateOptionByToken('CuttingPeriod:getActiveSettlementByEnterprise').pipe(
      switchMap(validate => {
        if (validate) {
          return this.http.get<CuttingPeriod[]>(url);
        }
      })
    );
  }

  public getActivePeriodByProductionProcess$(id_production_process:number): Observable<CuttingPeriod> {
    let url = this._url + '/get-active-by-production-process/' + id_production_process.toString();
    return this.userService.validateOptionByToken('CuttingPeriod:getActiveByProductionProcess').pipe(
      switchMap(validate => {
        if (validate) {
          return this.http.get<CuttingPeriod>(url);
        }
      })
    );
  }


  public store$(cuttingPeriod: CuttingPeriod): Observable<CuttingPeriod> {
    return this.userService.validateOptionByToken('CuttingPeriod:create').pipe(
      switchMap(validate => {
        if (validate) {
          return this.http.post<CuttingPeriod>(this._url,cuttingPeriod);
        }
      })
    );
  }

  public delete$(id: number): Observable<CuttingPeriod> {
    let url = this._url + '/' + id.toString();
    return this.userService.validateOptionByToken('CuttingPeriod:delete').pipe(
      switchMap(validate => {
        if (validate) {
          return this.http.delete<CuttingPeriod>(url);
        }
      })
    );
  }
  
}
