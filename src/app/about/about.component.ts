import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  template: `
  <nav class="navbar" role="navigation">
    <div class="navbar-menu is-active">
      <div class="navbar-start">
        <a class="navbar-item"  [routerLink]="['./links']"> Links</a>
        <a class="navbar-item"  [routerLink]="['./info']"> Info</a>
      </div>
    </div>
  </nav>
  <router-outlet></router-outlet>
  `,
  styles: []
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
