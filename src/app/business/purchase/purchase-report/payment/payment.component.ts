import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Purchase } from 'src/app/shared/models/purchase';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { Payment } from 'src/app/shared/models/payment';

@Component({
  selector: 'app-payment',
  templateUrl: 'payment.component.html',
  styles: []
})
export class PaymentComponent implements OnInit {
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
    value_payment: [this.value_payment,[Validators.required,Validators.max(this.value_payment)]],
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
