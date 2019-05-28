import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faEye, faTrashAlt, faEdit, faBan, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Module } from 'src/app/shared/models/module';

@Component({
  selector: 'app-list-module',
  templateUrl:'list-module.component.html',
  styles: []
})
export class ListModuleComponent implements OnInit {
  faEye = faEye;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  fasFaBan = faBan;
  faPlusCircle = faPlusCircle;

  @Input() public moduleList: Module[];
  @Output() public newModule = new EventEmitter<Module>();
  @Output() public delModule = new EventEmitter<number>();
  @Output() public showModule = new EventEmitter<number>();
  
  constructor() { }

  ngOnInit() {
  }

  public onNew() {
    let module = new Module;
    this.newModule.emit(module);
  }

  public deleteModule(id: number) {
    this.delModule.emit(id);
  }

  public updateModule(module: Module) {
    this.newModule.emit(module);
  }

  public viewModule(id: number) {
    this.showModule.emit(id);
  }
}
