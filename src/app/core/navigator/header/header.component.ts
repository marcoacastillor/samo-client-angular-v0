import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../shared/models/user';
import { StatusMessage } from '../../../shared/models/status-message';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  @Input() public user: User;
  @Input() public message: StatusMessage;

  refreshMsgSales: string = '';
  refreshMsgUsers: string = '';

  constructor(
    private authService: AuthenticationService
  ) {
  }
  ngOnInit() {
  }

  refreshRoutesSales(){
    this.authService.refreshSales().subscribe(
      msg => this.refreshMsgSales = msg
    )
  }

  refreshRoutesUsers(){
    this.authService.refreshUsers().subscribe(
      msg => this.refreshMsgUsers = msg
    )
  }
}
