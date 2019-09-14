import { Component, OnInit } from '@angular/core';
import { faPlusCircle, faEye, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { CreditAssociated } from 'src/app/shared/models/credit-associated';
import { User } from 'src/app/shared/models/user';
import { ResultOperation } from 'src/app/shared/models/result-operation';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { CreditAssociatedService } from 'src/app/shared/services/credit-associated.service';

@Component({
  selector: 'app-rotative-credits-list',
  templateUrl: 'rotative-credits-list.component.html',
  styles: []
})
export class RotativeCreditsListComponent implements OnInit {
  faPlusCircle = faPlusCircle;
  faEye = faEye;
  faTrash = faTrash;
  faEdit = faEdit;

  credit: CreditAssociated = new CreditAssociated;
  lstCredits: CreditAssociated[] = [];
  activeUser: User = new User;

  resultOperation: ResultOperation = new ResultOperation;

  constructor(
    private globalStoreService: GlobalStoreService,
    private creditAssociatedService: CreditAssociatedService 
  ) { }

  ngOnInit() {
    this.activeUser = this.globalStoreService.getUser();
    this.loadAllAssociated(this.activeUser.fk_id_enterprise);
  }

  private loadAllAssociated(id_enterprise: number){
    this.creditAssociatedService.getAllByEnterprise$(id_enterprise).subscribe(
      lst_credits => this.lstCredits = lst_credits
    )
  }

  selectCredit(credit:CreditAssociated){
    this.credit = credit;
  }

  deleteCredit(){
    this.creditAssociatedService.delete$(this.credit.pk_id_credit_associated).subscribe(
      result_operation => {
        this.resultOperation = result_operation;
        this.loadAllAssociated(this.activeUser.fk_id_enterprise);
      }
    )
  }
}
