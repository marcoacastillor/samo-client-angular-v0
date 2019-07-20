import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Notes } from '../models/notes';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private _url = environment.url_notes;
  constructor(
    private http: HttpClient,
    private userService: UserService
    ) {
  }

  public getNotesByOperation$(id_operation: number): Observable<Notes[]> {
    let url = this._url + '/get-by-operation/' + id_operation.toString();
    return this.userService.validateOptionByToken('NOTE_GET_BY_OPERATION').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<Notes[]>(url);
        }
      })
    );
  }  
  
}
