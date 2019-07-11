import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { User } from '../../shared/models/user';
import { CacheService } from './cache.service';
import { environment } from '../../../environments/environment';
import { StatusMessage } from '../../shared/models/status-message';

@Injectable({
  providedIn: 'root'
})
export class GlobalStoreService {
  private readonly clearMessageDelayMs = environment.clearMessageDelayMs;
  private state: StatusMessage = { code: null, desc: null, serverDesc: 'Exitoso' };
  private userMessage$ = new BehaviorSubject<StatusMessage>(this.state);
  private user$ = new BehaviorSubject(new User());

  constructor(private cache: CacheService) {}

  public selectUserMessage$ = (): Observable<StatusMessage> => this.userMessage$.asObservable();
  public getUser$ = (): Observable<User> => this.user$.asObservable();

  public setUser = (user: User) => {
    this.cache.set('user', user);
    this.user$.next(user);
  }

  public clearSession = () => {
    this.cache.clear();
    this.user$.next(new User);
  }

  public getUser = (): User => this.cache.get('user');

  public dispatchUserMessage = (code: string, userMessage: string) => {
    this.state.code = code;
    this.state.desc = userMessage;
    this.userMessage$.next(this.state);
    const subs = timer(this.clearMessageDelayMs).subscribe(() => {
      this.state.code = null;
      this.state.desc = '';
      this.userMessage$.next(this.state);
      subs.unsubscribe();
    });
  }
}
