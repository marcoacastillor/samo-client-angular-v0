import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { Operation } from 'src/app/shared/models/operation';
import { Payment } from 'src/app/shared/models/payment';

@Component({
  selector: 'app-form-payment-modal',
  templateUrl: 'form-payment-modal.component.html',
  styles: []
})
export class FormPaymentModalComponent implements OnInit {
  paymentForm: FormGroup;
  faSave = faSave;

  @Input() public operation: Operation;
  @Output() public addPayment = new EventEmitter<Payment>();
  
  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.operation)
    {
      if(changes.operation.currentValue != changes.operation.previousValue)
      {
        this.initForm();
      }
    }
  }

  private initForm(){
    this.paymentForm = this.fb.group({
      fk_id_operation: [this.operation.pk_id_operation],
      value_payment: [0],
    })
  }

  add(){
    this.addPayment.emit(this.paymentForm.value);
    this.initForm();
  }

}
