import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductionProcess } from 'src/app/shared/models/production-process';
import { faPlusCircle, faAlignJustify, faStopwatch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list-production-process',
  templateUrl: 'list-production-process.component.html',
  styles: []
})
export class ListProductionProcessComponent implements OnInit {
  faPlusCircle = faPlusCircle;
  faAlignJustify = faAlignJustify;
  faStopWatch = faStopwatch;

  @Input() public productionProcessList: ProductionProcess[];
  @Output() public select = new EventEmitter<ProductionProcess>();
  

  constructor() { }

  ngOnInit() {
  }

  selectElement(prdProd: ProductionProcess){
    console.log(prdProd);
    
    this.select.emit(prdProd);
  }

}
