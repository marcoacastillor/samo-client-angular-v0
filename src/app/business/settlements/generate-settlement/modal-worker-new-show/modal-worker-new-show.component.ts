import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { WorkerNews } from 'src/app/shared/models/worker-news';
import { LaboralCondition } from 'src/app/shared/models/laboral-condition';
import { PayingEmployee } from 'src/app/shared/models/paying-employee';
import { faPlus, faBan } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-modal-worker-new-show',
  templateUrl: 'moda-worker-new-show.component.html',
  styles: []
})
export class ModalWorkerNewShowComponent implements OnInit {
  faPlus = faPlus;
  faBan = faBan;
  
  @Input() public workerNewsLst: WorkerNews[];
  @Input() public laboral_condition: LaboralCondition;
  @Input() public production_period: number;
  @Input() public selectedPayingInfo: PayingEmployee;
  @Input() public period_state: string;
  

  @Output() public updateByWorker = new EventEmitter<number>();
  
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.selectedPayingInfo)
    {
      if(changes.selectedPayingInfo.currentValue != changes.selectedPayingInfo.previousValue)
      {
        this.selectedPayingInfo = changes.selectedPayingInfo.currentValue;
      }
    }
  }

  public updatePayingEmployee(id_worker:number)
  {
    this.updateByWorker.emit(id_worker);
  }

}
