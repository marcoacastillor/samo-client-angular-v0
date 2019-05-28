import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { faEye, faTrashAlt, faEdit, faBan, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-user',
  templateUrl: 'list-user.component.html',
  styles: []
})
export class ListUserComponent implements OnInit {
  faEye = faEye;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  fasFaBan = faBan;
  faPlusCircle = faPlusCircle;

  public active = environment.state_rol_person_active;

  @Input() public userList: User[];
  @Output() public newUser = new EventEmitter<User>();
  @Output() public delUser = new EventEmitter<number>();
  @Output() public showUser = new EventEmitter<number>();
  @Output() public inactiveUser = new EventEmitter<User>();
  

  constructor() { }

  ngOnInit() {
  }

  public onNew() {
    let user = new User;
    this.newUser.emit(user);
  }

  public updateUser(user: User) {
    this.newUser.emit(user);
  }

  public deleteUser(id: number) {
    this.delUser.emit(id);
  }

  public viewUser(id: number) {
    this.showUser.emit(id);
  }

  public blockUser(user: User) {
    this.inactiveUser.emit(user);
  }

}
