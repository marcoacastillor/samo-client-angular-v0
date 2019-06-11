import { Component, OnInit, Input } from '@angular/core';
import { Enterprise } from 'src/app/shared/models/enterprise';

@Component({
  selector: 'app-show-provider',
  templateUrl:'show-provider.component.html',
  styles: []
})
export class ShowProviderComponent implements OnInit {
  @Input() public registry: Enterprise;
  
  constructor() { }

  ngOnInit() {
  }

}
