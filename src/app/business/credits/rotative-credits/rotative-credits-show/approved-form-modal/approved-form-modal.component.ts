import { Component, OnInit, Input, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { CreditAssociated } from 'src/app/shared/models/credit-associated';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';

@Component({
  selector: 'app-approved-form-modal',
  templateUrl: 'approved-form-modal.component.html',
  styles: []
})
export class ApprovedFormModalComponent implements OnInit {
  faSave = faSave;

  creditForm: FormGroup;

  @Input() public decision: string;
  @Input() public id: number;
  @Input() public amount_solicited: number;
  

  @Output() public update = new EventEmitter<CreditAssociated>();

  constructor(
    private fb: FormBuilder,
    private formToolService: FormToolsService
  ) { 
  }

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.decision)
    {
      if(changes.decision.currentValue != changes.decision.previousValue)
      {
        this.initForm();
      }
    }
  }

  private initForm(){
    this.creditForm = this.fb.group({
      pk_id_credit_associated: [this.id],
      state: [this.decision],
      amount_approved: [this.amount_solicited,[Validators.required,Validators.max(this.amount_solicited)]],
      observation: [''],
    })
  }

  public updateCredit(){
    this.update.emit(this.creditForm.value);
  }

  public getErrors(controlName: string): any {
    return this.formToolService.getErrors(this.creditForm, controlName);
  }

  public mustShowError(controlName: string) {
    return this.formToolService.mustShowError(this.creditForm, controlName);
  }

  public hasError(controlName: string, errorCode: string): any {
    return this.formToolService.hasError(this.creditForm, controlName, errorCode);
  }

}
