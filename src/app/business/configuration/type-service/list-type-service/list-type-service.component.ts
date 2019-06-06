import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faEye, faTrashAlt, faEdit, faBan, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { TypeService } from 'src/app/shared/models/type-service';

@Component({
  selector: 'app-list-type-service',
  templateUrl: 'list-type-service.component.html',
  styles: []
})
export class ListTypeServiceComponent implements OnInit {
  faEye = faEye;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  fasFaBan = faBan;
  faPlusCircle = faPlusCircle;

  @Input() public typeServiceList: TypeService[];

  @Output() public delete = new EventEmitter<number>();
  @Output() public load = new EventEmitter<TypeService>();
  
  constructor() { }

  ngOnInit() {

  }

  deleteTypeService(id:number){
    this.delete.emit(id);
  }

  loadTypeService(typeService: TypeService){
    this.load.emit(typeService);
  }

  newTypeService(){
    let typeService = new TypeService;
    this.load.emit(typeService);
  }

}
