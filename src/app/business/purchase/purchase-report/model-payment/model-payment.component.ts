import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Operation } from 'src/app/shared/models/operation';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { Payment } from 'src/app/shared/models/payment';

@Component({
  selector: 'app-model-payment',
  templateUrl: 'model-payment.component.html',
  styles: []
})
export class ModelPaymentComponent implements OnInit {
  @Input() public pk_id_operation: number;
  @Input() public value_payment: number;

  @Output() public create = new EventEmitter<Payment>();

  constructor() { }

  ngOnInit() {
  
  }

  public onCreate(payment: Payment){
    this.create.emit(payment);
  }

}
