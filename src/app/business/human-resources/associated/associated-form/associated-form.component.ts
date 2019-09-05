import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faThList, faSave, faCalendar, faEye } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/shared/models/user';
import { Parameter } from 'src/app/shared/models/parameter';
import { Person } from 'src/app/shared/models/person';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { PersonService } from 'src/app/shared/services/person.service';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { tap, switchMap, switchMapTo } from 'rxjs/operators';
import { AssociatedInfoService } from 'src/app/shared/services/associated-info.service';
import { ResultOperation } from 'src/app/shared/models/result-operation';
import { ActivatedRoute } from '@angular/router';
import { AssociatedInfo } from 'src/app/shared/models/associated-info';

@Component({
  selector: 'app-associated-form',
  templateUrl: 'associated-form.component.html',
  styles: []
})
export class AssociatedFormComponent implements OnInit {
  associatedForm: FormGroup;
  
  faThList = faThList;
  faSave = faSave;
  faCalendar = faCalendar;
  faEye = faEye;

  id: string = '';

  activeUser: User = new User;
  lstParameters: Parameter[] = [];
  lstPersons: Person[] = [];

  associatedSelected: AssociatedInfo = new AssociatedInfo;
  personSelected: Person = new Person;
  
  lastkeydown1 = 0;

  resultOperation: ResultOperation = new ResultOperation;

  term_interest = environment.term_interest;
  type_id = environment.type_ids;

  categories      = {'categories' : [environment.term_interest,environment.type_ids]};

  constructor(
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private globalStoreService: GlobalStoreService,
    private parameterService: ParameterService,
    private formToolService: FormToolsService,
    private personService: PersonService,
    private associatedInfoService: AssociatedInfoService
  ) {
    this.initForm(this.personSelected,this.associatedSelected);
   }

  ngOnInit() {
    let id = this.activateRoute.snapshot.params['id'];
    if(id == 'new'){
      this.associatedSelected = new AssociatedInfo;
      this.personSelected = new Person;
      this.initForm(this.personSelected,this.associatedSelected);
    }else{
      this.getDataById(id);
    }
    this.id = id;
    this.activeUser = this.globalStoreService.getUser();
    this.loadParameters();
  }

  private getDataById(id:string){
    this.associatedInfoService.show$(parseInt(id)).pipe(
      tap((associatedInfo:AssociatedInfo) => this.associatedSelected = associatedInfo),
      switchMap((associatedInfo:AssociatedInfo) => this.personService.show$(parseInt(associatedInfo.external_reference_person.split(':')[0]))),
      tap((person:Person) => this.personSelected = person),
    ).subscribe(
      () => this.initForm(this.personSelected,this.associatedSelected)
    )
  }

  private loadParameters(){
    this.parameterService.getByMultipleCodeCategory$(this.categories).subscribe(
      lst_parameters => this.lstParameters = lst_parameters
    )
  }

  private initForm(person:Person, associatedInfo: AssociatedInfo){
    this.associatedForm = this.fb.group({
      person: this.fb.group({
        pk_id_person: [person.pk_id_person],
        type_id: [person.type_id,Validators.required],
        number_id: [person.number_id,Validators.required],
        names: [person.names,Validators.required],
        last_names: [person.last_names,Validators.required],
        address: [person.address,Validators.required],
        phone: [person.phone,Validators.required],
      }),
      associated: this.fb.group({
        pk_id_associated_info: [associatedInfo.pk_id_associated_info],
        fk_id_enterprise: [this.activeUser.fk_id_enterprise],
        external_reference_person: [associatedInfo.external_reference_person],
        date_of_admission: [associatedInfo.date_of_admission, Validators.required],
        min_contribution: [associatedInfo.min_contribution, Validators.required],
        period_contribution: [associatedInfo.period_contribution]
      })
    })
  }

  onFindClient(filter: any){
    let idClient = (<HTMLInputElement>document.getElementById('filterClient')).value;
    this.lstPersons = [];

    if (idClient.length > 0) {
      if (filter.timeStamp - this.lastkeydown1 > 200) {
        this.personService.getPersonsByIdFilter$(idClient).subscribe(
          lstPersons => {
            this.lstPersons = lstPersons;
          },
        )
      }
    }
  }

  selectClient(person: Person){
    this.lstPersons = [];
    this.associatedForm.get('person').patchValue({
      type_id: person.type_id,
      number_id: person.number_id,
      names: person.names,
      last_names: person.last_names,
      address: person.address,
      phone: person.phone
    });
    this.associatedForm.get('associated').patchValue({
      external_reference_person: person.pk_id_person+':'+person.type_id+':'+person.number_id+':'+person.names+':'+person.last_names
    })
  }
  
  saveAssociated(){
    this.associatedForm.get('associated').patchValue({
      date_of_admission: moment(this.associatedForm.get('associated').value.date_of_admission).format('YYYY-MM-DD'),
    });

    this.personService.createPersonBasic$(this.associatedForm.get('person').value).pipe(
      tap((person:Person) => {
        this.associatedForm.get('associated').patchValue({
          external_reference_person: person.pk_id_person+':'+person.type_id+':'+person.number_id+':'+person.names+':'+person.last_names
        });
        this.associatedInfoService.create$(this.associatedForm.get('associated').value).subscribe(
          result_operation => {
            this.resultOperation = result_operation;
            this.initForm(this.personSelected,this.associatedSelected);
          }
        )
      }),
    ).subscribe()
  }

  updateAssociated(){
    this.associatedForm.get('associated').patchValue({
      date_of_admission: moment(this.associatedForm.get('associated').value.date_of_admission).format('YYYY-MM-DD'),
    });

    this.personService.createPersonBasic$(this.associatedForm.get('person').value).pipe(
      tap((person:Person) => {
        this.associatedForm.get('associated').patchValue({
          external_reference_person: person.pk_id_person+':'+person.type_id+':'+person.number_id+':'+person.names+':'+person.last_names
        });
        this.associatedInfoService.update$(this.associatedForm.get('associated').value).subscribe(
          result_operation => {
            this.resultOperation = result_operation;
            //this.initForm(this.personSelected,this.associatedSelected);
          }
        )
      }),
    ).subscribe()
  }
  
  /**
  * Funciones para verificar si los formularios son obligatorios o no.
  */

  public getErrors(controlName: string, controlNameChild: string): any {
    return this.formToolService.getErrorsChild(this.associatedForm, controlName, controlNameChild);
  }

  public mustShowError(controlName: string, controlNameChild: string) {
    return this.formToolService.mustShowErrorChild(this.associatedForm, controlName, controlNameChild);
  }

  public hasError(controlName: string, controlNameChild: string, errorCode: string): any {
    return this.formToolService.hasErrorChild(this.associatedForm, controlName, controlNameChild, errorCode);
  }

}
