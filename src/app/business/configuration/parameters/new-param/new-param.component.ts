import { Component, OnInit, ChangeDetectorRef, SimpleChanges, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { Category } from 'src/app/shared/models/category';
import { faThList } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-new-param',
  templateUrl:'new-param.component.html',
  styles: []
})
export class NewParamComponent implements OnInit, OnChanges{
  faThList = faThList;
  
  categoryForm: FormGroup;
  @Input() public category: Category;

  @Output() public create = new EventEmitter<Category>();
  @Output() public update = new EventEmitter<Category>();
  @Output() public cancel = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private formToolService: FormToolsService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.initUpdForm();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.category)
    {
      if(changes.category.currentValue != changes.category.previousValue)
      {
        this.initUpdForm();
      }
    }
  }

  public createModule(){
    this.create.emit(this.categoryForm.value);
    this.categoryForm.reset();
  }

  public updateModule(){
    this.update.emit(this.categoryForm.value);
  }

  public cancelModule(){
    this.cancel.emit(true);
  }

  /*
  * ------------------------------------------
  * Funciones propias del controlador
  * ------------------------------------------
  */
 private initUpdForm() {
  this.categoryForm = this.fb.group({
    pk_id_category: [this.category.pk_id_category],
    code: [this.category.code, Validators.required],
    name: [this.category.name, Validators.required],
    });
  }

  public getErrors(controlName: string): any {
    return this.formToolService.getErrors(this.categoryForm, controlName);
  }

  public mustShowError(controlName: string) {
    return this.formToolService.mustShowError(this.categoryForm, controlName);
  }

  public hasError(controlName: string, errorCode: string): any {
    return this.formToolService.hasError(this.categoryForm, controlName, errorCode);
  }

}
