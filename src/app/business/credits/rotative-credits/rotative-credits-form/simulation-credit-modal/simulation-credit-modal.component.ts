import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { CreditPayment } from 'src/app/shared/models/credit-payment';

@Component({
  selector: 'app-simulation-credit-modal',
  templateUrl: 'simulation-credit-modal.component.html',
  styles: []
})
export class SimulationCreditModalComponent implements OnInit {

  @Input() public value_payment: number;
  @Input() public value_total: number;
  @Input() public num_fees: number;
  @Input() public month_interest: number;
  @Input() public time_interest: string;
    
  lstPayments: CreditPayment[] = [];
  
  constructor() { }

  ngOnInit() {
    this.generatePayments();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.value_payment)
    {
      if(changes.value_payment.currentValue != changes.value_payment.previousValue)
      {
        this.value_payment = changes.value_payment.currentValue
      }  
    }

    if(changes.value_total)
    {
      if(changes.value_total.currentValue != changes.value_total.previousValue)
      {
        this.value_total = changes.value_total.currentValue
      }
    }

    if(changes.num_fees)
    {
      if(changes.num_fees.currentValue != changes.num_fees.previousValue)
      {
        this.num_fees = changes.num_fees.currentValue
      }
    }

    if(changes.month_interest)
    {
      if(changes.month_interest.currentValue != changes.month_interest.previousValue)
      {
        this.month_interest = changes.month_interest.currentValue
      }
    }

    if(changes.time_interest)
    {
      if(changes.time_interest.currentValue != changes.time_interest.previousValue)
      {
        this.time_interest = changes.time_interest.currentValue
      }
    }
    this.generatePayments();
  }

  private generatePayments(){
    this.lstPayments = [];
    let balance = this.value_total;
    
    for(let i=0; i<this.num_fees; i++){
      let credit_payment = new CreditPayment;
      credit_payment.number_fee = i+1;
      credit_payment.normal_payment_value = this.value_payment;

      if(this.time_interest == 'Anual'){
        credit_payment.interest_value = Math.round(balance * ((this.month_interest/12) / 100));
      }else{
        credit_payment.interest_value = Math.round(balance * (this.month_interest / 100));
      }
      credit_payment.capital_value = Math.round(this.value_payment - credit_payment.interest_value);
      balance = Math.round(balance - credit_payment.capital_value);
      credit_payment.payment_received = balance;
      
      this.lstPayments.push(credit_payment);
    }
  }

}
