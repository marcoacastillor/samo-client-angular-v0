import { Component, OnInit } from '@angular/core';
import { faEye, faEdit, faSearch, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { Parameter } from 'src/app/shared/models/parameter';
import { Operation } from 'src/app/shared/models/operation';
import { OperationProduct } from 'src/app/shared/models/operation-product';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { OperationService } from 'src/app/shared/services/operation.service';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { OperationProductService } from 'src/app/shared/services/operation-product.service';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-sales-reports-by-debt-time',
  templateUrl: 'sales-reports-by-debt-time.component.html',
  styles: []
})
export class SalesReportsByDebtTimeComponent implements OnInit {
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
    this.initUpdForm();
    this.getParameters();
  }

  private getParameters(){
    this.parameterService.getByCodeCategory$(environment.debt_time_invocie).subscribe(
      lst_parameters => this.lstParameters = lst_parameters
    )
  }

  public getDataByParams(){
    this.operationService.getByTypeAndDebtTime$(environment.sales,this.reportForm.value.debt_time).subscribe(
      lst_operations => this.lstOperations = lst_operations
    )
  }

  private initUpdForm() {
    this.reportForm = this.fb.group({
      debt_time: ['']
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
