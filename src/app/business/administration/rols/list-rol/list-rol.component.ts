import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faEye, faTrashAlt, faEdit, faBan, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Rol } from 'src/app/shared/models/rol';

@Component({
  selector: 'app-list-rol',
  templateUrl: 'list-rol.component.html',
  styles: []
})
export class ListRolComponent implements OnInit {
  faEye = faEye;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  fasFaBan = faBan;
  faPlusCircle = faPlusCircle;

  @Input() public rolList: Rol[];
  @Output() public newRol = new EventEmitter<Rol>();
  @Output() public delRol = new EventEmitter<number>();
  @Output() public showRol = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  public onNew() {
    let rol = new Rol;
    this.newRol.emit(rol);
  }

  public updateRol(rol: Rol) {
    this.newRol.emit(rol);
  }

  public deleteRol(id: number) {
    this.delRol.emit(id);
  }

  public viewRol(id: number) {
    this.showRol.emit(id);
  }
}
