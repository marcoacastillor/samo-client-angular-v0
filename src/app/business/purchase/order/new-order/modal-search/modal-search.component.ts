import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-search',
  templateUrl: 'modal-search.component.html',
  styles: []
})
export class ModalSearchComponent implements OnInit {
  @Output() public select = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit() {
  }

  public onSelect(code: string){
    this.select.emit(code);
  }

}
