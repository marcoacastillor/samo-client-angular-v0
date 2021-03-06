import { Component, OnInit } from '@angular/core';
import { faThList } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from 'src/app/shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/product';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-show',
  templateUrl: 'product-show.component.html',
  styles: []
})
export class ProductShowComponent implements OnInit {
  faThList = faThList;
  id_product: '';

  product: Product = new Product;
  providerList: string[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private productService: ProductService,
    private enterpriseService: EnterpriseService
  ) { }

  ngOnInit() {
    this.id_product = this.activateRoute.snapshot.params['id'];
    this.getProductDetailById(Number(this.id_product));
  }

  private getProductDetailById(id:number){
    this.productService.show$(id).pipe(
      tap((product:Product) => this.product = product),
      tap((product:Product) => this.enterpriseService.getProvidersByProduct$(product.pk_id_product).subscribe(
        lst_providers => this.providerList = lst_providers
      ))
    ).subscribe()
  }
  
  public getPDFCode(html_code: string){
    let configuracion_ventana = "menubar=yes,width=800,height=300,location=yes,resizable=yes,scrollbars=yes,status=yes";
      let w = window.open('',"_blank", configuracion_ventana);
      w.document.write(html_code);
      w.document.close();
      w.focus();
      w.print();
      w.close();
  }

}
