import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Parameter } from 'src/app/shared/models/parameter';
import { Person } from 'src/app/shared/models/person';

@Component({
  selector: 'app-modal-person',
  templateUrl: 'modal-person.component.html',
  styles: []
})
export class ModalPersonComponent implements OnInit {
  //Datos para crear usuario
  @Input() public typesIdList: Parameter[];
  @Input() public postitionList : Parameter[];
  @Input() public pk_id_enterprise : number;
  @Input() public laboralStateList : Parameter[];
  @Input() public salaryTypeList : Position[];
  
  @Input() public positionList : Parameter[];
  @Output() public create = new EventEmitter<Person>();
  
  constructor() { }
  
  ngOnInit() {
  }

  public onCreate(person: Person){
    this.create.emit(person);
  }

}
