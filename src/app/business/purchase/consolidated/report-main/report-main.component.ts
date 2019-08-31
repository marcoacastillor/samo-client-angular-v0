import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { faCalendar, faSync, faUpload, faEye } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { OperationService } from 'src/app/shared/services/operation.service';
import { ConsolidateOperation } from 'src/app/shared/models/consolidate-operation';
import { ConsolidateTotals } from 'src/app/shared/models/consolidate-totals';
import { Operation } from 'src/app/shared/models/operation';

@Component({
  selector: 'app-report-main',
  templateUrl: 'report-main.component.html',
  styles: []
})
export class ReportMainComponent implements OnInit {
  faUpload  = faUpload;
  faCalendar = faCalendar;
  faEye = faEye;

  reportForm: FormGroup;
  lstOperations: Operation[] = [];
  
  public dateInit: string;
  public dateEnd: string;
  public consolidate_day: number = environment.consolidate_day;

  efecty = environment.efecty_payment;
  credit = environment.credit_payment;
  discount = environment.discounts_purchase;

  consolidates: ConsolidateOperation = new ConsolidateOperation;
  
  constructor(
    private fb: FormBuilder,
    private operationService: OperationService,
  ) { 
    this.consolidates.operations_totals = new ConsolidateTotals;
    this.consolidates.operations_values = new ConsolidateTotals;
  }

  ngOnInit() {
    this.dateEnd = moment().add(+1,'days').format('YYYY-MM-DD');
    this.dateInit = moment().add(-this.consolidate_day,'days').format('YYYY-MM-DD');
    
    this.initUpdForm(this.dateInit, this.dateEnd);
    this.loadData();
  }

  /*
  * ------------------------------------------
  * Funciones propias del controlador
  * ------------------------------------------
  */
  private initUpdForm(dateInit: string, dateEnd: string) {
    this.reportForm = this.fb.group({
      from_date: [dateInit],
      to_date: [dateEnd],
    });
  }

  public loadData(){
    this.operationService.getConsolidateByDates$(moment(this.reportForm.value.from_date).format('YYYY-MM-DD'), moment(this.reportForm.value.to_date).format('YYYY-MM-DD'),environment.purchase).subscribe(
      data => this.consolidates = data
    );
  }

  public findOperationByTypePayment(paymentType:string){
    this.operationService.getByPaymentTypeAndDatesAndType$(paymentType,moment(this.reportForm.value.from_date).format('YYYY-MM-DD'), moment(this.reportForm.value.to_date).format('YYYY-MM-DD'),environment.purchase).subscribe(
      operations => this.lstOperations = operations
    )
  }

}