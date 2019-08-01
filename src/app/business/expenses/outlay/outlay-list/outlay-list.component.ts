import { Component, OnInit } from '@angular/core';
import { faPlusCircle, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Expense } from 'src/app/shared/models/expense';
import { ExpensesService } from 'src/app/shared/services/expenses.service';
import { User } from 'src/app/shared/models/user';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { Parameter } from 'src/app/shared/models/parameter';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { environment } from 'src/environments/environment';
import { ParameterConfigService } from 'src/app/shared/services/parameter-config.service';
import { ParameterConfig } from 'src/app/shared/models/parameter-config';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { EnterprisesModule } from 'src/app/business/enterprises/enterprises.module';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { tap } from 'rxjs/operators';

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
  parameterEnterprise: ParameterConfig[] = [];
  parameterList: Parameter[] = [];
  lstExpenses: Expense[] = [];
  user: User = new User;

  success = false;
  message = '';

  constructor(
    private expenseService: ExpensesService,
    private globalStoreService: GlobalStoreService,
    private parameterService: ParameterService,
    private parameterConfigService: ParameterConfigService,
    ) {
      this.expense.type_expense = '';
     }

  ngOnInit() {
    this.user = this.globalStoreService.getUser();
    this.loadExpenses();
    this.loadParameterEnterprise();
  }

  private loadParameterEnterprise(){
    this.parameterConfigService.getByEnterprise$(this.user.fk_id_enterprise).subscribe(
      parameters => this.parameterEnterprise = parameters
    )
  }

  public newExpense(){
    this.expense = new Expense;
  }

  private loadExpenses(){
    this.expenseService.getAll$().subscribe(
      lst_expenses => this.lstExpenses = lst_expenses
    )
  }

  public selectExpense(expense:Expense){
    this.expenseService.show$(expense.pk_id_expense).subscribe(
      expense => this.expense = expense
    )
  }

  public loadParametersExpense(){
    this.parameterService.getByCodeCategory$(environment.type_expense).subscribe(
      lst_types => this.parameterList = lst_types
    )
  }

  public createExpense(expense: Expense){
    let value = expense.actual_value;
    let code = '';
    this.expenseService.store$(expense)
    .pipe(
      tap(() => {
        this.expenseService.getAll$().subscribe(
          lst_expenses => {
            this.lstExpenses = lst_expenses;
            this.success = true;
            this.message = 'Se crea un registro, satisfactoriamente.';
          }
        )  
      }),
      tap((expense:Expense) => {
        if(expense.type_expense == 'Comprobante de egreso'){
          code = environment.current_voucher;
        }else{
          code = environment.current_purchase;
        }
        this.parameterConfigService.updateByEnterpriseAndCodeAndValue$(expense.fk_id_enterprise,code,value.toString()).subscribe()
      })
    ).subscribe()
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
