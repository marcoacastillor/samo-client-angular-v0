import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { ProductionProcess } from 'src/app/shared/models/production-process';
import { CuttingPeriod } from 'src/app/shared/models/cutting-period';
import { faThList } from '@fortawesome/free-solid-svg-icons';
import { DetailProductInput } from 'src/app/shared/models/detail-product-input';

@Component({
  selector: 'app-show-production-process',
  templateUrl: 'show-production-process.component.html',
  styles: []
})
export class ShowProductionProcessComponent implements OnInit {
  faThList = faThList;

  @Input() public productionProcess: ProductionProcess;
  @Input() public cuttingPeriodList: CuttingPeriod[];
  @Input() public activeCuttingPeriod: CuttingPeriod;
  @Input() public state: string;
  
  @Input() public dataProductInputs:DetailProductInput[] = [];
  @Input() public dataProductProducts: DetailProductInput[] = [];
  @Input() public dataProductIntermediaty: DetailProductInput[] = [];
  
    
  @Output() public getData = new EventEmitter<Number>();
  @Output() public onUpdate = new EventEmitter<ProductionProcess>();
  @Output() public createPeriod = new EventEmitter<CuttingPeriod>();
  @Output() public deletePeriod = new EventEmitter<Number>();
  @Output() public deletailDetPrd = new EventEmitter<Number>();

  @Output() public onView = new EventEmitter<Boolean>();
  
  constructor(
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.cuttingPeriodList)
    {
      if(changes.cuttingPeriodList.currentValue != changes.cuttingPeriodList.previousValue)
      {
        this.cuttingPeriodList = changes.cuttingPeriodList.currentValue;
      }
    }
    
    if(changes.productionProcess)
    {
      if(changes.productionProcess.currentValue != changes.productionProcess.previousValue)
      {
        this.productionProcess = changes.productionProcess.currentValue;
      }
    }

    if(changes.state)
    {
      if(changes.state.currentValue != changes.state.previousValue)
      {
        this.state = changes.state.currentValue;
      }
    }

    if(changes.activeCuttingPeriod)
    {
      if(changes.activeCuttingPeriod.currentValue != changes.activeCuttingPeriod.previousValue)
      {
        this.activeCuttingPeriod = changes.activeCuttingPeriod.currentValue;
      }
    }
  }

  onGetData(id_cutting_period: number){
    this.getData.emit(id_cutting_period);
  }  

  update(productionProcess: ProductionProcess){
    this.onUpdate.emit(productionProcess);
  }

  onCreatePeriod(cuttingPeriod: CuttingPeriod){
    this.createPeriod.emit(cuttingPeriod);
  }

  onDeletePeriod(id: number){
    this.deletePeriod.emit(id);
  }

  viewList(){
    this.onView.emit(false);
  }

  onDeleteDetail(id:number){
    this.deletailDetPrd.emit(id);
  }
  
}
