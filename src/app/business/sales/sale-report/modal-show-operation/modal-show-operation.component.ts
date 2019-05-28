import { Component, OnInit, Input } from '@angular/core';
import { Person } from 'src/app/shared/models/person';
import { Operation } from 'src/app/shared/models/operation';

@Component({
  selector: 'app-modal-show-operation',
  templateUrl: 'modal-show-operation.component.html',
  styles: []
})
export class ModalShowOperationComponent implements OnInit {
  @Input() public client: Person;
  @Input() public operation: Operation;

  constructor() { }

  ngOnInit() {
  }

}
