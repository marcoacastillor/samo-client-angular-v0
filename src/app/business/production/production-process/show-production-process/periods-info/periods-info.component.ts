import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CuttingPeriod } from 'src/app/shared/models/cutting-period';
import { faAlignJustify, faArchive, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ProductionProcess } from 'src/app/shared/models/production-process';

@Component({
  selector: 'app-periods-info',
  templateUrl: 'periods-info.component.html',
  styles: []
})
export class PeriodsInfoComponent implements OnInit {
  faAlignJustify = faAlignJustify;
  facArchive = faArchive;
  faPlusCircle =  faPlusCircle;
  faTrash = faTrash;

  cuttingPeriod: CuttingPeriod = new CuttingPeriod;

  @Input() public cuttingPeriodList: CuttingPeriod[];
  @Input() public productionProcess: ProductionProcess;
  
  @Output() public getData = new EventEmitter<Number>();
  @Output() public onCreatePeriod = new EventEmitter<CuttingPeriod>();
  @Output() public onDeletePeriod = new EventEmitter<Number>();
  
  constructor() { }

  ngOnInit() {
  }

  getDataByCuttingPeriod(id_cutting_period: number){
    this.getData.emit(id_cutting_period);
  }

  createPeriod(){
    let cuttingPeriod = new CuttingPeriod;
    cuttingPeriod.fk_id_production_process  = this.productionProcess.pk_id_production_process;
    cuttingPeriod.defined_period            = this.productionProcess.defined_period;

    this.onCreatePeriod.emit(cuttingPeriod);
  }

  selectPeriod(cuttingPeriod: CuttingPeriod){
    this.cuttingPeriod = cuttingPeriod;
  }

  deletePeriod(){
    this.onDeletePeriod.emit(this.cuttingPeriod.pk_id_cutting_period)
  }


}
