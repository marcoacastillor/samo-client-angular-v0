import { Component, OnInit } from '@angular/core';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { faThList, faSave } from '@fortawesome/free-solid-svg-icons';
import { Parameter } from 'src/app/shared/models/parameter';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-form-food',
  templateUrl: 'product-form-food.component.html',
  styles: []
})
export class ProductFormFoodComponent implements OnInit {
  faThList = faThList;
  faSave = faSave;

  foodsForm: FormGroup;
  showPackageInfo: boolean = false;

  id_product = '';
  product: Product = new Product;

  success = false;
  message = '';

  parametersList: Parameter[] = [];

  //consultar parámetros
  type_product  = environment.product_type;
  presentation  = environment.presentation_product;

  categories      = {'categories' : [this.type_product,this.presentation]};

  constructor(
    private activateRoute: ActivatedRoute,
    private productService: ProductService,
    private fb: FormBuilder,
    private formToolService: FormToolsService,
    private parameterService: ParameterService
  ) { }

  ngOnInit() {
    this.createFormFood();
    this.id_product = this.activateRoute.snapshot.params['id'];
    this.initProduct(this.id_product)
    this.loadParameters();
  }

  private initProduct(id:string){
    if(this.id_product == 'new'){
      this.newProduct();
    }
    else{
      this.getProductDetailById(Number(this.id_product));
    }
  }

  private loadParameters(){
    this.parameterService.getByMultipleCodeCategory$(this.categories).subscribe(
      parameters_list => this.parametersList = parameters_list
    )
  }

  private newProduct()
  {
    this.product = new Product;
    this.product.category = environment.foods;  
    this.createFormFood();
  }

  private getProductDetailById(id:number){
    this.productService.show$(id).subscribe(
      product => {
        this.product = product;
        this.createFormFood();
      }
    )
  }

  private createFormFood(){
    this.foodsForm = this.fb.group({
      pk_id_product: [this.product.pk_id_product], 
      code: [this.product.code, Validators.required], 
      reference: [this.product.reference], 
      category: [this.product.category, Validators.required], 
      name: [this.product.name,Validators.required], 
      presentation: [this.product.presentation, Validators.required], 
      units_package: [this.product.units_package, Validators.required], 
      sale_price_unit: [this.product.sale_price_unit,Validators.required], 
      sale_price_package: [this.product.sale_price_package, Validators.required], 
      type_product: [this.product.type_product,Validators.required], 
      units_available: [this.product.units_available], 
      size: [''], 
      color: [''], 
      trademark: [''], 
     });
  }

  public setInfoByPresentation(){
    if(this.foodsForm.value.type_product == environment.type_product_internal_prd || this.foodsForm.value.type_product == environment.type_product_purchase){
      if(this.foodsForm.value.presentation == environment.individual){
        this.showPackageInfo = false;
        this.foodsForm.patchValue({
          units_package: 0,
          sale_price_package: 0,
          sale_price_unit: 0,
        }); 
      }
      else{
        this.showPackageInfo = true;
      }
    }
    else{
      this.showPackageInfo = false;
      this.foodsForm.patchValue({
        units_package: 0,
        sale_price_package: 0,
        sale_price_unit: 0,
      });
    }
  }

  public createProduct(){
    this.productService.store$(this.foodsForm.value).subscribe(
      () => {
        this.initProduct(this.id_product);
        this.success = true;
        this.message = 'Se creó producto correctamente.';
      }
    )
  }

  public updateProduct(){
    this.productService.update$(this.foodsForm.value).subscribe(
      () => {
        this.initProduct(this.id_product);
        this.success = true;
        this.message = 'Se actualizó información de producto correctamente.';
      }
    )
  }

  /**
   * Funciones para verificar si los formularios son obligatorios o no.
   */

  public getErrors(controlName: string): any {
    return this.formToolService.getErrors(this.foodsForm, controlName);
  }

  public mustShowError(controlName: string) {
    return this.formToolService.mustShowError(this.foodsForm, controlName);
  }

  public hasError(controlName: string, errorCode: string): any {
    return this.formToolService.hasError(this.foodsForm, controlName, errorCode);
  }

}
