import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Results } from 'src/app/shared/models/results';
import { faPlusCircle, faEye, faEdit, faChartArea, faGreaterThanEqual, faLessThanEqual, faSearch } from '@fortawesome/free-solid-svg-icons';
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
  faGreater = faGreaterThanEqual;
  faLess = faLessThanEqual;
  faSearch = faSearch;
  
  @Input() public productList: Results;
  @Input() public actualPg: number;
  @Input() public regPerPg: number;

  @Output() public search = new EventEmitter<Product>();
  @Output() public show = new EventEmitter<number>();
  @Output() public select = new EventEmitter<Product>();
  @Output() public viewReport = new EventEmitter<boolean>();
  
  
  public totalPgs: number = 0;
  public maxPerPg: number = 0;

  public valMin: number = environment.min_products;
  public valMedium: number = environment.medium_products;

  constructor(
    private utilService: UtilsService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.calculateRegs();
    this.initUpdForm();
  }

  private initUpdForm() {
    this.searchForm = this.fb.group({
      code: [''],
      reference: [''],
      name: [''],
     });
   }

  private calculateRegs(){
    this.maxPerPg = (Number(this.actualPg) * Number(this.regPerPg)+ Number(this.regPerPg));
  }
  
  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.productList)
    {
      if(changes.productList.currentValue)
      {
        this.productList = changes.productList.currentValue;
        this.totalPgs = Math.ceil(this.productList.number_results / this.regPerPg);
        this.actualPg = 0;
      }
    }
  }

  public addActualPg(){
    this.actualPg = this.actualPg + 1;
    this.calculateRegs();
  }

  public delActualPg(){
    this.actualPg = this.actualPg - 1;
    this.calculateRegs();
  }

  public setRegPerPg(value: any){
    this.regPerPg = value;
    this.totalPgs = Math.ceil(this.productList.number_results / this.regPerPg);
    this.calculateRegs();
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


  /*
  * ------------------------------------------
  * Funciones visualización
  * ------------------------------------------
  */
 public getClassByUnits(units: number) {
  return this.utilService.getClassByUnits(units);
}

}
