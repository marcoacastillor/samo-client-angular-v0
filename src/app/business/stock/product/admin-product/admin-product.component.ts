import { Component, OnInit } from '@angular/core';
import { Results } from 'src/app/shared/models/results';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { tap, switchMap, timeout } from 'rxjs/operators';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/shared/models/product';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { Observable } from 'rxjs';
import { Parameter } from 'src/app/shared/models/parameter';
import { ParameterService } from 'src/app/shared/services/parameter.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: 'admin-product.component.html',
  styles: []
})
export class AdminProductComponent implements OnInit {
  public url_storage: string = environment.url_ventas_storage;
  public showProduct: boolean = false;
  public showReports: boolean = true;
  public showNewProduct: boolean = false;

  public actualPg: number = 0;
  public regPerPg: number = 5;
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
    private parameterService: ParameterService
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

  public onViewReport(showReport: boolean)
  {
    this.showReports = showReport;
    this.showProduct = false;
    this.showNewProduct = false;
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
    this.productService.getTopSoldProducts$(dateInit, dateEnd).pipe(
      tap(this.loadDataSet)
    )
    .subscribe(this.onSuccess,this.onError)
  }

  private loadDataSet = (dataSet: any): void => {
    this.dataSets = dataSet;
  } 

  private loadProducts(){
    this.productService.getAll$().pipe(
      tap(this.resultProduct)
    )
    .subscribe(this.onSuccess,this.onError)
  }

  private resultProduct = (result: Results): void => {
    this.productList = result;
  }

  public onSearch(product: Product){
    this.productService.searchByFilter$(product).subscribe(
      operations => {
        this.productList = operations;
      }
    );
  }

  /*
  public onGetPDFOnCode(code:string){
    this.productService.getPDFCode$(code).subscribe(
      image => {
        let configuracion_ventana = "menubar=yes,width=500,height=80,location=yes,resizable=yes,scrollbars=yes,status=yes";
        let w = window.open('',"_blank", configuracion_ventana);
        w.document.write(image);
        w.document.close();
        w.focus();
        w.print();
        w.close();
      }
    )
  }*/

  /*
  * Funciones invocadas desde LIST
  */
  public onShow(id: number){
    this.showProduct = true;
    this.showReports = false;
    this.showNewProduct = false;

    this.productService.show$(id).pipe(
      tap(this.loadProdct),
    )
    .subscribe(this.onSuccess, this.onError);
  }

  public onSelect(product: Product){
    this.showProduct = false;
    this.showReports = false;
    this.showNewProduct = true;

    this.product = product;
  }

  private loadProdct = (product: Product): void => {
    this.product = product;
  }

  public onUpdate(product: Product){
    this.productService.update$(product).subscribe(
      () => this.loadProducts()
    )
  }

  public onCreate(product: Product){
    this.productService.store$(product).subscribe(
      () => this.loadProducts()
    )
  }

  /*
  * ------------------------------------------
  * Funciones validación de resultado
  * ------------------------------------------
  */
  private onSuccess = () => {
    this.globalStoreService.dispatchUserMessage('200', ' Se ejecutó exitosamente, la operación ');
    }

    private onError = (error: any) => {
      console.log(error);
      this.globalStoreService.dispatchUserMessage(error.status, error.statusText + ' : ' + error.error.error);
    }
}
