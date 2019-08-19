import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { DetailProductInput } from '../models/detail-product-input';
import { switchMap } from 'rxjs/operators';
import { DataProductCuttingPeriod } from '../models/data-product-cutting-period';

@Injectable({
  providedIn: 'root'
})
export class DetailProductInputService {
  private _url = environment.url_detail_product_input;
  constructor(
    private http: HttpClient,
    private userService: UserService
    ) {
  }

  public getAllByCuttingPeriodAndTypeProduct$(id_cutting_period: number): Observable<DataProductCuttingPeriod> {
    let url = this._url + '/' + id_cutting_period.toString();
    return this.userService.validateOptionByToken('DetailProductInput:getAllByPeriodAndTypeProduct').pipe(
      switchMap(validate => {
        if (validate) {
          return this.http.get<DataProductCuttingPeriod>(url);
        }
      })
    );
  }

  public getByCuttingPeriodAndProduct$(id_period:number,pk_product_unit:number): Observable<number> {
    let url = this._url + '/get-by-period-and-product/' + id_period.toString() + '/' + pk_product_unit.toString();
    return this.userService.validateOptionByToken('DetailProductInput:getByPeriodAndProduct').pipe(
      switchMap(validate => {
        if (validate) {
          return this.http.get<number>(url);
        }
      })
    );
  }

  public store$(detailProductInput: DetailProductInput): Observable<DetailProductInput> {
    return this.userService.validateOptionByToken('DetailProductInput:create').pipe(
      switchMap(validate => {
        if (validate) {
          return this.http.post<DetailProductInput>(this._url, detailProductInput);
        }
      })
    );
  }

  public delete$(id: number): Observable<DetailProductInput> {
    let url = this._url + '/' + id.toString();
    return this.userService.validateOptionByToken('DetailProductInput:delete').pipe(
      switchMap(validate => {
        if (validate) {
          return this.http.delete<DetailProductInput>(url);
        }
      })
    );
  }

  
}
