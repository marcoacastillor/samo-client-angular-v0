import { Component, OnInit } from '@angular/core';
import { faPlusCircle, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Expense } from 'src/app/shared/models/expense';
import { ExpensesService } from 'src/app/shared/services/expenses.service';
import { User } from 'src/app/shared/models/user';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { Parameter } from 'src/app/shared/models/parameter';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-outlay-list',
  templateUrl: 'outlay-list.component.html',
  styles: []
})
export class OutlayListComponent implements OnInit {
  faPlusCircle = faPlusCircle;
  faEdit = faEdit;
  faTrash = faTrash;

  expense: Expense = new Expense;
  parameterList: Parameter[] = [];
  lstExpenses: Expense[] = [];
  user: User = new User;

  success = false;
  message = '';

  constructor(
    private expenseService: ExpensesService,
    private globalStoreService: GlobalStoreService,
    private parameterService: ParameterService
    ) { }

  ngOnInit() {
    this.user = this.globalStoreService.getUser();
    this.loadExpenses()
  }

  private loadExpenses(){
    this.expenseService.getAll$().subscribe(
      lst_expenses => this.lstExpenses = lst_expenses
    )
  }

  public selectExpense(expense:Expense){
    this.expense = expense
  }

  public loadParametersExpense(){
    this.parameterService.getByCodeCategory$(environment.type_expense).subscribe(
      lst_types => this.parameterList = lst_types
    )
  }

  public createExpense(expense: Expense){
    this.expenseService.store$(expense).subscribe(
      () => {
        this.expenseService.getAll$().subscribe(
          lst_expenses => {
            this.lstExpenses = lst_expenses;
            this.success = true;
            this.message = 'Se crea un registro, satisfactoriamente.';
          }
        )   
      }
    )
  }

  public updateExpense(expense: Expense){
    this.expenseService.update$(expense).subscribe(
      () => {
        this.expenseService.getAll$().subscribe(
          lst_expenses => {
            this.lstExpenses = lst_expenses;
            this.success = true;
            this.message = 'Se actualiza registro, satisfactoriamente.';
          }
        )   
      }
    )
  }

  public deleteExpense(){
    this.expenseService.delete$(this.expense.pk_id_expense).subscribe(
      () => {
        this.expenseService.getAll$().subscribe(
          lst_expenses => {
            this.lstExpenses = lst_expenses;
            this.success = true;
            this.message = 'Se elimina registro, satisfactoriamente.';
          }
        )   
      }
    )
  }

}
