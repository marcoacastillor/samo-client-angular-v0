import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/shared/models/person';
import { CreditAssociated } from 'src/app/shared/models/credit-associated';
import { CreditLine } from 'src/app/shared/models/credit-line';
import { faThList, faEye } from '@fortawesome/free-solid-svg-icons';
import { CreditPayment } from 'src/app/shared/models/credit-payment';
import { ActivatedRoute } from '@angular/router';
import { CreditAssociatedService } from 'src/app/shared/services/credit-associated.service';
import { CreditLineService } from 'src/app/shared/services/credit-line.service';
import { AssociatedInfoService } from 'src/app/shared/services/associated-info.service';
import { tap, switchMap } from 'rxjs/operators';
import { PersonService } from 'src/app/shared/services/person.service';
import { AssociatedInfo } from 'src/app/shared/models/associated-info';
import { CreditPaymentService } from 'src/app/shared/services/credit-payment.service';
import { ResultOperation } from 'src/app/shared/models/result-operation';

@Component({
  selector: 'app-rotative-credits-show',
  templateUrl: 'rotative-credits-show.component.html',
  styles: []
})
export class RotativeCreditsShowComponent implements OnInit {
  faThList = faThList;
  faEye = faEye;

  id = '';
  decision: string = '';

  resultOperation: ResultOperation = new ResultOperation;

  person: Person = new Person;
  lstCredit: CreditAssociated[] = [];
  creditLine: CreditLine = new CreditLine;
  creditAssociated: CreditAssociated = new CreditAssociated;
  lstPayments: CreditPayment[] = [];
  associatedInfo: AssociatedInfo = new AssociatedInfo;

  constructor(
    private activateRoute: ActivatedRoute,
    private creditAssociatedService: CreditAssociatedService,
    private creditLineService: CreditLineService,
    private associatedInfoService: AssociatedInfoService,
    private personService:PersonService,
    private creditPaymentService: CreditPaymentService
  ) { }

  ngOnInit() {
    let id = this.activateRoute.snapshot.params['id'];
    this.id = id;
    this.getDataById(id);    
  }

  private getDataById(id:number){
    this.creditAssociatedService.show$(id).pipe(
      tap((credit_associated:CreditAssociated) => this.creditAssociated = credit_associated),
      tap((credit_associated:CreditAssociated) => this.creditLineService.show$(credit_associated.fk_id_credit_line).subscribe(
        credit_line => this.creditLine = credit_line
      )),
      tap((credit_associated:CreditAssociated) => this.creditAssociatedService.getByAssociated$(credit_associated.fk_id_associated_info).subscribe(
        lst_credits => this.lstCredit = lst_credits
      )),
      tap((credit_associated:CreditAssociated) => this.creditPaymentService.getByCredit$(credit_associated.pk_id_credit_associated).subscribe(
        lst_payment => this.lstPayments = lst_payment
      )),
      switchMap((credit_associated:CreditAssociated) => this.associatedInfoService.show$(credit_associated.fk_id_associated_info)),
      tap((associated_info:AssociatedInfo) => this.associatedInfo = associated_info),
      tap((associated_info:AssociatedInfo) => this.personService.show$(parseInt(associated_info.external_reference_person.split(':')[0])).subscribe(
        person => this.person = person
      ))
    ).subscribe()
  }

  setDecisionCredit(decision:string){
    this.decision = decision
  }

  private getCreditInfo(id:number){
    this.creditAssociatedService.show$(id).subscribe(
      credit => this.creditAssociated = credit
    )
  }

  onUpdateState(creditAssociated:CreditAssociated){
    this.creditAssociatedService.updateState$(creditAssociated).subscribe(
      result_operation => {
        this.getCreditInfo(creditAssociated.pk_id_credit_associated);
        this.resultOperation = result_operation
      }
    )
  }

  updateDisbursmentDate(){
    this.creditAssociatedService.updateDisbursmentDate$(this.creditAssociated).subscribe(
      result_operation => {
        this.getCreditInfo(this.creditAssociated.pk_id_credit_associated);
        this.resultOperation = result_operation
      }
    )
  }  
}
