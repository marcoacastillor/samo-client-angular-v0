import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';
import { OperationService } from 'src/app/shared/services/operation.service';
import * as moment from 'moment';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { Operation } from 'src/app/shared/models/operation';
import { Purchase } from 'src/app/shared/models/purchase';
import { tap, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { Payment } from 'src/app/shared/models/payment';
import { PaymentService } from 'src/app/shared/services/payment.service';

@Component({
  selector: 'app-admin-purchase-report',
  templateUrl: 'admin-purchase-report.component.html',
  styles: []
})
export class AdminPurchaseReportComponent implements OnInit {
  reportForm: FormGroup;
  public faCalendar = faCalendar;
  
  public dateInit: string;
  public dateEnd: string;
  public consolidate_day: number = environment.consolidate_day;

  public consolidateData: any = [];

  //Datos para pagos
  public enterprise: Enterprise = new Enterprise;
  public operation: Purchase = new Purchase;

  constructor(
    private operationService: OperationService,
    private enterpriseService: EnterpriseService,
    private paymentService: PaymentService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.dateEnd = moment().add(+this.consolidate_day,'days').format('YYYY-MM-DD');
    this.dateInit = moment().add(-this.consolidate_day,'days').format('YYYY-MM-DD');
    
    this.loadData(this.dateInit, this.dateEnd);
    this.initUpdForm(this.dateInit, this.dateEnd);
  }

  public onViewOperation(pk_id_operation: number)
  {
    this.operationService.show_purchase$(pk_id_operation).pipe(
      tap(this.loadOperation),
      switchMap((operation: Operation): Observable<Enterprise> => this.enterpriseService.showByExternalReference$(operation.external_reference)),
      tap(this.loadProvider)
    )
    .subscribe(); 
  }

  private loadOperation = (operation: any): void => {
    this.operation = operation;
  }

  private loadProvider = (enterprise: Enterprise): void => {
    this.enterprise = enterprise;
  }

  /**
   * Funciones para crear pagos
   */
  public onCreatePayment(payment: Payment){
    this.paymentService.store$(payment).subscribe(
      payment => {
        this.loadData(this.dateInit, this.dateEnd);
      }
    )
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

  public loadData(dateInit: string, dateEnd: string){
    this.operationService.getConsolidateByDates$(dateInit, dateEnd,environment.purchase).subscribe(
      data => this.consolidateData = data
    );
  }

  public loadDataFromForm(){
    let fromDate = moment(this.reportForm.value.from_date).format('YYYY-MM-DD');
    let toDate = moment(this.reportForm.value.to_date).format('YYYY-MM-DD');

    this.loadData(fromDate, toDate);
  } 
}
