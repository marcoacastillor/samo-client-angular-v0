import { Component, OnInit } from '@angular/core';
import { faPlusCircle, faEye, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Person } from 'src/app/shared/models/person';
import { User } from 'src/app/shared/models/user';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { PersonService } from 'src/app/shared/services/person.service';
import { AssociatedInfoService } from 'src/app/shared/services/associated-info.service';
import { AssociatedInfo } from 'src/app/shared/models/associated-info';

@Component({
  selector: 'app-associated-list',
  templateUrl: 'associated-list.component.html',
  styles: []
})
export class AssociatedListComponent implements OnInit {
  faPlusCircle = faPlusCircle;
  faEye = faEye;
  faTrash = faTrash;
  faEdit = faEdit;

  person: Person = new Person;
  lstAssociated: AssociatedInfo[] = [];
  activeUser: User = new User;

  success = false;
  message =  '';

  constructor(
    private globalStoreService: GlobalStoreService,
    private personService: PersonService,
    private associatedInfoService: AssociatedInfoService
  ) { }

  ngOnInit() {
    this.activeUser = this.globalStoreService.getUser();
    this.loadAllClients(this.activeUser.fk_id_enterprise);
  }

  private loadAllClients(id_enterprise: number){
    this.associatedInfoService.getAssociatedByEnterprise$(id_enterprise).subscribe(
      lst_associated => this.lstAssociated = lst_associated
    )
  }

  selectPerson(person:Person){
    this.person = person;
  }

  deleteClient(){
    this.personService.deleteClient$(this.person.pk_id_person).subscribe(
      () => {
        this.success = true;
        this.message = 'Se eliminó correctamente el asociado';
        this.loadAllClients(this.activeUser.fk_id_enterprise);
      }
    )
  }

}
