import { Component, OnInit } from '@angular/core';
import { AssociatedInfo } from 'src/app/shared/models/associated-info';
import { User } from 'src/app/shared/models/user';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { AssociatedInfoService } from 'src/app/shared/services/associated-info.service';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { CreditAssociated } from 'src/app/shared/models/credit-associated';
import { CreditAssociatedService } from 'src/app/shared/services/credit-associated.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rotative-credits-main',
  templateUrl: 'rotative-credits-main.component.html',
  styles: []
})
export class RotativeCreditsMainComponent implements OnInit {
  faEye = faEye;

  lstAssociated: AssociatedInfo[] = [];
  lstCreditApproved: CreditAssociated[] = [];
  lstCreditSolicited: CreditAssociated[] = [];

  associated_count = 0;
  associated_value = 0;

  credit_assinged_count = 0;
  credit_assinged_value = 0;

  credit_solicited_count = 0;
  credit_solicited_value = 0;

  credit_settlet_count = 0;
  credit_settlet_value = 0;
  
  activeUser: User = new User;
  
  constructor(
    private globalStoreService: GlobalStoreService,
    private associatedInfoService: AssociatedInfoService,
    private creditAssociatedService: CreditAssociatedService
  ) { }

  ngOnInit() {
    this.activeUser = this.globalStoreService.getUser();
    this.loadAllAssociated(this.activeUser.fk_id_enterprise);
    this.loadCreditsByEnterprise(this.activeUser.fk_id_enterprise);
    this.loadConsolidatedValues(this.activeUser.fk_id_enterprise);
  }

  private loadConsolidatedValues(id_enterprise:number){
    this.associatedInfoService.getValuesByEnterprise$(id_enterprise).subscribe(
      result => {
        this.associated_count = result.count;
        this.associated_value = result.value;
      }
    );
    this.creditAssociatedService.getValuesByEnterpriseAndState$(id_enterprise,environment.state_credit_approved).subscribe(
      result => {
        this.credit_assinged_count = result.count;
        this.credit_assinged_value = result.value;
      }
    );
    this.creditAssociatedService.getValuesByEnterpriseAndState$(id_enterprise,environment.state_credit_solicited).subscribe(
      result => {
        this.credit_solicited_count = result.count;
        this.credit_solicited_value = result.value;
      }
    );
    this.creditAssociatedService.getValuesByEnterpriseAndState$(id_enterprise,environment.state_credit_paid_out).subscribe(
      result => {
        this.credit_settlet_count = result.count;
        this.credit_settlet_value = result.value;
      }
    )
  }

  private loadCreditsByEnterprise(id_enterprise:number){
    this.creditAssociatedService.getByEnterpriseAndState$(id_enterprise,environment.state_credit_solicited).subscribe(
      lst_credits => this.lstCreditSolicited = lst_credits
    );
    this.creditAssociatedService.getByEnterpriseAndState$(id_enterprise,environment.state_credit_approved).subscribe(
      lst_credits => this.lstCreditApproved = lst_credits
    );
  }

  private loadAllAssociated(id_enterprise: number){
    this.associatedInfoService.getAssociatedByEnterprise$(id_enterprise).subscribe(
      lst_associated => this.lstAssociated = lst_associated
    )
  }

}
