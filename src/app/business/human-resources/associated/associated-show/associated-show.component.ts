import { Component, OnInit } from '@angular/core';
import { faThList, faEye, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Person } from 'src/app/shared/models/person';
import { ActivatedRoute } from '@angular/router';
import { PersonService } from 'src/app/shared/services/person.service';
import { AssociatedInfoService } from 'src/app/shared/services/associated-info.service';
import { AssociatedInfo } from 'src/app/shared/models/associated-info';
import { tap } from 'rxjs/operators';
import { CreditAssociatedService } from 'src/app/shared/services/credit-associated.service';
import { CreditAssociated } from 'src/app/shared/models/credit-associated';
import { AssociatedContributionService } from 'src/app/shared/services/associated-contribution.service';
import { AssociatedContribution } from 'src/app/shared/models/associated-contribution';

@Component({
  selector: 'app-associated-show',
  templateUrl: 'associated-show.component.html',
  styles: []
})
export class AssociatedShowComponent implements OnInit {
  faThList = faThList;
  faEye = faEye;
  faEdit = faEdit;

  id: number;
  person: Person = new Person;
  associatedInfo: AssociatedInfo = new AssociatedInfo;
  lstCreditAssociated: CreditAssociated[] = [];
  lstAssociatedContributions: AssociatedContribution[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private personService: PersonService,
    private associatedInfoService: AssociatedInfoService,
    private creditAssociatedService: CreditAssociatedService,
    private associatedContributionsService: AssociatedContributionService
    
  ) { }

  ngOnInit() {
    let id = this.activateRoute.snapshot.params['id'];
    this.id = id;

    this.getInfoAssociated(id);
  }

  public loadPaymentsOfNumRow(id:number,num_row:number){
    this.associatedContributionsService.getByAssociated$(id,num_row).subscribe(
      associated_contributions => this.lstAssociatedContributions = associated_contributions
    )
  }

  private getInfoAssociated(id:number){
    this.associatedInfoService.show$(id).pipe(
      tap((associated:AssociatedInfo) => this.associatedInfo = associated),
      tap((associated:AssociatedInfo) => this.personService.show$(parseInt(associated.external_reference_person.split(':')[0])).subscribe(
        person => this.person = person
      )),
      tap((associated:AssociatedInfo) => this.creditAssociatedService.getByAssociated$(associated.pk_id_associated_info).subscribe(
        credit_associated => this.lstCreditAssociated = credit_associated
      )),
      tap((associated:AssociatedInfo) => this.loadPaymentsOfNumRow(associated.pk_id_associated_info,5))
    ).subscribe()
  }

}
