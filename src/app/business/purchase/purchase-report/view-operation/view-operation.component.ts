import { Component, OnInit, Input } from '@angular/core';
import { Purchase } from 'src/app/shared/models/purchase';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-operation',
  templateUrl: 'view-operation.component.html',
  styles: []
})
export class ViewOperationComponent implements OnInit {
  public credit_payment: string = environment.credit_payment;
  @Input() public operation: Purchase;
  @Input() public enterprise: Enterprise;

  constructor() { }

  ngOnInit() {
  }

}
