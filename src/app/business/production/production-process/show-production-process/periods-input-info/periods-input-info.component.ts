import { Component, OnInit, Input } from '@angular/core';
import { DetailProductInput } from 'src/app/shared/models/detail-product-input';

@Component({
  selector: 'app-periods-input-info',
  templateUrl: 'periods-input-info.component.html',
  styles: []
})
export class PeriodsInputInfoComponent implements OnInit {
  @Input() public inputsProductLst: DetailProductInput[];
  
  constructor() { }

  ngOnInit() {
  }

}
