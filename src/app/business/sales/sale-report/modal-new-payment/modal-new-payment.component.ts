import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Payment } from 'src/app/shared/models/payment';

@Component({
  selector: 'app-modal-new-payment',
  templateUrl: 'modal-new-payment.component.html',
  styles: []
})
export class ModalNewPaymentComponent implements OnInit {
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
