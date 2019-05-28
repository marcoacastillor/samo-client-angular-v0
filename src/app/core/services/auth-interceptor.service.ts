import { Injectable } from '@angular/core';
import { GlobalStoreService } from './global-store.service';
import { User } from '../../shared/models/user';
import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  private user: User;
  constructor(private globalStoreService: GlobalStoreService) {
    this.globalStoreService.getUser$().subscribe((user: User) => (this.user = user));
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({
      'Authorization': this.user.api_token+':'+this.user.fk_id_enterprise,
      'Content-Type': 'application/json'
    });

    const cloneRq = req.clone({headers});
    return next.handle(cloneRq).pipe(tap(null, this.handleError));
  }

  private handleError = err => {
    // let userMessage = 'Fatal error';
    if (err instanceof HttpErrorResponse) {
      if (err.status === 401) {
        this.globalStoreService.dispatchUserMessage(err.status.toString(), err.error.error);
      } else {
        this.globalStoreService.dispatchUserMessage(err.status.toString(), err.error.error);
      }
    }
  }
}