import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Operation } from 'src/app/shared/models/operation';
import { Parameter } from 'src/app/shared/models/parameter';

@Component({
  selector: 'app-modal-show-order-file',
  templateUrl: 'modal-show-order-file.component.html',
  styles: []
})
export class ModalShowOrderFileComponent implements OnInit {
  @Input() public data: any;
  @Input() public operation: Operation;
  @Input() public lstParams: Parameter[];

  @Output() public create = new EventEmitter<Operation>();
  
  constructor() { }

  ngOnInit() {
  }

  public onCreate(operation:Operation){
    this.create.emit(operation)
  }

}
