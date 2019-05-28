import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';

@Component({
  selector: 'app-efecty-payment',
  templateUrl: 'efecty-payment.component.html',
  styles: []
})
export class EfectyPaymentComponent implements OnInit, OnChanges {
  efectyForm: FormGroup;

  @Input() public total_payment: number;

  @ViewChild('received_money') nameField: ElementRef;
  @Output() public onSaveInvoice = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private formToolService: FormToolsService
  ) { }

  ngOnInit() {
    this.initUpdForm();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.total_payment)
    {
      if(changes.total_payment.currentValue)
      {
        this.initUpdForm(); 
      }
    }
  }

  public saveInvoice(){
    this.onSaveInvoice.emit(true);
  }

  /*
  * ------------------------------------------
  * Funciones propias del controlador
  * ------------------------------------------
  */
 private initUpdForm() {
  this.efectyForm = this.fb.group({
    received_money: [this.total_payment, [Validators.required,Validators.min(this.total_payment)]],
   });
 }

 /**
   * Funciones para verificar si los formularios son obligatorios o no.
   */

  public getErrors(controlName: string): any {
    return this.formToolService.getErrors(this.efectyForm, controlName);
  }

  public mustShowError(controlName: string) {
    return this.formToolService.mustShowError(this.efectyForm, controlName);
  }

  public hasError(controlName: string, errorCode: string): any {
    return this.formToolService.hasError(this.efectyForm, controlName, errorCode);
  }

}
