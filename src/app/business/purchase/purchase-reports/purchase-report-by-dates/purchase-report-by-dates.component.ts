import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { faSearch, faCalendar, faEye, faEdit } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/shared/models/user';
import { Parameter } from 'src/app/shared/models/parameter';
import { environment } from 'src/environments/environment';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import * as moment from 'moment';
import { OperationService } from 'src/app/shared/services/operation.service';
import { Operation } from 'src/app/shared/models/operation';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { OperationProductService } from 'src/app/shared/services/operation-product.service';
import { OperationProduct } from 'src/app/shared/models/operation-product';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-purchase-report-by-dates',
  templateUrl: 'purchase-report-by-dates.component.html',
  styles: []
})
export class PurchaseReportByDatesComponent implements OnInit {
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

  selectedOperation:Operation = new Operation;

  public dateInit: string;
  public dateEnd: string;
  public consolidate_day: number = environment.consolidate_day;

  constructor(
    private globalStoreService: GlobalStoreService,
    private operationService: OperationService,
    private formToolService: FormToolsService,
    private parameterService: ParameterService,
    private operationProductService: OperationProductService,
    private fb: FormBuilder,
    ) { }

  ngOnInit() {
    this.activeUser = this.globalStoreService.getUser();
    this.dateEnd = moment().format('YYYY-MM-DD');
    this.dateInit = moment().add(-this.consolidate_day,'days').format('YYYY-MM-DD');
    this.initUpdForm(this.dateInit,this.dateEnd);
    this.getDataByParams();
    this.getParameters();
  }

  private getParameters(){
    this.parameterService.getByCodeCategory$(environment.type_payment).subscribe(
      lst_parameters => this.lstParameters = lst_parameters
    )
  }

  public getDataByParams(){
    this.operationService.getByPaymentTypeAndDatesAndTypeAndAggregate$(
      this.reportForm.value.payment_type,
      moment(this.reportForm.value.from_date).format('YYYY-MM-DD'),
      moment(this.reportForm.value.to_date).format('YYYY-MM-DD'),
      environment.purchase,environment.type_aggregated,
      null
      ).subscribe(
      lst_operations => this.lstOperationsAggregate = lst_operations
    )
  }

  public getOperationsByProviderAndParams(id:number){
    this.operationService.getByPaymentTypeAndDatesAndTypeAndAggregate$(
      this.reportForm.value.payment_type,
      moment(this.reportForm.value.from_date).format('YYYY-MM-DD'),
      moment(this.reportForm.value.to_date).format('YYYY-MM-DD'),
      environment.purchase,
      environment.type_disaggregated,
      id
      ).subscribe(
      lst_operations => this.lstOperations = lst_operations
    )
  }

  private initUpdForm(dateInit: string, dateEnd: string) {
    this.reportForm = this.fb.group({
      from_date: [dateInit],
      to_date: [dateEnd],
      payment_type: ['']
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
