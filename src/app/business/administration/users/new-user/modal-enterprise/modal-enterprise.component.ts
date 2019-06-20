import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { Parameter } from 'src/app/shared/models/parameter';

@Component({
  selector: 'app-modal-enterprise',
  templateUrl: 'modal-enterprise.component.html',
  styles: []
})
export class ModalEnterpriseComponent implements OnInit {

  @Input() public sizesList: Parameter[];
  @Output() public create = new EventEmitter<Enterprise>();
  constructor() { }

  ngOnInit() {
  }

  public onCreate(enterprise: Enterprise){
    this.create.emit(enterprise);
  }

}
