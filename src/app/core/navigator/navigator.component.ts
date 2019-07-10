import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GlobalStoreService } from '../../core/services/global-store.service';
import { faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navigator',
  templateUrl: 'navigator.component.html',
})
export class NavigatorComponent implements OnInit {
  faHome = faHome;
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
