import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from 'src/app/shared/services/product.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-list-product-modal',
  templateUrl: 'list-product-modal.component.html',
  styles: []
})
export class ListProductModalComponent implements OnInit {
  @Input() public lstProducts: Product[];
  @Output() public selectProduct = new EventEmitter<Product>();

  lastkeydown1 = 0;
  empty = false;

  faCheckCircle = faCheckCircle;
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
        this.productService.getSalesProductsByNameFilter$(nameProduct).subscribe(
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
