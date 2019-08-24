import { Component, OnInit } from '@angular/core';
import { faThList, faSave, faCalendar, faEye } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { environment } from 'src/environments/environment';
import { Parameter } from 'src/app/shared/models/parameter';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { Position } from 'src/app/shared/models/position';
import { PositionService } from 'src/app/shared/services/position.service';
import { tap } from 'rxjs/operators';
import { Person } from 'src/app/shared/models/person';
import { PersonService } from 'src/app/shared/services/person.service';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';
import * as moment from 'moment';

@Component({
  selector: 'app-employee-form',
  templateUrl: 'employee-form.component.html',
  styles: []
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  
  faThList = faThList;
  faSave = faSave;
  faCalendar = faCalendar;
  faEye = faEye;

  //cargar parámetros para la creación del empleado
  //tipos de id; tipos de salario; tipo de contrato; porcentajes parafiscales
  type_id = environment.type_ids;
  type_salary = environment.salary_type;
  type_contract = environment.contract_type;
  laboral_period = environment.laboral_period;

  categories      = {'categories' : [this.type_id,this.type_salary,this.type_contract,this.laboral_period]};
  
  activeUser: User = new User;
  parametersList: Parameter[] = [];
  positionsList: Position[] = [];
  lstClients: Person[] = [];
  lstProducts: Product[] = [];

  lastkeydown1 = 0;

  success = false;
  message = '';

  constructor(
    private fb: FormBuilder,
    private globalStoreService: GlobalStoreService,
    private parameterService: ParameterService,
    private formToolService: FormToolsService,
    private positionService: PositionService,
    private personService: PersonService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.activeUser = this.globalStoreService.getUser();
    this.initForm();
    this.loadParameters();
  }

  private loadParameters(){
    this.parameterService.getByMultipleCodeCategory$(this.categories).pipe(
      tap((parametersLst: Parameter[]) => {
         this.parametersList = parametersLst
      }),
      tap(() => {
        this.positionService.getByEnterpsie$(this.activeUser.fk_id_enterprise).subscribe(
          positionLst => this.positionsList = positionLst
        )
      })
    ).subscribe(
      
    )
  }

  private initForm(){
    this.employeeForm = this.fb.group({
      person: this.fb.group({
        type_id: ['',Validators.required],
        number_id: ['',Validators.required],
        names: ['',Validators.required],
        last_names: ['',Validators.required],
        address: ['',Validators.required],
        phone: ['',Validators.required],
      }),
      enterprise_person: this.fb.group({
        fk_id_position: ['', Validators.required],
        date_register: ['', Validators.required],
        state: ['']
      }),
      laboral_conditions: this.fb.group({
        contract_type: ['', Validators.required],
        salary_type: ['', Validators.required],
        salary: [''],
        period: [''],
        production_unit: [''],
        pk_product_unit: [''],
        value_product_unit: [''],
        benefit_health: [''],
        benefit_pension: [''],
        benefit_arl: [''],
        benefit_compensation_box: [''],
      }),
    })
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
    this.employeeForm.get('person').patchValue({
      type_id: person.type_id,
      number_id: person.number_id,
      names: person.names,
      last_names: person.last_names,
      address: person.address,
      phone: person.phone
    })
  }
  
  onFindProduct(filter: any){
    let nameProduct = (<HTMLInputElement>document.getElementById('filterProduct')).value;
    this.lstProducts = [];

    if (nameProduct.length > 0) {
      if (filter.timeStamp - this.lastkeydown1 > 200) {
        this.productService.getPaymentsProductsByNameFilter$(nameProduct).subscribe(
          lstProducts => {
            this.lstProducts = lstProducts;
          },
        )
      }
    }
  }

  selectProduct(product: Product){
    this.lstProducts = [];
    this.employeeForm.get('laboral_conditions').patchValue({
      production_unit: product.name,
      pk_product_unit: product.pk_id_product,
    })
  }

  saveEmployee(){
    this.employeeForm.get('enterprise_person').patchValue({
      date_register: moment(this.employeeForm.get('enterprise_person').value.date_register).format('YYYY-MM-DD'),
    });
    this.personService.createEmployee$(this.employeeForm.value).subscribe(
      () => {
        this.success = true;
        this.message = 'Se crea correctamente el empleado';
        this.employeeForm.reset();
      }
    )
  }
  
  /**
  * Funciones para verificar si los formularios son obligatorios o no.
  */

  public getErrors(controlName: string, controlNameChild: string): any {
    return this.formToolService.getErrorsChild(this.employeeForm, controlName, controlNameChild);
  }

  public mustShowError(controlName: string, controlNameChild: string) {
    return this.formToolService.mustShowErrorChild(this.employeeForm, controlName, controlNameChild);
  }

  public hasError(controlName: string, controlNameChild: string, errorCode: string): any {
    return this.formToolService.hasErrorChild(this.employeeForm, controlName, controlNameChild, errorCode);
  }
}