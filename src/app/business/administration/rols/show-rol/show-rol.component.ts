import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Rol } from 'src/app/shared/models/rol';
import { Module } from 'src/app/shared/models/module';
import { faThList } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-show-rol',
  templateUrl: 'show-rol.component.html',
  styles: []
})
export class ShowRolComponent implements OnInit {
  faThList = faThList;

  @Input() public rol: Rol;
  @Input() public moduleList: Module[];
  @Output() public cancel = new EventEmitter<boolean>();
  
  constructor() { }

  ngOnInit() {
  }

  public cancelRol() {
    this.cancel.emit(true);
  }
}
