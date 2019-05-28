import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Person } from 'src/app/shared/models/person';
import { Operation } from 'src/app/shared/models/operation';
import { Payment } from 'src/app/shared/models/payment';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-show-invoice',
  templateUrl: 'show-invoice.component.html',
  styles: []
})
export class ShowInvoiceComponent implements OnInit {
  public credit_payment: string = environment.state_payment_purchase;;
  faPlusCircle = faPlusCircle;
  public payment_type_payed: string = '';
  @Input() public operation: Operation;
  @Input() public client: Person;

  @Output() public create = new EventEmitter<Payment>();
  
  constructor() { }

  ngOnInit() {
    this.credit_payment = environment.credit_payment;
    this.payment_type_payed = environment.state_payment_purchase;
  }

  public onCreatePayment(payment: Payment){
    this.create.emit(payment);
  }

}
