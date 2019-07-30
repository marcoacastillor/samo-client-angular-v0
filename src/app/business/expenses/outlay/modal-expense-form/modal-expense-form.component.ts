import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { faSave, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Expense } from 'src/app/shared/models/expense';
import { Parameter } from 'src/app/shared/models/parameter';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';

@Component({
  selector: 'app-modal-expense-form',
  templateUrl: 'modal-expense-form.component.html',
  styles: []
})
export class ModalExpenseFormComponent implements OnInit {
  faSave = faSave;
  faCalendar = faCalendar;
  
  expenseForm: FormGroup;

  @Input() public expense: Expense;
  @Input() public parameterList: Parameter[];
  @Input() public fk_id_enterprise: number;
  

  @Output() public update = new EventEmitter<Expense>();
  @Output() public create = new EventEmitter<Expense>();

  constructor(
    private fb: FormBuilder,
    private formToolService: FormToolsService,
    
  ) { }

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.expense)
    {
      if(changes.expense.currentValue != changes.expense.previousValue)
      {
        this.initForm();
      }
    }
  }

  private initForm(){
    this.expenseForm = this.fb.group({
      pk_id_expense: [this.expense.pk_id_expense],
      fk_id_enterprise: [this.fk_id_enterprise],
      date_expense: [this.expense.date_expense],
      type_expense: [this.expense.type_expense],
      description: [this.expense.description],
      value: [this.expense.value]
    })
  }

  updateExpense(){
    this.update.emit(this.expenseForm.value);
  }

  createExpense(){
    this.create.emit(this.expenseForm.value);
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
