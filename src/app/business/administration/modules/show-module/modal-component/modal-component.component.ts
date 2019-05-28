import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MComponent } from 'src/app/shared/models/m-component';

@Component({
  selector: 'app-modal-component',
  templateUrl: 'modal-component.component.html',
  styles: []
})
export class ModalComponentComponent implements OnInit {
  @Input() public cmp: MComponent;

  @Output() public createCmp = new EventEmitter<MComponent>();
  @Output() public updateCmp = new EventEmitter<MComponent>();
  
  constructor() { }

  ngOnInit() {
  }

  public onCreateCmp(cmp: MComponent){
    this.createCmp.emit(cmp);
  }

  public onUpdateCmp(cmp: MComponent){
    this.updateCmp.emit(cmp);
  }

}
