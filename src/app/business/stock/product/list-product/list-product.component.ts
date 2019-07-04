import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Results } from 'src/app/shared/models/results';
import { faPlusCircle, faEye, faEdit, faChartArea, faGreaterThanEqual, faLessThanEqual, faSearch, faFlag, faTrash } from '@fortawesome/free-solid-svg-icons';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/shared/models/product';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-product',
  templateUrl:'list-product.component.html',
  styles: []
})
export class ListProductComponent implements OnInit, OnChanges {
  searchForm: FormGroup;
  
  faPlusCircle = faPlusCircle;
  faEdit = faEdit;
  faEye = faEye;
  faChartArea = faChartArea;
  faFlag = faFlag;
  faTrash = faTrash;

  selectedProduct: Product = new Product();
  
  @Input() public productList: Results;
  @Input() public actualPg: number;
  @Input() public regPerPg: number;

  @Output() public search = new EventEmitter<Product>();
  @Output() public show = new EventEmitter<number>();
  @Output() public select = new EventEmitter<Product>();
  @Output() public viewReport = new EventEmitter<boolean>();
  @Output() public delete = new EventEmitter<Number>();
  
  
  public valMin: number = environment.min_products;
  public valMedium: number = environment.medium_products;

  constructor(
    private utilService: UtilsService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.initUpdForm();
  }

  private initUpdForm() {
    this.searchForm = this.fb.group({
      code: [''],
      reference: [''],
      name: [''],
     });
   }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.productList)
    {
      if(changes.productList.currentValue)
      {
        this.productList = changes.productList.currentValue;
      }
    }
  }

  public searchProduct(){
    this.search.emit(this.searchForm.value);
  }

  public resetData(){
    this.searchForm.reset();
  }

  /*
  * Funciones propias para producto.
  */
 public crtProduct(){
  this.select.emit(new Product);
 }

  public showProduct(id: number){
    this.show.emit(id);
  }

  public updProduct(product: Product){
    this.select.emit(product);
  }

  public showReport(){
    this.viewReport.emit(true);
  }

  public deleteProduct(){
    this.delete.emit(this.selectedProduct.pk_id_product);
  }

  public selectProduct(product: Product){
    this.selectedProduct = product;
  }


  /*
  * ------------------------------------------
  * Funciones visualización
  * ------------------------------------------
  */
public getClassByUnits(units: number) {
  return this.utilService.getClassByUnits(units);
}

}
