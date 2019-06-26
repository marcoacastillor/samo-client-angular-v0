import { Component, OnInit } from '@angular/core';
import { ProductionProcess } from 'src/app/shared/models/production-process';
import { ProductionProcessService } from 'src/app/shared/services/production-process.service';
import { User } from 'src/app/shared/models/user';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { CuttingPeriodService } from 'src/app/shared/services/cutting-period.service';
import { CuttingPeriod } from 'src/app/shared/models/cutting-period';
import { environment } from 'src/environments/environment';
import { DataProductCuttingPeriod } from 'src/app/shared/models/data-product-cutting-period';
import { DetailProductInputService } from 'src/app/shared/services/detail-product-input.service';

@Component({
  selector: 'app-main-production-process',
  templateUrl: 'main-production-process.component.html',
  styles: []
})
export class MainProductionProcessComponent implements OnInit {
  activeUser: User = new User;
  showPrdProcess: boolean = false;

  productionProcess: ProductionProcess = new ProductionProcess;

  productionProcessList: ProductionProcess[];
  cuttingPeriodList: CuttingPeriod[];
  dataProduct: DataProductCuttingPeriod = new DataProductCuttingPeriod;

  constructor(
    private productionProcessService: ProductionProcessService,
    private cuttingPeriodService: CuttingPeriodService,
    private globalStoreService: GlobalStoreService,
    private utilService: UtilsService,
    private detailProductInputService: DetailProductInputService
  ) { }

  ngOnInit() {
    this.activeUser = this.globalStoreService.getUser();
    this.getProductionProcessByEnterprise(this.activeUser.fk_id_enterprise);
  }

  private getProductionProcessByEnterprise(id_enterprise: number){
    this.productionProcessService.getAllByEnterprise$(id_enterprise).subscribe(
      lstProductionProcess => this.productionProcessList = lstProductionProcess
    )
  }

  onSelect(prdProcess: ProductionProcess)
  {
    this.showPrdProcess = true;
    this.productionProcess = prdProcess;
    this.loadCuttingPeriod(prdProcess.pk_id_production_process);
  }

  loadCuttingPeriod(id_production_process: number){
    this.cuttingPeriodService.getAllByProductionProcess$(id_production_process).subscribe(
      lstCuttingPeriod => this.cuttingPeriodList = lstCuttingPeriod
    )
  }

  onGetData(id_cutting_period: number){
    this.detailProductInputService.getAllByCuttingPeriodAndTypeProduct$(id_cutting_period).subscribe(
      dataProduct => this.dataProduct = dataProduct
    )
  }

  update(productionProcess: ProductionProcess){
    this.productionProcessService.update$(productionProcess).subscribe(
      productionProcess => {
        this.productionProcess = productionProcess;
        this.setMessage('Operación exitosa');
      },
      this.onError
    )
  }

  onCreatePeriod(cuttingPeriod: CuttingPeriod){
    this.cuttingPeriodService.store$(cuttingPeriod).subscribe(
      () => this.loadCuttingPeriod(cuttingPeriod.fk_id_production_process)
    )
  }

  onDeletePeriod(id:number){
    this.cuttingPeriodService.delete$(id).subscribe(
      cuttingPeriod => {
        this.loadCuttingPeriod(cuttingPeriod.fk_id_production_process);
      }
    )
  }

  /*
  * ------------------------------------------
  * Funciones validación de resultado
  * ------------------------------------------
  */
  private setMessage(message: string){
    this.globalStoreService.dispatchUserMessage('200', message);
  }
  

  private onError = (error: any) => {
    this.globalStoreService.dispatchUserMessage(error.status, error.statusText + ' : ' + error.error.error);
  }


  /*
  * ------------------------------------------
  * Funciones visualización
  * ------------------------------------------
  */


  public getClassList() {
    return this.utilService.getClassList(this.showPrdProcess);
  }

  public getClassShow() {
    return this.utilService.getClassShow(this.showPrdProcess);
  }
}
