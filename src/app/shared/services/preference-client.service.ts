import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { PreferenceClient } from '../models/preference-client';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PreferenceClientService {
  private _url = environment.url_preference_client;
  constructor(
    private http: HttpClient,
    private userService: UserService
    ) {
  }

  public getByPerson$(id_person: number): Observable<PreferenceClient> {
    let url = this._url + '/get-by-person/' + id_person.toString();
    return this.userService.validateOptionByToken('PREF_CLIENT_GET_BY_PERSON').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<PreferenceClient>(url);
        }
      })
    );
  }

  public create$(preferceClient: PreferenceClient): Observable<PreferenceClient> {
    return this.userService.validateOptionByToken('PREF_CLIENT_CREATE').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<PreferenceClient>(this._url, preferceClient);
        }
      })
    );
  }

  public update$(preferceClient: PreferenceClient): Observable<PreferenceClient> {
    return this.userService.validateOptionByToken('PREF_CLIENT_UPDATE').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.put<PreferenceClient>(this._url, preferceClient);
        }
      })
    );
  }
}
