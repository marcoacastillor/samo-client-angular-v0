import { Component, OnInit } from '@angular/core';
import { faThList, faSave } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/shared/models/product';
import { Parameter } from 'src/app/shared/models/parameter';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { ParameterService } from 'src/app/shared/services/parameter.service';

@Component({
  selector: 'app-product-form-clothes',
  templateUrl: 'product-form-clothes.component.html',
  styles: []
})
export class ProductFormClothesComponent implements OnInit {
  faThList = faThList;
  faSave = faSave;

  clothesForm: FormGroup;
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
    this.product.category = environment.clothes;  
    this.product.presentation = environment.individual;
    this.product.sale_price_package =  0;
    this.product.sale_price_unit = 0;
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
    this.clothesForm = this.fb.group({
      pk_id_product: [this.product.pk_id_product], 
      code: [this.product.code, Validators.required], 
      reference: [this.product.reference], 
      category: [this.product.category, Validators.required], 
      name: [this.product.name,Validators.required], 
      presentation: [this.product.presentation, Validators.required], 
      units_package: [this.product.units_package], 
      sale_price_unit: [this.product.sale_price_unit,Validators.required], 
      sale_price_package: [this.product.sale_price_package], 
      type_product: [this.product.type_product,Validators.required], 
      units_available: [this.product.units_available], 
      size: [this.product.size, Validators.required], 
      color: [this.product.color, Validators.required], 
      trademark: [this.product.trademark, Validators.required], 
     });
  }

  public createProduct(){
    this.productService.store$(this.clothesForm.value).subscribe(
      () => {
        this.initProduct(this.id_product);
        this.success = true;
        this.message = 'Se creó producto correctamente.';
      }
    )
  }

  public updateProduct(){
    this.productService.update$(this.clothesForm.value).subscribe(
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
    return this.formToolService.getErrors(this.clothesForm, controlName);
  }

  public mustShowError(controlName: string) {
    return this.formToolService.mustShowError(this.clothesForm, controlName);
  }

  public hasError(controlName: string, errorCode: string): any {
    return this.formToolService.hasError(this.clothesForm, controlName, errorCode);
  }

}