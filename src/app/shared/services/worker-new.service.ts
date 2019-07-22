import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { WorkerNews } from '../models/worker-news';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorkerNewService {
  private _url = environment.url_worker_news;
  
  constructor(
    private http: HttpClient,
    private userService: UserService
    ) {}

  public getInfoByEnterprisePerson$(id: number): Observable<WorkerNews[]> {
    const url = this._url + '/'+id;
    return this.userService.validateOptionByToken('WORKER_NEWS_GET_INFO_BY_CONTRACT').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.get<WorkerNews[]>(url);
        }
      })
    );
  }

  public create$(workerNew: WorkerNews): Observable<WorkerNews> {
    return this.userService.validateOptionByToken('WORKER_NEWS_CRT').pipe(
      switchMap(validate => {
        if(validate){
          return this.http.post<WorkerNews>(this._url, workerNew);
        }
      })
    );
  }
  
  
}
