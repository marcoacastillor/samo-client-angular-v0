import { Component, OnInit, Input } from '@angular/core';
import { Person } from 'src/app/shared/models/person';

@Component({
  selector: 'app-show-clients',
  templateUrl: 'show-clients.component.html',
  styles: []
})
export class ShowClientsComponent implements OnInit {
  @Input() public person: Person;
  
  constructor() { }

  ngOnInit() {
  }

}
