import { Component, OnInit, Input } from '@angular/core';
import { DetailProductInput } from 'src/app/shared/models/detail-product-input';

@Component({
  selector: 'app-periods-intermediaty-info',
  templateUrl: 'periods-intermediaty-info.component.html',
  styles: []
})
export class PeriodsIntermediatyInfoComponent implements OnInit {
  @Input() public productLst: DetailProductInput[];
  constructor() { }

  ngOnInit() {
  }

}
