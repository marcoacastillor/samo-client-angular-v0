import { Component, OnInit, Input } from '@angular/core';
import { Enterprise } from 'src/app/shared/models/enterprise';

@Component({
  selector: 'app-main-info',
  templateUrl: 'main-info.component.html',
  styles: []
})
export class MainInfoComponent implements OnInit {
  @Input() public enterprise: Enterprise;
  constructor() { }

  ngOnInit() {
  }

}
