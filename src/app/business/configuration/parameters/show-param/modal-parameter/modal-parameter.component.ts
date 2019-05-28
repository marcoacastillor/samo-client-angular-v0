import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Parameter } from 'src/app/shared/models/parameter';
import { Category } from 'src/app/shared/models/category';

@Component({
  selector: 'app-modal-parameter',
  templateUrl: 'modal-parameter.component.html',
  styles: []
})
export class ModalParameterComponent implements OnInit {
  @Input() public parameter: Parameter;
  
  @Output() public create = new EventEmitter<Parameter>();
  @Output() public update = new EventEmitter<Parameter>();
  @Output() public cancel = new EventEmitter<boolean>();
  
  constructor() { }

  ngOnInit() {
  }
  
  public onCreate(parameter:Parameter){
    this.create.emit(parameter);
  }

  public onUpdate(parameter:Parameter){
    this.update.emit(parameter);
  }

  public onCancel(param: boolean){
    this.cancel.emit(param);
  }
}
