import { Component, OnInit, Input } from '@angular/core';
import { Expense } from 'src/app/shared/models/expense';

@Component({
  selector: 'app-show-expense',
  templateUrl: 'show-expense.component.html',
  styles: []
})
export class ShowExpenseComponent implements OnInit {
  @Input() public expense: Expense;
  constructor() { }

  ngOnInit() {
  }

}
