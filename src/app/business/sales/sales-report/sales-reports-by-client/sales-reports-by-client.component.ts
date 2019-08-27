import { Component, OnInit } from '@angular/core';
import { faEye, faEdit, faSearch, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Parameter } from 'src/app/shared/models/parameter';
import { Operation } from 'src/app/shared/models/operation';
import { OperationProduct } from 'src/app/shared/models/operation-product';
import { User } from 'src/app/shared/models/user';
import { Person } from 'src/app/shared/models/person';
import { environment } from 'src/environments/environment';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { OperationService } from 'src/app/shared/services/operation.service';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { OperationProductService } from 'src/app/shared/services/operation-product.service';
import { PersonService } from 'src/app/shared/services/person.service';
import * as moment from 'moment';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-sales-reports-by-client',
  templateUrl: 'sales-reports-by-client.component.html',
  styles: []
})
export class SalesReportsByClientComponent implements OnInit {
  faEye = faEye;
  faEdit = faEdit;
  
  reportForm: FormGroup;

  faSearch = faSearch;
  faCalendar = faCalendar;

  activeUser: User = new User;
  lstParameters: Parameter[] = [];
  lstOperations: Operation[]  = [];
  lstProducts: OperationProduct [] = [];
  lstOperationsAggregate: Operation[]  = [];

  lstClients: Person[] = [];
  client: Person = new Person;

  selectedOperation:Operation = new Operation;
  lastkeydown1 = 0;
  emptyProv = false;

  public dateInit: string;
  public dateEnd: string;
  public consolidate_day: number = environment.consolidate_day;

  constructor(
    private globalStoreService: GlobalStoreService,
    private operationService: OperationService,
    private formToolService: FormToolsService,
    private parameterService: ParameterService,
    private operationProductService: OperationProductService,
    private personService: PersonService,
    private fb: FormBuilder,
    ) { }

  ngOnInit() {
    this.activeUser = this.globalStoreService.getUser();
    this.dateEnd = moment().add().format('YYYY-MM-DD');
    this.dateInit = moment().add(-this.consolidate_day,'days').format('YYYY-MM-DD');
    this.initUpdForm(this.dateInit,this.dateEnd);
    this.getParameters();
  }

  onFindClient(filter: any){
    let codeClient = (<HTMLInputElement>document.getElementById('filterClient')).value;
    this.lstClients = [];

    if (codeClient.length > 0) {
      if (filter.timeStamp - this.lastkeydown1 > 200) {
        this.personService.getPersonsByNamesFilter$(codeClient).subscribe(
          lstClients => this.lstClients = lstClients,
          () => this.emptyProv = true
        )
      }
    }
  }

  selectClient(client: Person){
    this.client = client;
    this.lstClients = [];
    this.reportForm.patchValue({
      external_reference: 'C:'+client.pk_id_person+':'+client.names+' '+client.last_names+':'+client.number_id,
      client: client.names + ' ' + client.last_names
    })
  }


  private getParameters(){
    this.parameterService.getByCodeCategory$(environment.type_payment).subscribe(
      lst_parameters => this.lstParameters = lst_parameters
    )
  }

  public getOperationsByClientAndParams(){
    this.operationService.getByPaymentTypeAndDatesAndTypeAndAggregate$(
      this.reportForm.value.payment_type,
      moment(this.reportForm.value.from_date).format('YYYY-MM-DD'),
      moment(this.reportForm.value.to_date).format('YYYY-MM-DD'),
      environment.sales,
      environment.type_disaggregated,
      this.reportForm.value.external_reference
      ).subscribe(
      lst_operations => this.lstOperations = lst_operations
    )
  }

  private initUpdForm(dateInit: string, dateEnd: string) {
    this.reportForm = this.fb.group({
      from_date: [dateInit,Validators.required],
      to_date: [dateEnd,Validators.required],
      payment_type: [''],
      external_reference: [''],
      client: ['',Validators.required]
    });
  }

  public selectOperation(operation:Operation){
    this.operationProductService.getProductsByOperation$(operation.pk_id_operation).pipe(
      tap((lstProducts: OperationProduct[]) => {
        this.lstProducts = lstProducts
      }),
      tap(() => this.selectedOperation = operation)
    ).subscribe()
  }

  public getErrors(controlName: string): any {
    return this.formToolService.getErrors(this.reportForm, controlName);
  }

  public mustShowError(controlName: string) {
    return this.formToolService.mustShowError(this.reportForm, controlName);
  }

  public hasError(controlName: string, errorCode: string): any {
    return this.formToolService.hasError(this.reportForm, controlName, errorCode);
  }

}
