import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-consolidated',
  templateUrl: 'consolidated.component.html',
  styles: []
})
export class ConsolidatedComponent implements OnInit {
  @Input() public consolidate: any;
  @Input() public totales: any;
  @Input() public values: any;

  constructor() { }

  ngOnInit() {
  }

}
