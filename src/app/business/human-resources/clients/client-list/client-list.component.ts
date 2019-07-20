import { Component, OnInit } from '@angular/core';
import { faPlusCircle, faEye } from '@fortawesome/free-solid-svg-icons';
import { Person } from 'src/app/shared/models/person';
import { PersonService } from 'src/app/shared/services/person.service';
import { User } from 'src/app/shared/models/user';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';

@Component({
  selector: 'app-client-list',
  templateUrl: 'client-list.component.html',
  styles: []
})
export class ClientListComponent implements OnInit {
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
    this.personService.getClientsByEnterprise$(id_enterprise).subscribe(
      lstClients => this.lstClients = lstClients
    )
  }
}
