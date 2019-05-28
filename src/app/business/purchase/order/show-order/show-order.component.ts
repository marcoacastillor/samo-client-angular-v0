import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Operation } from 'src/app/shared/models/operation';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { faChevronCircleRight, faPhoneSquare, faAddressBook, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment.prod';
import { Payment } from 'src/app/shared/models/payment';

@Component({
  selector: 'app-show-order',
  templateUrl: 'show-order.component.html',
  styles: []
})
export class ShowOrderComponent implements OnInit {
  public payment_type_payed: string = '';
  public credit_payment: string = '';

  faPlusCircle = faPlusCircle;
  
  @Input() public operation: Operation;
  @Input() public enterprise: Enterprise;

  @Output() public create = new EventEmitter<Payment>();
  
  constructor() { }

  ngOnInit() {
    this.payment_type_payed = environment.state_payment_purchase;
    this.credit_payment = environment.credit_payment;
  }

  public onCreatePayment(payment: Payment){
    this.create.emit(payment);
  }

}
