import { Component, OnInit } from '@angular/core';
import { GlobalStoreService } from '../../core/services/global-store.service';

@Component({
  selector: 'app-navigator',
  templateUrl: 'navigator.component.html',
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
