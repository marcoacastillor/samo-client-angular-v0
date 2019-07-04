import { Component, OnInit, Output, EventEmitter, SimpleChanges, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/shared/models/product';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { environment } from 'src/environments/environment';
import { Parameter } from 'src/app/shared/models/parameter';
import { faThList } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-new-product',
  templateUrl: 'new-product.component.html',
  styles: []
})
export class NewProductComponent implements OnInit, OnChanges {
  clothesForm: FormGroup;
  
  chemicalInputForm: FormGroup;

  faThList = faThList;

  clothes: string = environment.clothes;
  medicine: string = environment.medicines;
  food: string = environment.foods;
  chemicalInput: string = environment.chemicalInput;

  productCategory: string = '';

  public showPackageInfo: boolean = false;
  public showClothingInfo:  boolean = false;
  public showPresentationInfo: boolean = false;
  
  @Input() public product: Product;
  @Input() public categoryList: Parameter[];
  @Input() public presentationList: Parameter[];
  @Input() public typeProductList: Parameter[];
  
  @Output() public update = new EventEmitter<Product>();
  @Output() public create = new EventEmitter<Product>();
  @Output() public onView = new EventEmitter<Boolean>();
  
  constructor(
    
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.product)
    {
      if(changes.product.currentValue)
      {
        this.product = changes.product.currentValue;
        this.selectProduct(changes.product.currentValue.category);
      }
    }
  }

  //Seleccionar el tipo de producto que quiere crear
  selectProduct(categ: string){
    this.product.category = categ;
    this.productCategory = categ;
  }

  //Regresar al listado general de productos
  viewList(){
    this.onView.emit(true);
  }

  /**
   *  Funciones de creación y actualización
   */
  public updateProduct(product: Product){
    this.update.emit(product);
  }

  public createProduct(product: Product){
    this.create.emit(product);
  }
}

