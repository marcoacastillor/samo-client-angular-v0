import { Component, OnInit } from '@angular/core';
import { GlobalStoreService } from '../../core/services/global-store.service';

@Component({
  selector: 'app-navigator',
  template: `
  <div class="container-fluid">
    <app-header [user]="user$ | async" [message]="userMessage$ | async"></app-header>
  </div>
  <div class="container-fluid margin-top-body text-small">
    <app-main></app-main>
    <hr>
    <app-footer></app-footer>
    <hr>
  </div>
  `,
  styles: []
})
export class NavigatorComponent implements OnInit {
  public userMessage$;
  public user$;
  constructor(private globalStorageService: GlobalStoreService) { }

  ngOnInit() {
    this.getMessage();
    this.getUser();
  }

  private getMessage() {
    this.userMessage$ = this.globalStorageService.selectUserMessage$();
  }

  private getUser(){
    this.user$ = this.globalStorageService.getUser$();
  }

}
