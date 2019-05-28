import { Component, OnInit, Input } from '@angular/core';
import { Person } from 'src/app/shared/models/person';

@Component({
  selector: 'app-show-employee',
  templateUrl: 'show-employee.component.html',
  styles: []
})
export class ShowEmployeeComponent implements OnInit {
  @Input() public person: Person;
  
  constructor() { }

  ngOnInit() {
  }

}
