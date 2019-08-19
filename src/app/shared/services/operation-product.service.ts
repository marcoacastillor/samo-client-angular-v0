import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { OperationProduct } from '../models/operation-product';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OperationProductService {
  private _url = environment.url_operation_product;
  constructor(
    private http: HttpClient,
    private userService: UserService
    ) {
  }

  public getProductsByOperation$(id_operation: number): Observable<OperationProduct[]> {
    let url = this._url + '/get-by-operation/' + id_operation.toString();
    return this.userService.validateOptionByToken('OperationProduct:getByOperation').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<OperationProduct[]>(url);
        }
      })
    );
  }
  
  public store$(product: any): Observable<OperationProduct> {
    return this.userService.validateOptionByToken('OperationProduct:create').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<OperationProduct>(this._url, product);
        }
      })
    );
  }

  public delete$(id:number): Observable<OperationProduct> {
    let url = this._url + '/' + id.toString();
    return this.userService.validateOptionByToken('OperationProduct:delete').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.delete<OperationProduct>(url);
        }
      })
    );
  }

}
