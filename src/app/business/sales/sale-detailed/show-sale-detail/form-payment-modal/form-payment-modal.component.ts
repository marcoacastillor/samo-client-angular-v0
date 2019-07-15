import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { Operation } from 'src/app/shared/models/operation';
import { Payment } from 'src/app/shared/models/payment';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';

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
    private formToolService: FormToolsService
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
      value_payment: [0,[Validators.required,Validators.max(this.operation.total_operation - (this.operation.total_discounts + this.operation.total_pays))]],
    })
  }

  add(){
    this.addPayment.emit(this.paymentForm.value);
    this.initForm();
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
