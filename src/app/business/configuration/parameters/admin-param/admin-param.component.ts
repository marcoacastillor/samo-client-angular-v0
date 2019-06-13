import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/models/category';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { CategoryService } from 'src/app/shared/services/category.service';
import { tap } from 'rxjs/operators';
import { Parameter } from 'src/app/shared/models/parameter';
import { ParameterService } from 'src/app/shared/services/parameter.service';

@Component({
  selector: 'app-admin-param',
  templateUrl: 'admin-param.component.html',
  styles: []
})
export class AdminParamComponent implements OnInit {
  public showParam: boolean = false;
  public categoryList: Category[] = [];
  public category: Category = new Category;
  public parameter: Parameter = new Parameter;
  
  constructor(
    private globalStoreService: GlobalStoreService,
    private categoryService: CategoryService,
    private parameterService: ParameterService
  ) { }

  ngOnInit() {
    this.loadAllCategories();
  }

  private loadAllCategories(){
    this.categoryService.getAll$().subscribe(
      categories => this.categoryList = categories
    );
  }

  public onCreate(category: Category){
    this.categoryService.store$(category).subscribe(this.onSuccess, this.onError);
  }

  public onUpdate(category: Category){
    this.categoryService.update$(category).subscribe(this.onSuccess, this.onError);
  }

  public onCancel(cancel:boolean){
    if(cancel)
    {
      this.category = new Category;
    }
  }

  public onDelete(id: number){
    this.categoryService.delete$(id).subscribe(this.onSuccess, this.onError);
  }

  public onSelect(param: Parameter){
    this.parameter = param;
  }

  /*
  Funciones para gestionar información de parámetros
  */
  public onCreateParam(parameter: Parameter){
    this.parameterService.store$(parameter).subscribe(
      param => {
        this.onView(param.fk_id_category);
      }, 
      this.onError);
  }

  public onUpdateParam(parameter: Parameter){
    this.parameterService.update$(parameter).subscribe(
      param => {
        this.onView(param.fk_id_category);
      },
      this.onError);
  }

  public onDeleteParam(id_param: number){
    this.parameterService.delete$(id_param).subscribe(
      param => {
        this.onView(param.fk_id_category);
      },
      this.onError
    );
  }

  public onCancelParam(cancel:boolean){
    if(cancel)
    {
      this.parameter = new Parameter;
    }
  }

  /*
  */
  public onView(pk_id_category: number){
    this.showParam = true;
    this.categoryService.show$(pk_id_category).pipe(
      tap(this.loadCategory),
    ).subscribe(this.onSuccess, this.onError);
  }

  private loadCategory = (category: Category): void => {
    this.category = category;
  }

  public onUdp(category: Category){
    this.showParam = false;
    this.category = category;
  }

  /*
  * ------------------------------------------
  * Funciones validación de resultado
  * ------------------------------------------
  */
 private onSuccess = () => {
    this.globalStoreService.dispatchUserMessage('200', ' Se ejecutó exitosamente, la operación ');
    this.loadAllCategories();
  }

  private onError = (error: any) => {
    this.globalStoreService.dispatchUserMessage(error.status, error.statusText + ' : ' + error.error.error);
  }
}