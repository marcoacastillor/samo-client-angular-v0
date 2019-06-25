import { Component, OnInit, Input } from '@angular/core';
import { ProductionProcess } from 'src/app/shared/models/production-process';
import { faAlignJustify } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main-info',
  templateUrl: 'main-info.component.html',
  styles: []
})
export class MainInfoComponent implements OnInit {
  faAlignJustify = faAlignJustify;
  @Input() public productionProcess: ProductionProcess;
  
  constructor() { }

  ngOnInit() {
  }

}
