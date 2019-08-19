import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { faThList } from '@fortawesome/free-solid-svg-icons';
import { Person } from 'src/app/shared/models/person';
import { Enterprise } from 'src/app/shared/models/enterprise';

@Component({
  selector: 'app-show-user',
  templateUrl: 'show-user.component.html',
  styles: []
})
export class ShowUserComponent implements OnInit {
  faThList = faThList;
  
  @Input() public user: User;
  @Input() public person: Person;
  @Input() public enterprise: Enterprise;

  @Output() public cancel = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  public cancelUser() {
    this.cancel.emit(true);
  }

}
