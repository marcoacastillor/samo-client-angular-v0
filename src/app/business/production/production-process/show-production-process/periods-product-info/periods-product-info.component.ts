import { Component, OnInit, Input } from '@angular/core';
import { DetailProductInput } from 'src/app/shared/models/detail-product-input';

@Component({
  selector: 'app-periods-product-info',
  templateUrl: 'periods-product-info.component.html',
  styles: []
})
export class PeriodsProductInfoComponent implements OnInit {
  @Input() public productLst: DetailProductInput[];
  
  constructor() { }

  ngOnInit() {
  }

}
