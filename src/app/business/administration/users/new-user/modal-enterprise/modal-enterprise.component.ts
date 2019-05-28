import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Enterprise } from 'src/app/shared/models/enterprise';

@Component({
  selector: 'app-modal-enterprise',
  templateUrl: 'modal-enterprise.component.html',
  styles: []
})
export class ModalEnterpriseComponent implements OnInit {
  @Output() public create = new EventEmitter<Enterprise>();
  constructor() { }

  ngOnInit() {
  }

  public onCreate(enterprise: Enterprise){
    this.create.emit(enterprise);
  }

}
