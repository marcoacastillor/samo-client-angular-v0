import { Component, OnInit, Input } from '@angular/core';
import { Position } from 'src/app/shared/models/position';

@Component({
  selector: 'app-positions',
  templateUrl: 'positions.component.html',
  styles: []
})
export class PositionsComponent implements OnInit {
  @Input() public positionsList: Position[];
  constructor() { }

  ngOnInit() {
  }

}
