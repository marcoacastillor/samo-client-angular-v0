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
    return this.userService.validateOptionByToken('OP_PRD_GET_BY_PURCHAE').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<OperationProduct[]>(url);
        }
      })
    );
  }  
}
