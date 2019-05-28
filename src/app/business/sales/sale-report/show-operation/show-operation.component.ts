import { Component, OnInit, Input } from '@angular/core';
import { Operation } from 'src/app/shared/models/operation';
import { Person } from 'src/app/shared/models/person';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-show-operation',
  templateUrl:'show-operation.component.html',
  styles: []
})
export class ShowOperationComponent implements OnInit {
  public credit_payment: string = environment.credit_payment;
  
  @Input() public client: Person;
  @Input() public operation: Operation;
  constructor() { }

  ngOnInit() {
  }

}
