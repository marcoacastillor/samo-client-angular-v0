import { Component, OnInit } from '@angular/core';
import { faEye, faEdit, faSearch, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { Operation } from 'src/app/shared/models/operation';
import { OperationProduct } from 'src/app/shared/models/operation-product';
import { environment } from 'src/environments/environment';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { OperationService } from 'src/app/shared/services/operation.service';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { OperationProductService } from 'src/app/shared/services/operation-product.service';
import * as moment from 'moment';
import { tap } from 'rxjs/operators';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-product-report-by-dates',
  templateUrl: 'product-report-by-dates.component.html',
  styles: []
})
export class ProductReportByDatesComponent implements OnInit {
  faEye = faEye;
  faEdit = faEdit;
  
  reportForm: FormGroup;

  faSearch = faSearch;
  faCalendar = faCalendar;

  activeUser: User = new User;
  resultData: any;

  product: Product = new Product;
  lstProductsFound: Product[] = [];
  lstProducts: OperationProduct [] = [];
  selectedOperation:Operation = new Operation;

  public dateInit: string;
  public dateEnd: string;
  public consolidate_day: number = environment.consolidate_day;

  emptyPrd = true;
  lastkeydown1 = 0;

  constructor(
    private globalStoreService: GlobalStoreService,
    private operationService: OperationService,
    private formToolService: FormToolsService,
    private operationProductService: OperationProductService,
    private productService: ProductService,
    private fb: FormBuilder,
    ) { }

  ngOnInit() {
    this.activeUser = this.globalStoreService.getUser();
    this.dateEnd = moment().add(+1,'days').format('YYYY-MM-DD');
    this.dateInit = moment().add(-this.consolidate_day,'days').format('YYYY-MM-DD');
    this.initUpdForm(this.dateInit,this.dateEnd);
  }

  onFindProduct(filter: any){
    let nameProduct = (<HTMLInputElement>document.getElementById('filterProduct')).value;
    this.lstProducts = [];
    
    if (nameProduct.length > 0) {
      this.emptyPrd =false;
      
      if (filter.timeStamp - this.lastkeydown1 > 200) {
        this.productService.getByNameFilterAndType$(nameProduct).subscribe(
          lstProducts => {
            this.lstProductsFound = lstProducts;
            if(lstProducts.length == 1){
              this.selectProduct(lstProducts[0]);
            }
          },
          () => this.emptyPrd = true
        )
      }
    }
  }

  selectProduct(product: Product){
    this.product = product;
    this.lstProductsFound = [];
    this.reportForm.patchValue({
      id_product: product.pk_id_product,
      name_product: product.name
    });
  }

  public getDataByParams(){
    this.operationService.getListByProduct$(
      this.reportForm.value.id_product,
      moment(this.reportForm.value.from_date).format('YYYY-MM-DD'),
      moment(this.reportForm.value.to_date).format('YYYY-MM-DD')
    ).subscribe(
      result_data => this.resultData = result_data
    )
  }

  private initUpdForm(dateInit: string, dateEnd: string) {
    this.reportForm = this.fb.group({
      from_date: [dateInit,Validators.required],
      to_date: [dateEnd,Validators.required],
      id_product: [''],
      name_product: ['',Validators.required]
    });
  }

  public selectOperation(operation:Operation){
    this.operationProductService.getProductsByOperation$(operation.pk_id_operation).pipe(
      tap((lstProducts: OperationProduct[]) => {
        this.lstProducts = lstProducts
      }),
      tap(() => this.operationService.getDetailOperation$(operation.pk_id_operation).subscribe(
        operation => this.selectedOperation = operation
      ))
    ).subscribe()
  }

  public getErrors(controlName: string): any {
    return this.formToolService.getErrors(this.reportForm, controlName);
  }

  public mustShowError(controlName: string) {
    return this.formToolService.mustShowError(this.reportForm, controlName);
  }

  public hasError(controlName: string, errorCode: string): any {
    return this.formToolService.hasError(this.reportForm, controlName, errorCode);
  }

}
