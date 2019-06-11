import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-position',
  templateUrl: 'list-position.component.html',
  styles: []
})
export class ListPositionComponent implements OnInit {
  @Input() public positionsList: Position[];

  constructor() { }

  ngOnInit() {
  }

}
