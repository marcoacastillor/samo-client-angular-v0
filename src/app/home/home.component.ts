import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div class="row">
      <div class="col-sm-9"><app-main-page></app-main-page></div>
      <div class="col-sm-3"><app-login></app-login></div>
    </div>
  `,
  styles: []
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
