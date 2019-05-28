import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { Operation } from 'src/app/shared/models/operation';
import { OperationService } from 'src/app/shared/services/operation.service';
import { PaymentService } from 'src/app/shared/services/payment.service';
import * as moment from 'moment';
import { tap, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Payment } from 'src/app/shared/models/payment';
import { Person } from 'src/app/shared/models/person';
import { PersonService } from 'src/app/shared/services/person.service';

@Component({
  selector: 'app-admin-sale-report',
  templateUrl: 'admin-sale-report.component.html',
  styles: []
})
export class AdminSaleReportComponent implements OnInit {
  reportForm: FormGroup;
  public faCalendar = faCalendar;
  
  public dateInit: string;
  public dateEnd: string;
  public consolidate_day: number = environment.consolidate_day;

  public consolidateData: any = [];

  //Datos para pagos
  public person: Person = new Person;
  public operation: Operation = new Operation;

  constructor(
    private operationService: OperationService,
    private personService: PersonService,
    private paymentService: PaymentService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.consolidateData.operations = [];
    this.dateEnd = moment().add(+this.consolidate_day,'days').format('YYYY-MM-DD');
    this.dateInit = moment().add(-this.consolidate_day,'days').format('YYYY-MM-DD');
    
    this.loadData(this.dateInit, this.dateEnd);
    this.initUpdForm(this.dateInit, this.dateEnd);
  }

  public onViewOperation(pk_id_operation: number)
  {
    this.operationService.show_purchase$(pk_id_operation).pipe(
      tap(this.loadOperation),
      switchMap((operation: Operation): Observable<Person> => this.personService.showByExternalReference$(operation[0].external_reference)),
      tap(this.loadClient)
    )
    .subscribe(); 
  }

  private loadOperation = (operation: Operation): void => {
    this.operation = operation[0];
  }

  private loadClient = (person: Person): void => {
    this.person = person[0];
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
    this.operationService.getConsolidateByDates$(dateInit, dateEnd,environment.sales).subscribe(
      data => this.consolidateData = data
    );
  }
  
  public loadDataFromForm(){
    let fromDate = moment(this.reportForm.value.from_date).format('YYYY-MM-DD');
    let toDate = moment(this.reportForm.value.to_date).format('YYYY-MM-DD');

    this.loadData(fromDate, toDate);
  }

}
