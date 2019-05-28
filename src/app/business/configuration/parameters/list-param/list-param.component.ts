import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/shared/models/category';
import { faEye, faTrashAlt, faEdit, faBan, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list-param',
  templateUrl:'list-param.component.html',
  styles: []
})
export class ListParamComponent implements OnInit {
  faEye = faEye;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  fasFaBan = faBan;
  faPlusCircle = faPlusCircle;

  @Input() public categoryList: Category[];

  @Output() public updateCategory = new EventEmitter<Category>();
  @Output() public deleteCategory = new EventEmitter<number>();
  @Output() public viewCategory = new EventEmitter<number>();
  
  constructor() { }

  ngOnInit() {
  }

  public crtCategory() {
    this.updateCategory.emit(new Category);
  }

  public updCategory(category: Category) {
    this.updateCategory.emit(category);
  }

  public delCategory(id: number) {
    this.deleteCategory.emit(id);
  }

  public showCategory(pk_id_category: number) {
    this.viewCategory.emit(pk_id_category);
  }

}
