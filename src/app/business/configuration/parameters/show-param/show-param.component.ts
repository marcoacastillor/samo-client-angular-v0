import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/shared/models/category';
import { faTrashAlt, faEdit, faPlusCircle, faEye } from '@fortawesome/free-solid-svg-icons';
import { Parameter } from 'src/app/shared/models/parameter';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-show-param',
  templateUrl: 'show-param.component.html',
  styles: []
})
export class ShowParamComponent implements OnInit {
  public url_storage: string = environment.url_storage;
  faEye = faEye;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  faPlusCircle = faPlusCircle;
  
  @Input() public category: Category;
  @Input() public parameter: Parameter;

  @Output() public create = new EventEmitter<Parameter>();
  @Output() public update = new EventEmitter<Parameter>();
  @Output() public cancel = new EventEmitter<boolean>();
  @Output() public delete = new EventEmitter<number>();
  @Output() public select = new EventEmitter<Parameter>();
  
  constructor() { }

  ngOnInit() {
  }

  public onCreate(parameter:Parameter){
    parameter.fk_id_category = this.category.pk_id_category;
    this.create.emit(parameter);
  }

  public onUpdate(parameter:Parameter){
    this.update.emit(parameter);
  }

  public onCancel(param: boolean){
    this.cancel.emit(param);
  }


  public newParameter(){
    let param = new Parameter;
    this.select.emit(param);
  }

  public updParameter(param: Parameter){
    this.select.emit(param);
  }

  public delParameter(id_param: number){
    this.delete.emit(id_param);
  }
}
