import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductionProcess } from 'src/app/shared/models/production-process';
import { CuttingPeriod } from 'src/app/shared/models/cutting-period';
import { DataProductCuttingPeriod } from 'src/app/shared/models/data-product-cutting-period';

@Component({
  selector: 'app-show-production-process',
  templateUrl: 'show-production-process.component.html',
  styles: []
})
export class ShowProductionProcessComponent implements OnInit {
  @Input() public productionProcess: ProductionProcess;
  @Input() public cuttingPeriodList: CuttingPeriod[];
  @Input() public dataProduct: DataProductCuttingPeriod[];
    
  @Output() public getData = new EventEmitter<Number>();
  
  constructor(
  ) { }

  ngOnInit() {
  }

  onGetData(id_cutting_period: number){
    this.getData.emit(id_cutting_period);
  }  
}
