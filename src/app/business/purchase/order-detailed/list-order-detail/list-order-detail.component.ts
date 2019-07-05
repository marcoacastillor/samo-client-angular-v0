import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { faPlusCircle, faEye } from '@fortawesome/free-solid-svg-icons';
import { Operation } from 'src/app/shared/models/operation';

@Component({
  selector: 'app-list-order-detail',
  templateUrl: 'list-order-detail.component.html',
  styles: []
})
export class ListOrderDetailComponent implements OnInit {
  faPlusCircle = faPlusCircle;
  faEye = faEye;

  @Input() public lstOrders: Operation[];
  @Input() public fk_id_enterprise: number;

  @Output() public onSelectOrder = new EventEmitter<Operation>();

  constructor() { }

  ngOnInit() {
  }

  createOrder(){
    this.onSelectOrder.emit(new Operation);
  }

  selectElement(operation: Operation){
    this.onSelectOrder.emit(operation);
  }

}
