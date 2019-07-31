import { Component, OnInit } from '@angular/core';
import { faPlusCircle, faTrash, faEdit, faSearch, faFlag, faEye } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from 'src/app/shared/services/product.service';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { User } from 'src/app/shared/models/user';
import { Product } from 'src/app/shared/models/product';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: 'product-list.component.html',
  styles: []
})
export class ProductListComponent implements OnInit {
  faPlusCircle = faPlusCircle;
  faTrash = faTrash;
  faEdit = faEdit;
  faSearch = faSearch;
  faFlag = faFlag;
  faEye = faEye;

  user: User = new User;
  lstProducts: Product[] = [];
  product: Product = new Product;

  lastkeydown1= 0;
  
  public valMin = environment.min_products;
  public valMedium = environment.medium_products;

  constructor(
    private productService: ProductService,
    private globalStoreService: GlobalStoreService,
    private utilService: UtilsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.globalStoreService.getUser();
    this.loadAllProductsByEnterprise(this.user.fk_id_enterprise);
  }

  public loadAllProductsByEnterprise(id_enterprise: number){
    this.productService.getAllByEnterprise$(id_enterprise).subscribe(
      lst_products => this.lstProducts = lst_products
    )
  }

  onFindProductByCode(filter: any){
    let codeProduct = (<HTMLInputElement>document.getElementById('codeProduct')).value;
    this.lstProducts = [];

    if (codeProduct.length > 0) {
      if (filter.timeStamp - this.lastkeydown1 > 200) {
        this.productService.getByCodeFilterAndEnterprise$(codeProduct,this.user.fk_id_enterprise).subscribe(
          lst_products => {
            this.lstProducts = lst_products;
          }
        )
      }
    }
    else{
      this.loadAllProductsByEnterprise(this.user.fk_id_enterprise);
    }
  }

  onFindProductByName(filter: any){
    let nameProduct = (<HTMLInputElement>document.getElementById('nameProduct')).value;
    this.lstProducts = [];

    if (nameProduct.length > 0) {
      if (filter.timeStamp - this.lastkeydown1 > 200) {
        this.productService.getByNameFilterAndEnterprise$(nameProduct,this.user.fk_id_enterprise).subscribe(
          lst_products => {
            this.lstProducts = lst_products;
          }
        )
      }
    }
    else{
      this.loadAllProductsByEnterprise(this.user.fk_id_enterprise);
    }
  }

  onFindProductByReference(filter: any){
    let refProduct = (<HTMLInputElement>document.getElementById('referenceProduct')).value;
    this.lstProducts = [];

    if (refProduct.length > 0) {
      if (filter.timeStamp - this.lastkeydown1 > 200) {
        this.productService.getByReferenceFilterAndEnterprise$(refProduct,this.user.fk_id_enterprise).subscribe(
          lst_products => {
            this.lstProducts = lst_products;
          }
        )
      }
    }
    else{
      this.loadAllProductsByEnterprise(this.user.fk_id_enterprise);
    }
  }

  public selectProduct(product:Product){
    this.product = product
  }

  public deleteProduct(){
    this.productService.delete$(this.product.pk_id_product).subscribe(
      () => this.loadAllProductsByEnterprise(this.user.fk_id_enterprise)
    )
  }

  public getClassByUnits(units: number) {
    return this.utilService.getClassByUnits(units);
  }

  public crtProduct(type:string){
    this.router.navigateByUrl('sales-admin/products/stocks/create/'+type+'/new');
  }

  public updProduct(category:string,id:number){
    if(category == environment.foods){
      this.router.navigateByUrl('sales-admin/products/stocks/create/food/'+id);
    }
    if(category == environment.clothes){
      this.router.navigateByUrl('sales-admin/products/stocks/create/clothes/'+id);
    }
  }
}
