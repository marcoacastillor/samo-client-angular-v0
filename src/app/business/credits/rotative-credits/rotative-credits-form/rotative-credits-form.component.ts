import { Component, OnInit } from '@angular/core';
import { ResultOperation } from 'src/app/shared/models/result-operation';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faThList, faSave, faCalendar, faEye, faDonate } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/shared/models/user';
import { CreditAssociated } from 'src/app/shared/models/credit-associated';
import { ActivatedRoute } from '@angular/router';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { CreditAssociatedService } from 'src/app/shared/services/credit-associated.service';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AssociatedInfoService } from 'src/app/shared/services/associated-info.service';
import { AssociatedInfo } from 'src/app/shared/models/associated-info';
import { CreditLineService } from 'src/app/shared/services/credit-line.service';
import { CreditLine } from 'src/app/shared/models/credit-line';

@Component({
  selector: 'app-rotative-credits-form',
  templateUrl: 'rotative-credits-form.component.html',
  styles: []
})
export class RotativeCreditsFormComponent implements OnInit {
  creditForm: FormGroup;
  
  faThList = faThList;
  faSave = faSave;
  faCalendar = faCalendar;
  faEye = faEye;
  faDonate = faDonate;

  activeUser: User = new User;
  lstCreditLine: CreditLine[] = [];
  lstAssociated: AssociatedInfo[] = [];

  creditSelected: CreditAssociated = new CreditAssociated;
  associatedSelected: AssociatedInfo = new AssociatedInfo;
  resultOperation: ResultOperation = new ResultOperation;
  selectedCredit:CreditLine = new CreditLine;

  id: string = '';

  categories   = {'categories' : [environment.term_interest,environment.type_ids]};
  lastkeydown1 = 0;
  max_payment_deadline = 0;
  max_value_approved = 1;
  readOnly = false;
  pmt = 0;

  constructor(
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private globalStoreService: GlobalStoreService,
    private creditLineService: CreditLineService,
    private formToolService: FormToolsService,
    private associatedInfoService: AssociatedInfoService,
    private creditAssociatedService: CreditAssociatedService
  ) { 
    this.initForm();
  }

  ngOnInit() {
    this.activeUser = this.globalStoreService.getUser();
    let id = this.activateRoute.snapshot.params['id'];
    if(id == 'new'){
      this.creditSelected = new CreditAssociated;
      this.initForm();
    }else{
      this.getDataById(id);
    }
    this.id = id;
    this.loadParameters();
  }

  private getDataById(id:string){
    this.creditAssociatedService.show$(parseInt(id)).pipe(
      tap((credit:CreditAssociated) => this.creditSelected = credit),
      tap((credit:CreditAssociated) => this.associatedInfoService.show$(credit.fk_id_associated_info).subscribe(
        associated => {
          this.associatedSelected = associated;
          this.max_payment_deadline = this.creditSelected.payment_deadline;
          this.readOnly = true;
          this.max_value_approved = this.associatedSelected.total_contribution * environment.max_approval;
          this.creditForm.patchValue({
            fk_id_associated_info: this.associatedSelected.pk_id_associated_info,
            names: this.associatedSelected.external_reference_person.split(':')[1]+ ' ' + this.associatedSelected.external_reference_person.split(':')[2] + ' ' + this.associatedSelected.external_reference_person.split(':')[3] + ' ' + this.associatedSelected.external_reference_person.split(':')[4],
          })
        }
      )),
      tap((credit:CreditAssociated) => this.creditLineService.show$(credit.fk_id_credit_line).subscribe(
        credit_line => this.selectedCredit = credit_line
      ))
    ).subscribe(
      () => this.initForm()
    )
  }

  private loadParameters(){
    this.creditLineService.getAll$().subscribe(
      lst_credits => this.lstCreditLine = lst_credits
    )
  }

  private initForm(){
    this.creditForm = this.fb.group({
      pk_id_credit_associated: [this.creditSelected.pk_id_credit_associated],
      fk_id_associated_info: [this.creditSelected.fk_id_associated_info],
      fk_id_credit_line: [this.creditSelected.fk_id_credit_line],
      code: [this.creditSelected.code,Validators.required],
      amount_solicited: [this.creditSelected.amount_solicited],
      payment_deadline: [this.creditSelected.payment_deadline,Validators.required],
      value_payment: [this.creditSelected.value_payment],
      number_fees: [this.creditSelected.number_fees, Validators.required],
      names: [this.associatedSelected.external_reference_person.split(':')[1]+ ' ' + this.associatedSelected.external_reference_person.split(':')[2] + ' ' + this.associatedSelected.external_reference_person.split(':')[3] + ' ' + this.associatedSelected.external_reference_person.split(':')[4], Validators.required],
    })
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
    this.max_value_approved = associated.total_contribution * environment.max_approval;
    this.associatedSelected = associated;

    this.lstAssociated = [];
    this.creditForm.patchValue({
      names: associated.external_reference_person.split(':')[1]+ ' ' + associated.external_reference_person.split(':')[2] + ' ' + associated.external_reference_person.split(':')[3] + ' ' + associated.external_reference_person.split(':')[4],
      fk_id_associated_info: associated.pk_id_associated_info,
      amount_solicited: this.max_value_approved
    })
  }

  updateMaxPaymentDeadline(){
    let creditLine = (<HTMLInputElement>document.getElementById('creditLine')).value;
    if(parseInt(creditLine) > 0)
    {
      let selectedCredit = this.lstCreditLine.filter(credit => credit.pk_id_credit_line === parseInt(creditLine));
      this.selectedCredit = selectedCredit[0];

      this.max_payment_deadline = selectedCredit[0].max_payment_deadline;
      this.creditForm.patchValue({
        fk_id_credit_line: selectedCredit[0].pk_id_credit_line,
        number_fees: this.max_payment_deadline,
        payment_deadline: this.max_payment_deadline,
        code: selectedCredit[0].code
      });

      this.simulateCredit();
    }
  }

  saveCredit(){
    this.creditAssociatedService.create$(this.creditForm.value).subscribe(
      res_operation => {
        this.resultOperation = res_operation;
        this.creditForm.reset();
      }
    )
  }

  updateCredit(){
    this.creditAssociatedService.update$(this.creditForm.value).subscribe(
      res_operation => {
        this.resultOperation = res_operation;
      }
    )
  }

  simulateCredit(){
    this.creditAssociatedService.getPMT$(this.selectedCredit.interest, this.selectedCredit.term_interest, this.creditForm.value.number_fees, this.creditForm.value.amount_solicited).subscribe(
      pmt => this.creditForm.patchValue({
        value_payment: pmt
      })
    )
  }

  /**
  * Funciones para verificar si los formularios son obligatorios o no.
  */

  public getErrors(controlName: string): any {
    return this.formToolService.getErrors(this.creditForm, controlName);
  }

  public mustShowError(controlName: string) {
    return this.formToolService.mustShowError(this.creditForm, controlName);
  }

  public hasError(controlName: string, errorCode: string): any {
    return this.formToolService.hasError(this.creditForm, controlName, errorCode);
  }

}
