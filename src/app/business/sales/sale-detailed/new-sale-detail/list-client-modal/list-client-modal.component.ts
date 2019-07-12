import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Person } from 'src/app/shared/models/person';
import { PersonService } from 'src/app/shared/services/person.service';

@Component({
  selector: 'app-list-client-modal',
  templateUrl: 'list-client-modal.component.html',
  styles: []
})
export class ListClientModalComponent implements OnInit {
  @Input() public lstClients: Person[];
  @Output() public selectClient = new EventEmitter<Person>();

  faCheckCircle = faCheckCircle;
  lastkeydown1 = 0;

  empty = false;

  constructor(
    private personService: PersonService
  ) { }

  ngOnInit() {
  }

  onFindClient(filter: any){
    let nameClient = (<HTMLInputElement>document.getElementById('name_client')).value;
    this.lstClients = [];

    if (nameClient.length > 0) {
      if (filter.timeStamp - this.lastkeydown1 > 200) {
        this.personService.getPersonsByNamesFilter$(nameClient).subscribe(
          lstClients => {
            this.lstClients = lstClients;
            this.empty = false
          }, 
          () => this.empty = true
        )}
    }
  }

  onSelectClient(person: Person){
    this.selectClient.emit(person);
  }

}
