import { Component, OnInit, ChangeDetectorRef, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CreditLine } from 'src/app/shared/models/credit-line';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { Parameter } from 'src/app/shared/models/parameter';

@Component({
  selector: 'app-credit-line-form-modal',
  templateUrl: 'credit-line-form-modal.component.html',
  styles: []
})
export class CreditLineFormModalComponent implements OnInit {
  faSave = faSave;

  creditLineForm: FormGroup;
  
  @Input() public creditLine: CreditLine;
  @Input() public lstParameters: Parameter[];
  
  @Output() public create = new EventEmitter<CreditLine>();
  @Output() public update = new EventEmitter<CreditLine>();

  constructor(
    private fb: FormBuilder,
    private formToolService: FormToolsService
  ) { }

  ngOnInit() {
    this.initUpdForm();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.creditLine)
    {
      if(changes.creditLine.currentValue != changes.creditLine.previousValue)
      {
        this.initUpdForm();
      }
    }
  }

  public createCreditLine(){
    this.create.emit(this.creditLineForm.value);
    this.initUpdForm();
  }

  public updateCreditLine(){
    this.update.emit(this.creditLineForm.value)
    this.initUpdForm();
  }
  
  private initUpdForm() {
    this.creditLineForm = this.fb.group({
      pk_id_credit_line: [this.creditLine.pk_id_credit_line],
      name: [this.creditLine.name, Validators.required],
      description: [this.creditLine.description, Validators.required],
      interest: [this.creditLine.interest, [Validators.required, Validators.min(0), Validators.max(100)]],
      term_interest: [this.creditLine.term_interest, Validators.required],
      max_payment_deadline: [this.creditLine.max_payment_deadline, Validators.required],
      code: [this.creditLine.code, Validators.required]
      });
  }

  public getErrors(controlName: string): any {
    return this.formToolService.getErrors(this.creditLineForm, controlName);
  }

  public mustShowError(controlName: string) {
    return this.formToolService.mustShowError(this.creditLineForm, controlName);
  }

  public hasError(controlName: string, errorCode: string): any {
    return this.formToolService.hasError(this.creditLineForm, controlName, errorCode);
  }

  

}
