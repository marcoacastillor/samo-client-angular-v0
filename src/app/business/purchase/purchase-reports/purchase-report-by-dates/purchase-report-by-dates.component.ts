import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { faSearch, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/shared/models/user';
import { Parameter } from 'src/app/shared/models/parameter';
import { environment } from 'src/environments/environment';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import * as moment from 'moment';
import { OperationService } from 'src/app/shared/services/operation.service';
import { Operation } from 'src/app/shared/models/operation';

@Component({
  selector: 'app-purchase-report-by-dates',
  templateUrl: 'purchase-report-by-dates.component.html',
  styles: []
})
export class PurchaseReportByDatesComponent implements OnInit {
  reportForm: FormGroup;

  faSearch = faSearch;
  faCalendar = faCalendar;

  activeUser: User = new User;
  lstParameters: Parameter[] = [];
  lstOperations: Operation[]  = [];

  public dateInit: string;
  public dateEnd: string;
  public consolidate_day: number = environment.consolidate_day;

  constructor(
    private globalStoreService: GlobalStoreService,
    private operationService: OperationService,
    private formToolService: FormToolsService,
    private fb: FormBuilder,
    ) { }

  ngOnInit() {
    this.activeUser = this.globalStoreService.getUser();
    this.dateEnd = moment().add().format('YYYY-MM-DD');
    this.dateInit = moment().add(-this.consolidate_day,'days').format('YYYY-MM-DD');
    this.initUpdForm(this.dateInit,this.dateEnd);
    this.getDataByParams();
  }

  //paymentType: string, fromDate: string, toDate: string, type_operation: string

  public getDataByParams(){
    this.operationService.getByPaymentTypeAndDatesAndType$(this.reportForm.value.payment_type,moment(this.reportForm.value.from_date).format('YYYY-MM-DD'),moment(this.reportForm.value.to_date).format('YYYY-MM-DD'),environment.purchase).subscribe(
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
