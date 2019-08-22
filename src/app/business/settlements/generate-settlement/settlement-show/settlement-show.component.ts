import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faThList, faFileInvoiceDollar, faCalculator, faMoneyBillAlt, faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import { PayingEmployeeService } from 'src/app/shared/services/paying-employee.service';
import { User } from 'src/app/shared/models/user';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { CuttingPeriod } from 'src/app/shared/models/cutting-period';
import { CuttingPeriodService } from 'src/app/shared/services/cutting-period.service';
import { tap, switchMap } from 'rxjs/operators';
import { WorkerNewService } from 'src/app/shared/services/worker-new.service';
import { WorkerNews } from 'src/app/shared/models/worker-news';
import { LaboralConditionService } from 'src/app/shared/services/laboral-condition.service';
import { DetailProductInputService } from 'src/app/shared/services/detail-product-input.service';
import { LaboralCondition } from 'src/app/shared/models/laboral-condition';
import { PayingEmployee } from 'src/app/shared/models/paying-employee';

@Component({
  selector: 'app-settlement-show',
  templateUrl: 'settlement-show.component.html',
  styles: []
})
export class SettlementShowComponent implements OnInit {
  id_period = '';

  faThList = faThList;
  faFileInvoiceDollar = faFileInvoiceDollar;
  faCalculator = faCalculator;
  faMoneyBillAlt = faMoneyBillAlt;
  faFileInvoice = faFileInvoice;

  activeUser: User = new User;
  employeeLst: any = [];
  totals: any = [];
  workerNewsLst: WorkerNews[] = [];
  selectedPeriod: CuttingPeriod = new CuttingPeriod;
  laboral_condition: LaboralCondition = new LaboralCondition;
  production_period = 0;
  selectedPayingInfo: PayingEmployee = new PayingEmployee;

  success = false;
  message = '';

  constructor(
    private activateRoute: ActivatedRoute,
    private payingEmployeeService: PayingEmployeeService,
    private globalStoreService: GlobalStoreService,
    private cuttingPeriodService: CuttingPeriodService,
    private workerNewSerice: WorkerNewService,
    private laboralConditionService: LaboralConditionService,
    private detailProductInputService: DetailProductInputService
  ) { }

  ngOnInit() {
    this.activeUser = this.globalStoreService.getUser();
    this.id_period = this.activateRoute.snapshot.params['id'];
    this.getSettlementInfoById(Number(this.id_period));
  }

  private getSettlementInfoById(id:number){
    this.cuttingPeriodService.show$(id).pipe(
      tap((cuttingPeriod:CuttingPeriod) => {
        this.selectedPeriod = cuttingPeriod
      }),
      switchMap((cuttingPeriod) => this.payingEmployeeService.getSettlementInfoByCuttingPeriodAndEnterprise$(cuttingPeriod.pk_id_cutting_period,this.activeUser.fk_id_enterprise)),
      tap((settlment: any) => {
        this.employeeLst = settlment.employee;
        this.totals = settlment.totals;
      })
    ).subscribe()
  }

  generateAllSettlement(){
    this.payingEmployeeService.generateAllSettlementAndEnterprise$(this.selectedPeriod.pk_id_cutting_period, this.activeUser.fk_id_enterprise).subscribe(
      cutting_period => {
        this.success = true;
        this.message = 'Se generó liquidación del período seleccionado, correctamente.';
        this.getSettlementInfoById(cutting_period.pk_id_cutting_period);
      }
    )
  }

  public deleteSettlementByPeriod(){
    this.payingEmployeeService.deletePayingByContract$(Number(this.id_period)).subscribe(
      cutting_period => {
        this.success = true;
        this.message = 'Se eliminó liquidación del período seleccionado, correctamente.';
        this.getSettlementInfoById(cutting_period.pk_id_cutting_period);
      }
    )
  }

  public paymentSettlementByPeriod(){
    this.payingEmployeeService.paymentPayingByContract$(Number(this.id_period)).subscribe(
      cutting_period => {
        this.success = true;
        this.message = 'Se generó pago de liquidación del período seleccionado, correctamente.';
        this.getSettlementInfoById(cutting_period.pk_id_cutting_period);
      }
    )
  } 
  
  public getWorkerNewByPeriodAndContract(idPeriod: number,idContract: number){
    this.workerNewSerice.getByPeriodAndContract$(idPeriod, idContract).pipe(
      tap((lst_worker_news: WorkerNews[]) => this.workerNewsLst = lst_worker_news),
      switchMap(() => this.laboralConditionService.getInfoByEnterprisePerson$(idContract)),
      tap((laboral_condition:LaboralCondition) => this.laboral_condition = laboral_condition),
      tap((laboral_condition:LaboralCondition) => {
        if(laboral_condition.pk_product_unit){
          this.detailProductInputService.getByCuttingPeriodAndProduct$(idPeriod,laboral_condition.pk_product_unit).subscribe(
            detail_cutting_input => this.production_period = detail_cutting_input
          )
        }
      })
    ).subscribe()
  }

  public selectPayingInfo(payingInfo:any){
    this.selectedPayingInfo = payingInfo;
  }

  public onUpdateByWorker(id_worker:number){
    this.payingEmployeeService.updatePayingEmpworkerNewloyeeByIdAnd$(this.selectedPayingInfo.pk_id_paying_info,id_worker).subscribe(
      selectedPaying => {
        this.success = true;
        this.message = 'Se agregó novedad a liquidación del trabajador, correctamente.';
        this.getSettlementInfoById(selectedPaying.fk_id_cutting_period);

      }
    )
  }
}
