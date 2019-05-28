import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MComponent } from 'src/app/shared/models/m-component';

@Component({
  selector: 'app-modal-asign-option',
  templateUrl: 'modal-asign-option.component.html',
  styles: []
})
export class ModalAsignOptionComponent implements OnInit {
  @Input() public cmp: MComponent;
  @Output() public asignOption = new EventEmitter<any>();
  

  constructor() { }

  ngOnInit() {
  }

  public onAsignOption(option_component: any){
    this.asignOption.emit(option_component)
  }

}
