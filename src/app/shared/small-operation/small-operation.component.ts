import { Component, OnInit, Input } from '@angular/core';
import { Operation } from '../models/operation';
import { OperationProduct } from '../models/operation-product';

@Component({
  selector: 'app-small-operation',
  templateUrl: 'small-operation.component.html',
  styles: []
})
export class SmallOperationComponent implements OnInit {
  @Input() public operation: Operation;
  @Input() public lstProducts: OperationProduct[];

  constructor() { }

  ngOnInit() {
  }

}
