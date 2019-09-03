import { Component, OnInit } from '@angular/core';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-report-main',
  templateUrl: 'product-report-man.component.html',
  styles: []
})
export class ProductReportMainComponent implements OnInit {
  faAngleDoubleRight = faAngleDoubleRight;
  constructor() { }

  ngOnInit() {
  }

}
