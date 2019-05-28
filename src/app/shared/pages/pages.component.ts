import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: 'pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {
  @Input() public title: string;

  constructor() { }

  ngOnInit() {
  }

}
