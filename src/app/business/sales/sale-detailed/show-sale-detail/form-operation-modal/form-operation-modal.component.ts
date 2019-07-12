import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';
import { Operation } from 'src/app/shared/models/operation';
import { Parameter } from 'src/app/shared/models/parameter';

@Component({
  selector: 'app-form-operation-modal',
  templateUrl:'form-operation-modal.component.html',
  styles: []
})
export class FormOperationModalComponent implements OnInit {
  operationForm: FormGroup;
  faSave = faSave;
  
  efecty_payment  = environment.efecty_payment;
  type_payment    = environment.type_payment;
  
  @Input() public operation: Operation;
  @Input() public lstParams: Parameter[];

  @Output() public update = new EventEmitter<Operation>();
  
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
    this.operationForm = this.fb.group({
      pk_id_operation: [this.operation.pk_id_operation],
      fk_id_vendedor: [this.operation.fk_id_person],
      fk_id_provider: [this.operation.fk_id_enterprise],
      operation_type: [this.operation.operation_type],
      payment_type: [this.operation.payment_type],
      number_invoice: [this.operation.number_invoice],
      subtotal_operation: [this.operation.subtotal_operation],
      total_operation: [this.operation.total_operation],
      total_tax: [this.operation.total_tax],
      total_discounts: [this.operation.total_discounts],
      total_pays: [this.operation.total_pays],
    })
  }

  updateOperation(){
    this.update.emit(this.operationForm.value);
    this.initForm();
  }

}
