import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Payment } from 'src/app/shared/models/payment';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { Operation } from 'src/app/shared/models/operation';

@Component({
  selector: 'app-new-payment',
  templateUrl: 'new-payment.component.html',
  styles: []
})
export class NewPaymentComponent implements OnInit, OnChanges {
  paymentForm: FormGroup;
  
  @Input() public pk_id_operation: number;
  @Input() public value_payment: number;

  @Output() public create = new EventEmitter<Payment>();

  constructor(
    private fb: FormBuilder,
    private formToolService: FormToolsService
  ) { }

  ngOnInit() {
    this.initUpdForm();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.value_payment)
    {
      if(changes.value_payment.currentValue)
      {
        this.initUpdForm();    
      }
    }
  }
  
  /*
  * ------------------------------------------
  * Funciones propias del controlador
  * ------------------------------------------
  */
 private initUpdForm() {
  this.paymentForm = this.fb.group({
    pk_id_payment: [], 
    fk_id_operation: [this.pk_id_operation],
    date_payment: [],
    value_payment: ['',[Validators.required,Validators.max(this.value_payment)]],
   });
 }

  /**
   *  Funciones de creación y actualización
   */
  public addPayment(){
    this.create.emit(this.paymentForm.value);
    this.value_payment = 0;
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
