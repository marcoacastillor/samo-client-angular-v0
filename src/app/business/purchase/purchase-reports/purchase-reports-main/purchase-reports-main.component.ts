import { Component, OnInit } from '@angular/core';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-purchase-reports-main',
  templateUrl: 'purchase-reports-main.component.html',
  styles: []
})
export class PurchaseReportsMainComponent implements OnInit {
  faAngleDoubleRight = faAngleDoubleRight;
  constructor() { }

  ngOnInit() {
  }

}
