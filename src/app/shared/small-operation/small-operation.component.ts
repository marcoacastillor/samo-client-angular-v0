import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Operation } from '../models/operation';
import { OperationProduct } from '../models/operation-product';

@Component({
  selector: 'app-small-operation',
  templateUrl: 'small-operation.component.html',
  styles: []
})
export class SmallOperationComponent implements OnInit, OnChanges {
  @Input() public operation: Operation;
  @Input() public lstProducts: OperationProduct[];

  constructor() { }

  ngOnInit() {
  }
  
  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.operation)
    {
      if(changes.operation.currentValue != changes.operation.previousValue)
      {
        this.operation = changes.operation.currentValue;
      }
    }

    if(changes.lstProducts)
    {
      if(changes.lstProducts.currentValue != changes.lstProducts.previousValue)
      {
        this.lstProducts = changes.lstProducts.currentValue;
      }
    }
  }

}
