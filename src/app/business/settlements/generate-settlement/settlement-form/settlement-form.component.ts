import { Component, OnInit } from '@angular/core';
import { faSave, faThList, faCalculator, faFileInvoiceDollar, faMoneyBill, faMoneyBillAlt, faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/shared/models/user';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { CuttingPeriodService } from 'src/app/shared/services/cutting-period.service';
import { CuttingPeriod } from 'src/app/shared/models/cutting-period';
import { PayingEmployeeService } from 'src/app/shared/services/paying-employee.service';
import { tap, switchMap } from 'rxjs/operators';
import { WorkerNewService } from 'src/app/shared/services/worker-new.service';
import { WorkerNews } from 'src/app/shared/models/worker-news';
import { LaboralCondition } from 'src/app/shared/models/laboral-condition';
import { LaboralConditionService } from 'src/app/shared/services/laboral-condition.service';
import { DetailProductInputService } from 'src/app/shared/services/detail-product-input.service';
import { DataProductCuttingPeriod } from 'src/app/shared/models/data-product-cutting-period';

@Component({
  selector: 'app-settlement-form',
  templateUrl: 'settlement-form.component.html',
  styles: []
})
export class SettlementFormComponent implements OnInit {
  faSave = faSave;
  faThList = faThList;
  faCalculator = faCalculator;
  faFileInvoiceDollar = faFileInvoiceDollar;
  faMoneyBillAlt = faMoneyBillAlt;
  faFileInvoice = faFileInvoice;
  
  cuttingPeriodList: CuttingPeriod[] = [];
  workerNewsLst: WorkerNews[] = [];
  laboral_condition: LaboralCondition = new LaboralCondition;
  production_period = 0;

  selectedPeriod: CuttingPeriod = new CuttingPeriod;
  employeeLst: any = [];
  totals: any = [];

  activeUser: User = new User;

  success = false;
  message = '';

  constructor(
    private globalStoreService: GlobalStoreService,
    private cuttingPeriodService: CuttingPeriodService,
    private payingEmployeeService: PayingEmployeeService,
    private workerNewSerice: WorkerNewService,
    private laboralConditionService: LaboralConditionService,
    private detailProductInputService: DetailProductInputService
  ) { }

  ngOnInit() {
    this.activeUser = this.globalStoreService.getUser();
    this.loadPeriosByEnterprise(this.activeUser.fk_id_enterprise);
  }

  private loadPeriosByEnterprise(id_enterprise: number){
    this.cuttingPeriodService.getAllActiveSettlementByEnterprise$(id_enterprise).subscribe(
      lst_cutting_periods => this.cuttingPeriodList = lst_cutting_periods
    )
  }

  public onFindValuesByPeriod(){
    let period = (<HTMLInputElement>document.getElementById('selectedPeriod')).value;
    if(period.length > 0)
    {
      //Seleccionar período.
      this.selectedPeriod = this.cuttingPeriodList[period];

      this.payingEmployeeService.getSettlementInfoByCuttingPeriodAndEnterprise$(this.selectedPeriod.pk_id_cutting_period,this.activeUser.fk_id_enterprise).subscribe(
        settlment => {
          this.employeeLst = settlment.employee;
          this.totals = settlment.totals;
        }
      )
    }
  }

  public generateAllSettlement(){
    this.payingEmployeeService.generateAllSettlementAndEnterprise$(this.selectedPeriod.pk_id_cutting_period, this.activeUser.fk_id_enterprise).pipe(
      tap((cuttingPeriod:CuttingPeriod) => {
        this.selectedPeriod = cuttingPeriod;
        this.payingEmployeeService.getSettlementInfoByCuttingPeriodAndEnterprise$(cuttingPeriod.pk_id_cutting_period,this.activeUser.fk_id_enterprise).subscribe(
          settlment => {
            this.employeeLst = settlment.employee;
            this.totals = settlment.totals;
            this.success = true;
            this.message = 'Se generó liquidación del período seleccionado, correctamente.';
          }
        )
      })
    ).subscribe(
    )
  }

  public generateSettlementByEmployee(id_cutting_period:number, id_contract: number){
    this.payingEmployeeService.generateSettlementByPeriodAndContract$(id_cutting_period, id_contract).subscribe(
      () => {
        this.payingEmployeeService.getSettlementInfoByCuttingPeriodAndEnterprise$(id_cutting_period,this.activeUser.fk_id_enterprise).subscribe(
          settlment => {
            this.employeeLst = settlment.employee;
            this.totals = settlment.totals;
          }
        )   
      }
    )
  }

  public deleteSettlementByPeriod(){
    this.payingEmployeeService.deletePayingByContract$(Number(this.selectedPeriod.pk_id_cutting_period)).subscribe(
      (cutting_period) => {
        this.selectedPeriod = cutting_period;
        this.payingEmployeeService.getSettlementInfoByCuttingPeriodAndEnterprise$(Number(this.selectedPeriod.pk_id_cutting_period),this.activeUser.fk_id_enterprise).subscribe(
          settlment => {
            this.employeeLst = settlment.employee;
            this.totals = settlment.totals;
            this.success = true;
            this.message = 'Se eliminó liquidación del período seleccionado, correctamente.';
          }
        )
      }
    );
  }
  
  public paymentSettlementByPeriod(){
    this.payingEmployeeService.paymentPayingByContract$(Number(this.selectedPeriod.pk_id_cutting_period)).subscribe(
      (cutting_period) => {
        this.selectedPeriod = cutting_period;
        this.payingEmployeeService.getSettlementInfoByCuttingPeriodAndEnterprise$(Number(this.selectedPeriod.pk_id_cutting_period),this.activeUser.fk_id_enterprise).subscribe(
          settlment => {
            this.employeeLst = settlment.employee;
            this.totals = settlment.totals;
            this.success = true;
            this.message = 'Se realizó el pago de la liquidación del período seleccionado, correctamente.';
          }
        )
      }
    );
  }
  
  public getWorkerNewByPeriodAndContract(idPeriod: number,idContract: number){
    this.workerNewSerice.getByPeriodAndContract$(idPeriod, idContract).pipe(
      tap((lst_worker_news: WorkerNews[]) => this.workerNewsLst = lst_worker_news),
      switchMap(() => this.laboralConditionService.getInfoByEnterprisePerson$(idContract)),
      tap((laboral_condition:LaboralCondition) => this.laboral_condition = laboral_condition),
      tap((laboral_condition:LaboralCondition) => {
        this.detailProductInputService.getByCuttingPeriodAndProduct$(idPeriod,laboral_condition.pk_product_unit).subscribe(
          detail_cutting_input => this.production_period = detail_cutting_input
        )
      })
    ).subscribe()
  }
}
