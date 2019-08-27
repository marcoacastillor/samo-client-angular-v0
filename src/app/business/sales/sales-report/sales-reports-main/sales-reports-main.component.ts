import { Component, OnInit } from '@angular/core';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sales-reports-main',
  templateUrl: 'sales-report-main.component.html',
  styles: []
})
export class SalesReportsMainComponent implements OnInit {
  faAngleDoubleRight = faAngleDoubleRight;
  constructor() { }

  ngOnInit() {
  }

}
