import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { Expense } from 'src/app/shared/models/expense';
import { Parameter } from 'src/app/shared/models/parameter';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';

@Component({
  selector: 'app-new-expense',
  templateUrl: 'new-expense.component.html',
  styles: []
})
export class NewExpenseComponent implements OnInit, OnChanges {
  expenseForm: FormGroup;

  @Input() public expense: Expense;
  @Input() public lstTypes: Parameter[];

  @Output() public store = new EventEmitter<Expense>();
  @Output() public update = new EventEmitter<Expense>();

  constructor(
    private fb: FormBuilder,
    private formToolService: FormToolsService
  ) { }

  ngOnInit() {
    this.initUpdForm();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.expense)
    {
      if(changes.expense.currentValue.pk_id_expense)
      {
        this.initUpdForm();
      }
    }
  }

  private initUpdForm() {
    this.expenseForm = this.fb.group({
      pk_id_expense: [this.expense.pk_id_expense], 
      fk_id_enterprise: [this.expense.fk_id_enterprise], 
      type_expense: [this.expense.type_expense,Validators.required],
      description: [this.expense.description, [Validators.required, Validators.maxLength(200)]],
      value: [this.expense.value, Validators.required]
     });
   }

   private updateForm(){
    this.expenseForm = this.fb.group({
      pk_id_expense: [this.expense.pk_id_expense], 
      fk_id_enterprise: [this.expense.fk_id_enterprise],  
      type_expense: ['',Validators.required],
      description: ['', Validators.required],
      value: [0, Validators.required]
     });
   }

   public createExpense(){
    this.store.emit(this.expenseForm.value);
    this.updateForm();
   }

   public updateExpense(){
    this.update.emit(this.expenseForm.value);
    this.updateForm();
   }

   /**
   * Funciones para verificar si los formularios son obligatorios o no.
   */

  public getErrors(controlName: string): any {
    return this.formToolService.getErrors(this.expenseForm, controlName);
  }

  public mustShowError(controlName: string) {
    return this.formToolService.mustShowError(this.expenseForm, controlName);
  }

  public hasError(controlName: string, errorCode: string): any {
    return this.formToolService.hasError(this.expenseForm, controlName, errorCode);
  }

}
