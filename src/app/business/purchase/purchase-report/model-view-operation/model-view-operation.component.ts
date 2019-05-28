import { Component, OnInit, Input } from '@angular/core';
import { Operation } from 'src/app/shared/models/operation';
import { Purchase } from 'src/app/shared/models/purchase';
import { Enterprise } from 'src/app/shared/models/enterprise';

@Component({
  selector: 'app-model-view-operation',
  templateUrl: 'model-view-operation.component.html',
  styles: []
})
export class ModelViewOperationComponent implements OnInit {
  @Input() public enterprise: Enterprise;
  @Input() public operation: Purchase;
  
  constructor() { }

  ngOnInit() {
  }

}
