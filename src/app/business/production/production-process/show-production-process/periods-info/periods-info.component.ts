import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CuttingPeriod } from 'src/app/shared/models/cutting-period';
import { faAlignJustify, faArchive } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-periods-info',
  templateUrl: 'periods-info.component.html',
  styles: []
})
export class PeriodsInfoComponent implements OnInit {
  faAlignJustify = faAlignJustify;
  facArchive = faArchive;

  @Input() public cuttingPeriodList: CuttingPeriod[];
  @Output() public getData = new EventEmitter<Number>();
  
  constructor() { }

  ngOnInit() {
  }

  getDataByCuttingPeriod(id_cutting_period: number){
    this.getData.emit(id_cutting_period);
  }
}
