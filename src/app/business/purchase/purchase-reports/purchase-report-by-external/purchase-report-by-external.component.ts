import { Component, OnInit } from '@angular/core';
import { faEye, faEdit, faSearch, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { Parameter } from 'src/app/shared/models/parameter';
import { Operation } from 'src/app/shared/models/operation';
import { OperationProduct } from 'src/app/shared/models/operation-product';
import { environment } from 'src/environments/environment';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { OperationService } from 'src/app/shared/services/operation.service';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { OperationProductService } from 'src/app/shared/services/operation-product.service';
import { tap } from 'rxjs/operators';
import * as moment from 'moment';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';

@Component({
  selector: 'app-purchase-report-by-external',
  templateUrl: 'purchase-report-by-external.component.html',
  styles: []
})
export class PurchaseReportByExternalComponent implements OnInit {
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

  lstProviders: Enterprise[] = [];
  enterprise: Enterprise = new Enterprise;

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
    private enterpriseService: EnterpriseService,
    private fb: FormBuilder,
    ) { }

  ngOnInit() {
    this.activeUser = this.globalStoreService.getUser();
    this.dateEnd = moment().add().format('YYYY-MM-DD');
    this.dateInit = moment().add(-this.consolidate_day,'days').format('YYYY-MM-DD');
    this.initUpdForm(this.dateInit,this.dateEnd);
    this.getParameters();
  }

  onFindProvider(filter: any){
    let codeProvider = (<HTMLInputElement>document.getElementById('filterProvider')).value;
    this.lstProviders = [];

    if (codeProvider.length > 0) {
      if (filter.timeStamp - this.lastkeydown1 > 200) {
        this.enterpriseService.getByNameFilter$(codeProvider, environment.enterprise_provider).subscribe(
          lstProviders => this.lstProviders = lstProviders,
          () => this.emptyProv = true
        )
      }
    }
  }

  selectProvider(provider: Enterprise){
    this.enterprise = provider;
    this.lstProviders = [];
    this.reportForm.patchValue({
      external_reference: 'E:'+provider.pk_id_enterprise+':'+provider.name+':'+provider.nit,
      provider: provider.name
    })
  }


  private getParameters(){
    this.parameterService.getByCodeCategory$(environment.type_payment).subscribe(
      lst_parameters => this.lstParameters = lst_parameters
    )
  }

  public getOperationsByProviderAndParams(){
    this.operationService.getByPaymentTypeAndDatesAndTypeAndAggregate$(
      this.reportForm.value.payment_type,
      moment(this.reportForm.value.from_date).format('YYYY-MM-DD'),
      moment(this.reportForm.value.to_date).format('YYYY-MM-DD'),
      environment.purchase,
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
      provider: ['',Validators.required]
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
