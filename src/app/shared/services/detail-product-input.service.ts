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
    return this.userService.validateOptionByToken('DETAIL_PRD_INPUT_GET_DATA').pipe(
      switchMap(validate => {
        if (validate) {
          return this.http.get<DataProductCuttingPeriod>(url);
        }
      })
    );
  }
}
