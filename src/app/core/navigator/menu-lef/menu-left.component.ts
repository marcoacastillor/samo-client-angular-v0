import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu-lef',
  templateUrl: 'menu-left.component.html',
  styles: []
})
export class MenuLeftComponent implements OnInit {
  @Input() public user: any;
  
  constructor() { }

  ngOnInit() {
  }

}
