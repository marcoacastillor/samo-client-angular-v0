import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ParameterConfig } from 'src/app/shared/models/parameter-config';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-parameter',
  templateUrl:'list-parameter.component.html',
  styles: []
})
export class ListParameterComponent implements OnInit {
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;

  current_invoice = environment.current_invoice;
  current_sale = environment.current_sale;
  
  @Input() public parametersList: ParameterConfig[];
  @Output() public select = new EventEmitter<ParameterConfig>();
  @Output() public delete = new EventEmitter<Number>();


  constructor() { }

  ngOnInit() {
  }

  updateParameter(parameter: ParameterConfig){
    this.select.emit(parameter);
  }

  deleteParameter(id: number){
    this.delete.emit(id);
  }

}
