import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-show-user',
  templateUrl: 'show-user.component.html',
  styles: []
})
export class ShowUserComponent implements OnInit {
  @Input() public user: User;
  @Output() public cancel = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  public cancelUser() {
    this.cancel.emit(false);
  }

}
