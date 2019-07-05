import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../shared/models/user';
import { StatusMessage } from '../../../shared/models/status-message';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  @Input() public user: User;
  @Input() public message: StatusMessage;

  constructor() {
  }
  ngOnInit() {
  }
}
