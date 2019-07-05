import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { faThList } from '@fortawesome/free-solid-svg-icons';
import { Operation } from 'src/app/shared/models/operation';

@Component({
  selector: 'app-new-order-detail',
  templateUrl:'new-order-detail.component.html',
  styles: []
})
export class NewOrderDetailComponent implements OnInit {
  faThList = faThList;
  
  constructor() { }

  @Input() public operation: Operation;

  @Output() public onViewList = new EventEmitter<Boolean>();

  ngOnInit() {
  }

  viewList(){
    this.onViewList.emit(true);
  }

}
