import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Payment } from 'src/app/shared/models/payment';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-payment',
  templateUrl: 'modal-payment.component.html',
  styles: []
})
export class ModalPaymentComponent implements OnInit {
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
