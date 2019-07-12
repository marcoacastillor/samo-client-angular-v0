import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { Option } from 'src/app/shared/models/option';
import { faEye, faTrashAlt, faBan, faPlusCircle, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Results } from 'src/app/shared/models/results';

@Component({
  selector: 'app-list-option',
  templateUrl: 'list-option.component.html',
  styles: []
})
export class ListOptionComponent implements OnInit, OnChanges {
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  fasFaBan = faBan;
  faPlusCircle = faPlusCircle;

  @Input() public optionList: Results;
  @Input() public actualPg: number;
  @Input() public regPerPg: number;

  @Output() public new = new EventEmitter<Option>();
  @Output() public del = new EventEmitter<number>();
  
  public totalPgs: number = 0;
  public maxPerPg: number = 0;
  
  constructor() { }

  ngOnInit() {
  }
  
  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.optionList)
    {
      if(changes.optionList.currentValue)
      {
        this.optionList = changes.optionList.currentValue;
      }
    }
  }

  public newOption() {
    let option = new Option;
    this.new.emit(option);
  }

  public deleteOption(id: number) {
    this.del.emit(id);
  }

  public updateOption(option: Option) {
    this.new.emit(option);
  }
}
