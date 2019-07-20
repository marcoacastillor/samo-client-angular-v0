import { Component, OnInit } from '@angular/core';
import { faPlusCircle, faEye } from '@fortawesome/free-solid-svg-icons';
import { Person } from 'src/app/shared/models/person';
import { User } from 'src/app/shared/models/user';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { PersonService } from 'src/app/shared/services/person.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: 'employee-list.component.html',
  styles: []
})
export class EmployeeListComponent implements OnInit {
  faPlusCircle = faPlusCircle;
  faEye = faEye;

  lstClients: Person[] = [];
  activeUser: User = new User;

  constructor(
    private globalStoreService: GlobalStoreService,
    private personService: PersonService
  ) { }

  ngOnInit() {
    this.activeUser = this.globalStoreService.getUser();
    this.loadAllClients(this.activeUser.fk_id_enterprise);
  }

  private loadAllClients(id_enterprise: number){
    this.personService.getEmployeesByEnterprise$(id_enterprise).subscribe(
      lstClients => this.lstClients = lstClients
    )
  }
}
