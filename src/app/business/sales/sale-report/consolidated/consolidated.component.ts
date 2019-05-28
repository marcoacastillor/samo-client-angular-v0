import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { faEye, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { Operation } from 'src/app/shared/models/operation';
import { Person } from 'src/app/shared/models/person';
import { Payment } from 'src/app/shared/models/payment';

@Component({
  selector: 'app-consolidated',
  templateUrl: 'consolidated.component.html',
  styles: []
})
export class ConsolidatedComponent implements OnInit {
  @Input() public consolidateData: any;

  @Input() public person: Person;
  @Input() public operation: Operation;

  @Output() public onGetOperation = new EventEmitter<number>();
  @Output() public create = new EventEmitter<Payment>();

  faEye = faEye;
  faMoneyBill = faMoneyBill
  
  constructor() { }

  ngOnInit() {
  }

  public selectOperation(pk_id_operation: number)
  {
    this.onGetOperation.emit(pk_id_operation);
  }

  public onCreatePayment(payment: Payment){
    this.create.emit(payment);
  }

}
