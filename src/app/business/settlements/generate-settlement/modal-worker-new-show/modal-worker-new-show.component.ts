import { Component, OnInit, Input } from '@angular/core';
import { WorkerNews } from 'src/app/shared/models/worker-news';
import { LaboralCondition } from 'src/app/shared/models/laboral-condition';
import { DataProductCuttingPeriod } from 'src/app/shared/models/data-product-cutting-period';

@Component({
  selector: 'app-modal-worker-new-show',
  templateUrl: 'moda-worker-new-show.component.html',
  styles: []
})
export class ModalWorkerNewShowComponent implements OnInit {
  
  @Input() public workerNewsLst: WorkerNews[];
  @Input() public laboral_condition: LaboralCondition;
  @Input() public production_period: number;

  constructor() { }

  ngOnInit() {
  }

}
