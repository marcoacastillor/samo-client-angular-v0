import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faThList, faSave, faCalendar, faEye } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/shared/models/user';
import { Parameter } from 'src/app/shared/models/parameter';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { PersonService } from 'src/app/shared/services/person.service';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Person } from 'src/app/shared/models/person';
import { PreferenceClientService } from 'src/app/shared/services/preference-client.service';
import { PreferenceClient } from 'src/app/shared/models/preference-client';

@Component({
  selector: 'app-client-form',
  templateUrl: 'client-form.component.html',
  styles: []
})
export class ClientFormComponent implements OnInit {
  clientForm: FormGroup;

  person: Person = new Person;
  preferenceClient: PreferenceClient = new PreferenceClient;
  
  faThList = faThList;
  faSave = faSave;
  faCalendar = faCalendar;
  faEye = faEye;

  //cargar parámetros para la creación del empleado
  //tipos de id; tipos de salario; tipo de contrato; porcentajes parafiscales
  type_id = environment.type_ids;
  type_salary = environment.salary_type;
  type_contract = environment.contract_type;

  categories      = {'categories' : [this.type_id,this.type_salary,this.type_contract]};
  
  activeUser: User = new User;
  parametersList: Parameter[] = [];
  lstClients: Person[] = [];

  success = false;
  message = '';
  id_person = '';

  lastkeydown1 = 0;

  constructor(
    private activateRoute: ActivatedRoute,
    private fb: FormBuilder,
    private globalStoreService: GlobalStoreService,
    private parameterService: ParameterService,
    private formToolService: FormToolsService,
    private personService: PersonService,
    private preferenceClientService: PreferenceClientService
  ) { 
    this.initForm();
  }

  ngOnInit() {
    this.activeUser = this.globalStoreService.getUser();
    this.id_person = this.activateRoute.snapshot.params['id'];
    if(this.id_person == 'new'){
      this.person = new Person;
    }else{
      this.personService.show$(parseInt(this.id_person)).pipe(
        tap((person:Person) => {
          this.person = person;
        }),
        tap((person:Person) => {
          this.preferenceClientService.getByPerson$(person.pk_id_person).subscribe(
            preferece_client => { 
              this.preferenceClient = preferece_client; 
              this.initForm(); 
            }
          )
        }),
      ).subscribe();
    }
    this.loadParameters();    
  }

  private loadParameters(){
    this.parameterService.getByMultipleCodeCategory$(this.categories).pipe(
      tap((parametersLst: Parameter[]) => {
         this.parametersList = parametersLst
      })
    ).subscribe()
  }

  private initForm(){
    this.clientForm = this.fb.group({
      pk_id_person: [this.person.pk_id_person],
      type_id: [this.person.type_id,Validators.required],
      number_id: [this.person.number_id,Validators.required],
      names: [this.person.names,Validators.required],
      last_names: [this.person.last_names,Validators.required],
      address: [this.person.address,Validators.required],
      phone: [this.person.phone,Validators.required],
      preference_client: this.fb.group({
        pk_id_preference: [this.preferenceClient.pk_id_preference],
        fk_id_person: [this.preferenceClient.fk_id_person],
        score: [this.preferenceClient.score],
        max_discount: [this.preferenceClient.max_discount]
      }),
    })
  }

  saveClient(){
    this.personService.createPerson$(this.clientForm.value).pipe(
      tap((person:Person) => {
        this.clientForm.get('preference_client').patchValue({
          fk_id_person: person.pk_id_person
        });
        this.preferenceClientService.create$(this.clientForm.get('preference_client').value).subscribe(
          preference_client => this.preferenceClient = preference_client
        )
      }),
      tap(
        () => {
          this.success = true;
          this.message = 'Se crea correctamente el empleado';
          this.clientForm.reset();
        }
      )
    ).subscribe()
  }

  updateClient(){
    this.personService.updateClient$(this.clientForm.value).pipe(
      tap(() => {
        this.preferenceClientService.update$(this.clientForm.get('preference_client').value).subscribe(
          preference_client => this.preferenceClient = preference_client
        )
      }),
      tap(
        () => {
          this.success = true;
          this.message = 'Se actualiza correctamente el empleado';
        }
      )
    ).subscribe()
  }

  onFindClient(filter: any){
    let idClient = (<HTMLInputElement>document.getElementById('filterClient')).value;
    this.lstClients = [];

    if (idClient.length > 0) {
      if (filter.timeStamp - this.lastkeydown1 > 200) {
        this.personService.getPersonsByIdFilter$(idClient).subscribe(
          lstClients => {
            this.lstClients = lstClients;
          },
        )
      }
    }
  }

  selectClient(person: Person){
    this.lstClients = [];
    this.clientForm.patchValue({
      type_id: person.type_id,
      number_id: person.number_id,
      names: person.names,
      last_names: person.last_names,
      address: person.address,
      phone: person.phone
    })
  }


  /**
  * Funciones para verificar si los formularios son obligatorios o no.
  */

  public getErrorsChild(controlName: string, child:string,): any {
    return this.formToolService.getErrorsChild(this.clientForm, controlName, child);
  }

  public mustShowErrorChild(controlName: string, child:string,) {
    return this.formToolService.mustShowErrorChild(this.clientForm, controlName, child);
  }

  public getErrors(controlName: string): any {
    return this.formToolService.getErrors(this.clientForm, controlName);
  }

  public mustShowError(controlName: string) {
    return this.formToolService.mustShowError(this.clientForm, controlName);
  }

  public hasError(controlName: string, errorCode: string): any {
    return this.formToolService.hasError(this.clientForm, controlName, errorCode);
  }

}
