import { Component, OnInit, Input } from '@angular/core';
import { Person } from 'src/app/shared/models/person';

@Component({
  selector: 'app-employee',
  templateUrl: 'employee.component.html',
  styles: []
})
export class EmployeeComponent implements OnInit {
  @Input() public employeesList: Person[];
  constructor() { }

  ngOnInit() {
  }

}
