import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Position } from 'src/app/shared/models/position';

@Component({
  selector: 'app-list-position',
  templateUrl: 'list-position.component.html',
  styles: []
})
export class ListPositionComponent implements OnInit {
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  
  @Input() public positionsList: Position[];
  @Output() public select = new EventEmitter<Position>();
  @Output() public delete = new EventEmitter<Number>();


  constructor() { }

  ngOnInit() {
  }

  updatePosition(position: Position){
    this.select.emit(position);
  }

  deletePosition(id: number){
    this.delete.emit(id);
  }

}
