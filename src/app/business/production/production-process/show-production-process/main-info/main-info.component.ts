import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductionProcess } from 'src/app/shared/models/production-process';
import { faAlignJustify, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { Parameter } from 'src/app/shared/models/parameter';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main-info',
  templateUrl: 'main-info.component.html',
  styles: []
})
export class MainInfoComponent implements OnInit {
  faEdit = faEdit;

  definedPeriodList: Parameter[] = [];

  @Input() public productionProcess: ProductionProcess;

  @Output() public onUpdate = new EventEmitter<ProductionProcess>();
  
  constructor(
    private parametersService: ParameterService
  ) { }

  ngOnInit() {

  }

  getParametersData(){
    this.parametersService.getByCodeCategory$(environment.cutting_period_production).subscribe(
      lstPeriods => this.definedPeriodList = lstPeriods
    )
  }

  update(productionProcess: ProductionProcess){
    this.onUpdate.emit(productionProcess)
  }
}
