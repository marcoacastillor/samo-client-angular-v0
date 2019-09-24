import { Component, OnInit } from '@angular/core';
import { AssociatedInfo } from 'src/app/shared/models/associated-info';
import { User } from 'src/app/shared/models/user';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { AssociatedInfoService } from 'src/app/shared/services/associated-info.service';
import { faEye, faEllipsisV, faPlusCircle, faAngleDoubleRight, faSearch } from '@fortawesome/free-solid-svg-icons';
import { CreditAssociated } from 'src/app/shared/models/credit-associated';
import { CreditAssociatedService } from 'src/app/shared/services/credit-associated.service';
import { environment } from 'src/environments/environment';
import { CreditPaymentService } from 'src/app/shared/services/credit-payment.service';
import { ExpensesService } from 'src/app/shared/services/expenses.service';

@Component({
  selector: 'app-rotative-credits-main',
  templateUrl: 'rotative-credits-main.component.html',
  styles: []
})
export class RotativeCreditsMainComponent implements OnInit {
  faEye = faEye;
  faEllipsisV = faEllipsisV;
  faPlusCircle = faPlusCircle;
  faAngleDoubleRight = faAngleDoubleRight;
  faSearch = faSearch;

  lstAssociated: AssociatedInfo[] = [];
  lstCreditApproved: CreditAssociated[] = [];
  lstCreditSolicited: CreditAssociated[] = [];
  lstCreditDisbursment: CreditAssociated[] = [];

  associated_count = 0;
  associated_value = 0;

  credit_assinged_count = 0;
  credit_assinged_value = 0;

  credit_solicited_count = 0;
  credit_solicited_value = 0;

  credit_settlet_count = 0;
  credit_settlet_value = 0;

  credit_disbursment_count = 0;
  credit_disbursment_value = 0;

  credit_performance_value = 0;
  credit_payments_value = 0;
  credit_expenses_value = 0;
  financial_performance = environment.financial_performance;
  
  activeUser: User = new User;
  lastkeydown1 = 0;
  
  constructor(
    private globalStoreService: GlobalStoreService,
    private associatedInfoService: AssociatedInfoService,
    private creditAssociatedService: CreditAssociatedService,
    private creditPaymentService: CreditPaymentService,
    private expenseService: ExpensesService
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
    );
    this.creditAssociatedService.getValuesByEnterpriseAndState$(id_enterprise,environment.state_credit_disbursment).subscribe(
      result => {
        this.credit_disbursment_count = result.count;
        this.credit_disbursment_value = result.value;
      }
    );
    this.creditAssociatedService.getPerformanceByEnterprise$(id_enterprise).subscribe(
      result => {
        this.credit_performance_value = result;
      }
    );
    this.creditPaymentService.getPaymentsByenterprise$(id_enterprise).subscribe(
      result => {
        this.credit_payments_value = result;
      }
    );
    this.expenseService.getExpensesByEnterprise$(id_enterprise).subscribe(
      result => {
        this.credit_expenses_value = result;
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
    this.creditAssociatedService.getByEnterpriseAndState$(id_enterprise,environment.state_credit_disbursment).subscribe(
      lst_credits => this.lstCreditDisbursment = lst_credits
    );
  }

  public loadAllAssociated(id_enterprise: number){
    this.associatedInfoService.getAssociatedByEnterprise$(id_enterprise).subscribe(
      lst_associated => this.lstAssociated = lst_associated
    )
  }

  onFindAssociated(filter: any){
    let idAssociated = (<HTMLInputElement>document.getElementById('filterAssociated')).value;
    this.lstAssociated = [];

    if (idAssociated.trim().length > 0) {
      if (filter.timeStamp - this.lastkeydown1 > 200) {
        this.associatedInfoService.getAssociatedByIdFilterAndEnterprise$(idAssociated.trim(), this.activeUser.fk_id_enterprise).subscribe(
          lst_persons => {
            this.lstAssociated = lst_persons;
          },
        )
      }
    }
  }


  

}
