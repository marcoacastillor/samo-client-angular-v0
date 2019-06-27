import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductionProcess } from 'src/app/shared/models/production-process';
import { faPlusCircle, faAlignJustify, faStopwatch, faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list-production-process',
  templateUrl: 'list-production-process.component.html',
  styles: []
})
export class ListProductionProcessComponent implements OnInit {
  faPlusCircle = faPlusCircle;
  faEye = faEye;

  @Input() public productionProcessList: ProductionProcess[];
  @Output() public select = new EventEmitter<ProductionProcess>();
  

  constructor() { }

  ngOnInit() {
  }

  selectElement(prdProd: ProductionProcess){
    this.select.emit(prdProd);
  }

}
