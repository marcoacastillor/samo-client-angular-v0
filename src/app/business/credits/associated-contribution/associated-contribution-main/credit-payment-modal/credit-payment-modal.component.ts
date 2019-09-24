import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CreditAssociated } from 'src/app/shared/models/credit-associated';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { CreditPayment } from 'src/app/shared/models/credit-payment';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { AssociatedInfo } from 'src/app/shared/models/associated-info';
import * as moment from 'moment';

@Component({
  selector: 'app-credit-payment-modal',
  templateUrl: 'credit-payment-modal.component.html',
  styles: []
})
export class CreditPaymentModalComponent implements OnInit {
  faSave = faSave;
  
  paymentForm: FormGroup;

  @Input() public selectedCredit: CreditAssociated;
  @Input() public creditPaymentSelected: CreditPayment;
  @Input() public associatedSelected: AssociatedInfo;
  
  
  @Output() public create = new EventEmitter<CreditPayment>();

  contribution = 0;
  now = moment();
  program = moment();
  days_late = 0;

  constructor(
    private formToolService: FormToolsService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.initForm()
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.creditPaymentSelected)
    {
      if(changes.creditPaymentSelected.currentValue != changes.creditPaymentSelected.previousValue)
      {
        this.now = moment();
        this.program = moment(this.creditPaymentSelected.scheduled_payment_date);
        this.days_late = this.now.diff(this.program,'days');
        this.initForm()
      }  
    }

    if(changes.associatedSelected)
    {
      if(changes.associatedSelected.currentValue != changes.associatedSelected.previousValue)
      {
        this.associatedSelected = changes.associatedSelected.currentValue;
        if(this.associatedSelected.period_contribution == 'Anual'){
          this.contribution = this.associatedSelected.min_contribution / 12;
        }else{
          this.contribution = this.associatedSelected.min_contribution;
        }
      }  
    }

  }

  private initForm(){
    let min = 0;
    let value = 0;
    let max = 0;

    max = Number(this.creditPaymentSelected.interest_value) + Number(this.creditPaymentSelected.additional_charge) + Number(this.selectedCredit.balance_credit);
    if(this.selectedCredit.balance_credit >= (this.creditPaymentSelected.interest_value + this.creditPaymentSelected.additional_charge)){
      min = Number(this.creditPaymentSelected.interest_value) + Number(this.creditPaymentSelected.additional_charge);
      value = Number(this.creditPaymentSelected.payment_received) + Number(this.creditPaymentSelected.additional_charge);
    }
    else{
      min = Number(this.creditPaymentSelected.interest_value) + Number(this.creditPaymentSelected.additional_charge);
      value = Number(this.selectedCredit.balance_credit) + Number(this.creditPaymentSelected.interest_value) + Number(this.creditPaymentSelected.additional_charge);
    }
    this.paymentForm = this.fb.group({
      fk_id_credit_associated: [this.selectedCredit.pk_id_credit_associated],
      number_fee: [this.creditPaymentSelected.number_fee],
      normal_payment_value: [this.creditPaymentSelected.normal_payment_value],
      interest_value: [this.creditPaymentSelected.interest_value],
      capital_value: [ (this.creditPaymentSelected.payment_received) - (this.creditPaymentSelected.interest_value)],
      scheduled_payment_date: [this.creditPaymentSelected.scheduled_payment_date],
      real_payment_date: [this.now.format('YYYY-MM-DD')],
      days_late: [this.days_late],
      additional_charge: [this.creditPaymentSelected.additional_charge],
      description_additional_charge: [this.creditPaymentSelected.description_additional_charge],
      payment_received: [value, [Validators.required,Validators.max(max), Validators.min(min)]],
      contribution: [this.contribution]
    })
  }

  public createPayment(){
    this.create.emit(this.paymentForm.value);
  }

    /**
  * Funciones para verificar si los formularios son obligatorios o no.
  */

 public getErrors(controlName: string): any {
  return this.formToolService.getErrors(this.paymentForm, controlName);
  }

  public mustShowError(controlName: string) {
    return this.formToolService.mustShowError(this.paymentForm, controlName);
  }

  public hasError(controlName: string, errorCode: string): any {
    return this.formToolService.hasError(this.paymentForm, controlName, errorCode);
  }

}
