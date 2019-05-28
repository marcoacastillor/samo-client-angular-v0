import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { faTasks, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { Operation } from 'src/app/shared/models/operation';
import { OperationService } from 'src/app/shared/services/operation.service';
import * as moment from 'moment';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-show-product',
  templateUrl: 'show-product.component.html',
  styles: []
})
export class ShowProductComponent implements OnInit, OnChanges {
  public reportForm: FormGroup;

  @Input() public product: Product;
  
  operationsList: Operation[] = [];

  faTask = faTasks;
  faCalendar = faCalendar;

  public dateInit: string;
  public dateEnd: string;
  public days_sold: number;
  
  constructor(
    private operationService: OperationService,
    private fb: FormBuilder,
    ) { }

  ngOnInit() {
    this.days_sold = environment.days_sold;
    this.dateEnd = moment().format('YYYY-MM-DD');
    this.dateInit = moment().add(-this.days_sold,'days').format('YYYY-MM-DD');

    this.initUpdForm();
  }

  public getDetails(id_product: number){
    let fromDate = moment(this.reportForm.value.from_date).format('YYYY-MM-DD');
    let toDate = moment(this.reportForm.value.to_date).format('YYYY-MM-DD');

    this.operationService.getListByProduct$(id_product,fromDate,toDate).subscribe(
      operations => this.operationsList = operations
    )
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.product)
    {
      if(changes.product.currentValue != changes.product.previousValue)
      {
        this.operationsList = [];
        this.initUpdForm();
      }
    }
  }

  /*
  * ------------------------------------------
  * Funciones propias del controlador
  * ------------------------------------------
  */
 private initUpdForm() {
  this.reportForm = this.fb.group({
    from_date: [this.dateInit],
    to_date: [this.dateEnd],
  });
}

}
