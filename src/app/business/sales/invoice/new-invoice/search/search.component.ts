import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Results } from 'src/app/shared/models/results';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-search',
  templateUrl: 'search-component.html',
  styles: []
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  public productList: Product[] = [];
  
  @Output() public select = new EventEmitter<string>();

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,

  ) { }

  ngOnInit() {
    this.initUpdForm();
  }

  private initUpdForm() {
  this.searchForm = this.fb.group({
    code: [''],
    reference: [''],
    name: [''],
    });
  }

  public searchProduct(){
    this.productService.searchByFilter$(this.searchForm.value).subscribe(
      operations => {
        this.productList = operations[0].data_results;
      }
    );
  }

  public selectProduct(code: string){
    this.select.emit(code);
  }

}
