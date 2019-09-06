import { Component, OnInit } from '@angular/core';
import { faPlusCircle, faEye, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Person } from 'src/app/shared/models/person';
import { User } from 'src/app/shared/models/user';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { PersonService } from 'src/app/shared/services/person.service';
import { AssociatedInfoService } from 'src/app/shared/services/associated-info.service';
import { AssociatedInfo } from 'src/app/shared/models/associated-info';
import { ResultOperation } from 'src/app/shared/models/result-operation';

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

  person: AssociatedInfo = new AssociatedInfo;
  lstAssociated: AssociatedInfo[] = [];
  activeUser: User = new User;

  resultOperation: ResultOperation = new ResultOperation;

  constructor(
    private globalStoreService: GlobalStoreService,
    private associatedInfoService: AssociatedInfoService
  ) { }

  ngOnInit() {
    this.activeUser = this.globalStoreService.getUser();
    this.loadAllAssociated(this.activeUser.fk_id_enterprise);
  }

  private loadAllAssociated(id_enterprise: number){
    this.associatedInfoService.getAssociatedByEnterprise$(id_enterprise).subscribe(
      lst_associated => this.lstAssociated = lst_associated
    )
  }

  selectPerson(person:AssociatedInfo){
    this.person = person;
  }

  deleteAssociated(){
    this.associatedInfoService.deleteAssociated$(this.person.pk_id_associated_info).subscribe(
      result_operation => {
        this.resultOperation = result_operation;
        this.loadAllAssociated(this.activeUser.fk_id_enterprise);
      }
    )
  }

}
