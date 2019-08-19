import { Component, OnInit, SimpleChanges, EventEmitter, Output, Input } from '@angular/core';
import { faSave, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { PaymentService } from 'src/app/shared/models/payment-service';
import * as moment from 'moment';

@Component({
  selector: 'app-form-payment-modal',
  templateUrl: 'form-payment-modal.component.html',
  styles: []
})
export class FormPaymentModalComponent implements OnInit {
  paymentForm: FormGroup;
  faSave = faSave;
  faCalendar = faCalendar;

  @Input() public total: number;
  @Input() public balance: number;
  @Input() public fk_id_enterprise_service: number;
  @Output() public addPayment = new EventEmitter<PaymentService>();
  
  constructor(
    private fb: FormBuilder,
    private formToolService: FormToolsService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.balance)
    {
      if(changes.balance.currentValue != changes.balance.previousValue)
      {
        this.balance = changes.balance.currentValue;
      }
    }

    if(changes.fk_id_enterprise_service)
    {
      if(changes.fk_id_enterprise_service.currentValue != changes.fk_id_enterprise_service.previousValue)
      {
        this.fk_id_enterprise_service = changes.fk_id_enterprise_service.currentValue;
      }
    }
    this.initForm();
  }

  private initForm(){
    this.paymentForm = this.fb.group({
      fk_id_service_enterprise: [this.fk_id_enterprise_service],
      value_payment: [,[Validators.required,Validators.max(this.balance)]],
      reference_payment: [''],
      date_end_service: ['',Validators.required],
    })
  }

  add(){
    this.paymentForm.patchValue({
      date_init_service: moment(this.paymentForm.value.date_init_service).format('YYYY-MM-DD'),
    });
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
