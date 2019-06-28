import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DetailProductInput } from 'src/app/shared/models/detail-product-input';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-periods-product-info',
  templateUrl: 'periods-product-info.component.html',
  styles: []
})
export class PeriodsProductInfoComponent implements OnInit {
  faTrash = faTrash;
  detailProductInput: DetailProductInput = new DetailProductInput();

  @Input() public productLst: DetailProductInput[];
  @Input() public stateProduction: string;
  @Output() public onDeleteDetail = new EventEmitter<Number>();
  
  constructor() { }

  ngOnInit() {
  }

  selectDetailProductInput(detailProductInput: DetailProductInput){
    this.detailProductInput = detailProductInput
  }

  deleteDetailProduct(){
    this.onDeleteDetail.emit(this.detailProductInput.pk_id_detail_product_input)
  }
}
