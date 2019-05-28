import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { Purchase } from 'src/app/shared/models/purchase';
import { faEye, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { Payment } from 'src/app/shared/models/payment';

@Component({
  selector: 'app-pending-receive',
  templateUrl: 'pending-receive.component.html',
  styles: []
})
export class PendingReceiveComponent implements OnInit, OnChanges {
  faEye = faEye;
  faMoneyBill = faMoneyBill
  
  @Input() public pendingReceive: any;
  @Input() public operations: any;
  
  @Input() public enterprise: Enterprise;
  @Input() public operation: Purchase;

  @Output() public onGetOperation = new EventEmitter<number>();
  @Output() public create = new EventEmitter<Payment>();
  
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.operation)
    {
      if(changes.operation.currentValue)
      {
        this.operation = changes.operation.currentValue;
      }
    }
  }

  public selectOperation(pk_id_operation: number)
  {
    this.onGetOperation.emit(pk_id_operation);
  }

  public onCreatePayment(payment: Payment){
    this.create.emit(payment);
  }

}
