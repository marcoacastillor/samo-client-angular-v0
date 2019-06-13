import { Component, OnInit } from '@angular/core';
import { ExpensesService } from 'src/app/shared/services/expenses.service';
import { Expense } from 'src/app/shared/models/expense';
import { Results } from 'src/app/shared/models/results';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Parameter } from 'src/app/shared/models/parameter';

@Component({
  selector: 'app-admin-expense',
  templateUrl: 'admin-expense.component.html',
  styles: []
})
export class AdminExpenseComponent implements OnInit {
  public showExpense: boolean = false;
  
  public actualPg: number = 0;
  public regPerPg: number = 5;
  
  public expense: Expense = new Expense();
  public expensesList: Results = new Results();
  public lstTypes: Parameter[] = [];

  constructor(
    private expenseService: ExpensesService,
    private globalStoreService: GlobalStoreService,
    private parameterService: ParameterService,
  ) { }

  ngOnInit() {
    this.loadAllsExpenses();
    this.loadData();
    this.loadTypeExpense();
  }

  private loadData(){
    let user = this.globalStoreService.getUser();
    this.expense.fk_id_enterprise = user.fk_id_enterprise;
  }

  private loadAllsExpenses(){
    this.expenseService.getAll$().pipe(
      tap(this.loadExpenses)
    ).subscribe(this.onSuccess, this.onError)
  }

  private loadTypeExpense(){
    this.parameterService.getByCodeCategory$(environment.type_expense).subscribe(
      params => this.lstTypes = params
    )
  }

  private loadExpenses = (result: Results): void => {
    this.expensesList = result;
  }

  private loadAllExpenses = (result: Results): void => {
    this.loadAllsExpenses();
  }

  public onStore(expense: Expense){
    this.expenseService.store$(expense).pipe(
      tap(this.loadAllExpenses)
    ).subscribe(this.onSuccess, this.onError);
  }

  public onUpdate(expense: Expense){
    this.expenseService.update$(expense).pipe(
      tap(this.loadAllExpenses)
    ).subscribe(this.onSuccess, this.onError);
  }

  public onCreate(expense: Expense){
    this.showExpense = false;
    this.expense = expense;
  }

  public onSelect(id:number){
    this.showExpense = true;
    this.expenseService.show$(id).pipe(
     tap(this.loadExpense) 
    ).subscribe(this.onSuccess,this.onError)
  }

  private loadExpense = (expense:Expense): void => {
    this.expense = expense;
  }

  /*
  * ------------------------------------------
  * Funciones validación de resultado
  * ------------------------------------------
  */
  private onSuccess = () => {
    this.globalStoreService.dispatchUserMessage('200', ' Se ejecutó exitosamente, la operación ');
  }

  private onError = (error: any) => {
    this.globalStoreService.dispatchUserMessage(error.status, error.statusText + ' : ' + error.error);
  }

}
