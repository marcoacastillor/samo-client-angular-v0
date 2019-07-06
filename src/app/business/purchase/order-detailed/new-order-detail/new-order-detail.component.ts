import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { faThList } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { Operation } from 'src/app/shared/models/operation';
import { OperationService } from 'src/app/shared/services/operation.service';

@Component({
  selector: 'app-new-order-detail',
  templateUrl:'new-order-detail.component.html',
  styles: []
})
export class NewOrderDetailComponent implements OnInit {
  faThList = faThList;
  id_operation = '';

  operation: Operation = new Operation();
  
  constructor(
    private operationService: OperationService
  ) { }

  ngOnInit() {
    this.getOperationDetail();    
  }

  private getOperationDetail(){
    this.operation = new Operation();
  }
}
