import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ProductionProcess } from 'src/app/shared/models/production-process';
import { faPlusCircle, faAlignJustify, faStopwatch, faEye } from '@fortawesome/free-solid-svg-icons';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { environment } from 'src/environments/environment';
import { Parameter } from 'src/app/shared/models/parameter';

@Component({
  selector: 'app-list-production-process',
  templateUrl: 'list-production-process.component.html',
  styles: []
})
export class ListProductionProcessComponent implements OnInit {
  faPlusCircle = faPlusCircle;
  faEye = faEye;

  definedPeriodList: Parameter[] = [];

  @Input() public productionProcessList: ProductionProcess[];
  @Input() public fk_id_enterprise: number;

  @Output() public select = new EventEmitter<ProductionProcess>();
  @Output() public create = new EventEmitter<ProductionProcess>();
  

  constructor(
    private parametersService: ParameterService 
  ) { }

  ngOnInit() {
  }
  
  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.cuttingPeriodList)
    {
      if(changes.productionProcessList.currentValue != changes.productionProcessList.previousValue)
      {
        this.productionProcessList = changes.productionProcessList.currentValue;
      }
    }
  }

  selectElement(prdProd: ProductionProcess){
    this.select.emit(prdProd);
  }

  onCreate(prdProd: ProductionProcess){
    this.create.emit(prdProd)
  }

  getParametersData(){
    this.parametersService.getByCodeCategory$(environment.cutting_period_production).subscribe(
      lstPeriods => this.definedPeriodList = lstPeriods
    )
  }

}
