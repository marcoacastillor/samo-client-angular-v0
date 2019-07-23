import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-list-products-modal',
  templateUrl: 'list-products-modal.component.html',
  styles: []
})
export class ListProductsModalComponent implements OnInit {
  @Input() public lstProducts: Product[];
  @Output() public selectProduct = new EventEmitter<Product>();

  lastkeydown1 = 0;

  faCheckCircle = faCheckCircle;
  empty = false;
  
  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
  }

  onSelectProduct(product: Product){
    this.selectProduct.emit(product);
  }

  onFindProduct(filter: any){
    let nameProduct = (<HTMLInputElement>document.getElementById('name_product')).value;
    this.lstProducts = [];

    if (nameProduct.length > 0) {
      if (filter.timeStamp - this.lastkeydown1 > 200) {
        this.productService.getByNameFilterAndType$(nameProduct).subscribe(
            lstProducts => { 
              this.lstProducts = lstProducts; 
              this.empty = false
            },
            () => this.empty = true
        )
      }
    }
  }
}
