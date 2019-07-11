import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { faThList } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-show-user',
  templateUrl: 'show-user.component.html',
  styles: []
})
export class ShowUserComponent implements OnInit {
  faThList = faThList;
  
  @Input() public user: User;
  @Output() public cancel = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  public cancelUser() {
    this.cancel.emit(true);
  }

}
