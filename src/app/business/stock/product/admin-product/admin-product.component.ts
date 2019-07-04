import { Component, OnInit } from '@angular/core';
import { Results } from 'src/app/shared/models/results';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { ProductService } from 'src/app/shared/services/product.service';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/shared/models/product';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { Parameter } from 'src/app/shared/models/parameter';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { tap } from 'rxjs/operators';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: 'admin-product.component.html',
  styles: []
})
export class AdminProductComponent implements OnInit {
  public url_storage: string = environment.url_ventas_storage;
  public showProduct: boolean = false;
  public showReports: boolean = false;
  public showNewProduct: boolean = false;
  public listProduct: boolean = true;
  
  public days_sold: number = environment.days_sold;
  public consolidate_day: number = environment.consolidate_day;

  public dateEnd: string = moment().add(+this.consolidate_day,'days').format('YYYY-MM-DD');
  public dateInit: any = moment().add(-this.consolidate_day,'days').format('YYYY-MM-DD');
  
  public productList: Results = new Results();
  public providerList: Enterprise[] = [];

  public presentationList: Parameter[] = [];
  public categoryList: Parameter[] = [];
  public typeProductList: Parameter[] = [];

  public dataSets: any[] = [];

  public product: Product = new Product;

  public valueStock: number = 0;

  constructor(
    private globalStoreService: GlobalStoreService,
    private productService: ProductService,
    private enterpriseService: EnterpriseService,
    private parameterService: ParameterService,
    private utilService: UtilsService
  ) { }

  ngOnInit() {
    this.loadProducts();
    this.loadReportTopSold(this.dateInit, this.dateEnd);
    this.loadValueStocks();
    this.loadCategoryList();
    this.loadPresentationProductList();
    this.loadTypeProductList();
  
  }

  private loadTypeProductList(){
    this.parameterService.getByCodeCategory$(environment.product_type).subscribe(
      product_type_list => this.typeProductList = product_type_list
    );
  }

  private loadPresentationProductList(){
    this.parameterService.getByCodeCategory$(environment.presentation_product).subscribe(
      presentation_list => this.presentationList = presentation_list
    );
  }

  private loadCategoryList(){
    this.parameterService.getByCodeCategory$(environment.category_product).subscribe(
      category_list => this.categoryList = category_list
    );
  }

  public loadValueStocks()
  {
    this.productService.getValueStock$().subscribe(
      value_stock => this.valueStock = value_stock
    )
  }  

  public loadProviders(){
    this.enterpriseService.getAllByType$(environment.enterprise_provider).subscribe(
      providersList => this.providerList = providersList
    );
  }

  public onLoadData(report: any){
    let dateInit = moment(report.from_date).format('YYYY-MM-DD');
    let dateEnd = moment(report.to_date).format('YYYY-MM-DD');
    this.loadReportTopSold(dateInit, dateEnd);
  }

  private loadReportTopSold(dateInit, dateEnd)
  {
    this.productService.getTopSoldProducts$(dateInit, dateEnd).subscribe(
      dataSet => this.dataSets = dataSet
    )
  }

  private loadProducts(){
    this.productService.getAll$().subscribe(
      result => this.productList = result
    )
  }

  public onSearch(product: Product){
    this.productService.searchByFilter$(product).subscribe(
      operations => {
        this.productList = operations;
      }
    );
  }

  /*
  * Funciones invocadas desde LIST
  */

 //Muestra listado 
 public onView(flag: boolean){
  this.listProduct = flag;
  this.showReports = false;
  this.showProduct = false;
  this.showNewProduct = false;
}

//Muestra reporte
public onViewReport(showReport: boolean)
{
  this.showReports = showReport;
  this.showProduct = false;
  this.showNewProduct = false;
  this.listProduct = false;
}

//Muestra new
public onSelect(product: Product){
  this.product = product;

  this.showProduct = false;
  this.showReports = false;
  this.showNewProduct = true;
  this.listProduct = false;
 }

 //Muestra show 
 public onShow(id: number){
    this.showProduct = true;
    this.showReports = false;
    this.showNewProduct = false;
    this.listProduct = false;

    this.productService.show$(id).pipe(
      tap(this.loadProdct),
    )
    .subscribe();
  }

  private loadProdct = (product: Product): void => {
    this.product = product;
  }

  public onUpdate(product: Product){
    this.productService.update$(product).subscribe(
      prd => {
        this.onSetMessageOperation('Se actualizó el registro exitosamente.');
        this.loadProducts();
      }
    )
  }

  public onCreate(product: Product){
    this.productService.store$(product).subscribe(
      prd => {
        this.onSetMessageOperation('Se creó registro exitosamente.');
        this.loadProducts();
      }
    )
  }

  public onDelete(id: number){
    this.productService.delete$(id).subscribe(
      () => {
        this.onSetMessageOperation('Se eliminó registro satisafactoriamente. ');
        this.loadProducts();
      }
    )
  }

  /*
  * ------------------------------------------
  * Funciones validación de resultado
  * ------------------------------------------
  */
private onSetMessageOperation (message: string) {
  this.globalStoreService.dispatchUserMessage('200', message);
}

  /*
  * ------------------------------------------
  * Funciones visualización
  * ------------------------------------------
  */

 public getClassReport(){
  return this.utilService.getClassReport(this.showReports)
}

 public getClassNew() {
  return this.utilService.getClassNew(this.showNewProduct);
}

  public getClassList() {
    return this.utilService.getClassList(this.listProduct);
  }

  public getClassShow() {
    return this.utilService.getClassShow(this.showProduct);
  }
}
