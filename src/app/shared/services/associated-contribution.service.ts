import { Injectable } from '@angular/core';
import { AssociatedContribution } from '../models/associated-contribution';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AssociatedContributionService {
  private _url = environment.url_associated_contribution;
  
  constructor(
    private http: HttpClient,
    private userService: UserService
    ) {
  }

  public getByAssociated$(id: number,num_row: number): Observable<AssociatedContribution[]> {
    const url = this._url + '/get-by-associated/'+id+'/'+num_row;
    return this.userService.validateOptionByToken('AssociatedContribution:getByAssociated').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<AssociatedContribution[]>(url);
        }
      })
    );
  }
}
