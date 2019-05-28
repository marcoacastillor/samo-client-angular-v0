import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { Product } from 'src/app/shared/models/product';
import { Parameter } from 'src/app/shared/models/parameter';

@Component({
  selector: 'app-modal-product',
  templateUrl: 'modal-product.component.html',
  styles: []
})
export class ModalProductComponent implements OnInit {
  @Input() public category: string;
  @Input() public categoryList: Parameter[];
  @Input() public presentationList: Parameter[];
  
  @Output() public create = new EventEmitter<Product>();
  
  constructor() { }

  ngOnInit() {
  }

  public onCreate(product: Product){
    this.create.emit(product);
  }
  
}
