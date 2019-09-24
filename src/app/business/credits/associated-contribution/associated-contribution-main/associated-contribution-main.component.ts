import { Component, OnInit } from '@angular/core';
import { AssociatedInfo } from 'src/app/shared/models/associated-info';
import { Person } from 'src/app/shared/models/person';
import { PersonService } from 'src/app/shared/services/person.service';
import { AssociatedInfoService } from 'src/app/shared/services/associated-info.service';
import { User } from 'src/app/shared/models/user';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { ResultOperation } from 'src/app/shared/models/result-operation';
import { CreditAssociated } from 'src/app/shared/models/credit-associated';
import { tap } from 'rxjs/operators';
import { CreditAssociatedService } from 'src/app/shared/services/credit-associated.service';
import { faPlusCircle, faEye, faCogs } from '@fortawesome/free-solid-svg-icons';
import { AssociatedContribution } from 'src/app/shared/models/associated-contribution';
import { AssociatedContributionService } from 'src/app/shared/services/associated-contribution.service';
import { OperationProduct } from 'src/app/shared/models/operation-product';
import { CreditPayment } from 'src/app/shared/models/credit-payment';
import { CreditPaymentService } from 'src/app/shared/services/credit-payment.service';

@Component({
  selector: 'app-associated-contribution-main',
  templateUrl: 'associated-contribution-main.component.html',
  styles: []
})
export class AssociatedContributionMainComponent implements OnInit {
  faCogs = faCogs;
  faPlusCircle = faPlusCircle;
  faEye = faEye;
  
  associatedSelected: AssociatedInfo = new AssociatedInfo;
  person: Person = new Person;
  lstAssociated: AssociatedInfo[] = [];
  resultOperation: ResultOperation = new ResultOperation;
  lstCredit: CreditAssociated[] = [];
  selectedCredit: CreditAssociated = new CreditAssociated;
  creditPaymentSelected: CreditPayment = new CreditPayment;

  lastkeydown1 = 0;

  activeUser: User = new User;
  
  constructor(
    private personService: PersonService,
    private associatedInfoService: AssociatedInfoService,
    private creditAssociatedService: CreditAssociatedService,
    private associatedContributionService: AssociatedContributionService,
    private globalStoreService: GlobalStoreService,
    private creditPaymentService:CreditPaymentService
  ) { }

  ngOnInit() {
    this.activeUser = this.globalStoreService.getUser();
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

  selectAssociated(associated: AssociatedInfo){
    this.personService.show$(parseInt(associated.external_reference_person.split(':')[0])).pipe(
      tap((person:Person) => this.person = person),
      tap(() => this.creditAssociatedService.getByAssociated$(associated.pk_id_associated_info).subscribe(
        lst_credits => {
          this.lstCredit = lst_credits
        }
      ))
    ).subscribe()
    this.associatedSelected = associated;
    this.lstAssociated = [];
  }

  selectCredit(credit:CreditAssociated){
    this.selectedCredit = credit;
    this.creditPaymentService.getFeePaymentByCredit$(credit.pk_id_credit_associated).subscribe(
      payment => this.creditPaymentSelected = payment
    )
  }

  private getAssociatedInfo(id:number){
    this.associatedInfoService.show$(id).subscribe(
      associated_info => this.associatedSelected = associated_info
    )
  }

  onCreate(associatedContribution:AssociatedContribution){
    this.associatedContributionService.create$(associatedContribution).subscribe(
      result_operation => {
        this.resultOperation = result_operation;
        this.getAssociatedInfo(associatedContribution.fk_id_associated_info)
      }
    )
  }

  onCreatePayment(creditPayment:CreditPayment){
    this.creditPaymentService.store$(creditPayment).subscribe(
      res_operation => {
        this.selectAssociated(this.associatedSelected);
        this.resultOperation = res_operation;
      }
    )

  }
}
