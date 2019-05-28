import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Results } from 'src/app/shared/models/results';
import { faPlusCircle, faEye, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Expense } from 'src/app/shared/models/expense';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { ExpensesService } from 'src/app/shared/services/expenses.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-list-expense',
  templateUrl: 'list-expense.component.html',
  styles: []
})
export class ListExpenseComponent implements OnInit, OnChanges {
  searchForm: FormGroup;
  
  faPlusCircle = faPlusCircle;
  faEye = faEye;
  faSearch = faSearch;

  @Input() public expensesList: Results;
  @Input() public actualPg: number;
  @Input() public regPerPg: number;

  @ViewChild('filterRef') filter : ElementRef;

  public totalPgs: number = 0;
  public maxPerPg: number = 0;

  @Output() public create = new EventEmitter<Expense>();
  @Output() public select = new EventEmitter<number>();

  constructor(
    private expenseService: ExpensesService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.calculateRegs();
    this.initUpdForm();
  }

  private initUpdForm() {
    this.searchForm = this.fb.group({
      filter: ['',Validators.required],
     });
   }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.expensesList)
    {
      if(changes.expensesList.currentValue)
      {
        this.expensesList = changes.expensesList.currentValue;
        this.totalPgs = Math.ceil(this.expensesList.number_results / this.regPerPg);
        this.actualPg = 0;
      }
    }
  }

  public searchExpenses(){
    this.expenseService.getByFilter$(this.searchForm.value).pipe(
      tap(this.loadExpenses)
    ).subscribe();
  }

  private loadExpenses = (options: Results): void => {
    this.expensesList = options[0];
  }

  public selectExpense(id:number){
    this.select.emit(id);
  }

  public addActualPg(){
    this.actualPg = this.actualPg + 1;
    this.calculateRegs();
  }

  public delActualPg(){
    this.actualPg = this.actualPg - 1;
    this.calculateRegs();
  }

  public setRegPerPg(value: any){
    this.regPerPg = value;
    this.totalPgs = Math.ceil(this.expensesList.number_results / this.regPerPg);
    this.calculateRegs();
  }

  private calculateRegs(){
    this.maxPerPg = (Number(this.actualPg) * Number(this.regPerPg)+ Number(this.regPerPg));
  }

  public crtExpense(){
    this.create.emit(new Expense);
  }

}
