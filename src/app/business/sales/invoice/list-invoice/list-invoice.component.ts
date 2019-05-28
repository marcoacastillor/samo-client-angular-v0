import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { faPlusCircle, faEye, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Operation } from 'src/app/shared/models/operation';
import { Results } from 'src/app/shared/models/results';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-invoice',
  templateUrl: 'list-invoce.component.html',
  styles: []
})
export class ListInvoiceComponent implements OnInit, OnChanges {
  searchForm: FormGroup;
  
  faEye = faEye;
  faPlusCircle = faPlusCircle;
  faSearch = faSearch;

  public totalPgs: number = 0;
  public maxPerPg: number = 0;

  @Input() public orderList: Results;

  @Output() public updateOrder = new EventEmitter<Operation>();
  @Output() public deleteOrder = new EventEmitter<number>();
  @Output() public viewOrder = new EventEmitter<number>();
  @Input() public actualPg: number;
  @Input() public regPerPg: number;

  @Output() public search = new EventEmitter<string>();
  
  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.initUpdForm();
  }

  private initUpdForm() {
    this.searchForm = this.fb.group({
      filter: ['',Validators.required],
     });
   }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.orderList)
    {
      if(changes.orderList.currentValue)
      {
        this.orderList = changes.orderList.currentValue;
        this.totalPgs = Math.ceil(this.orderList.number_results / this.regPerPg);
        this.actualPg = 0;
      }
    }
  }

  public addActualPg(){
    this.actualPg = this.actualPg + 1;
    this.calculateRegs();
  }

  public delActualPg(){
    this.actualPg = this.actualPg - 1;
    this.calculateRegs();
  }

  public setRegPerPg(value: any){
    this.regPerPg = value;
    this.totalPgs = Math.ceil(this.orderList.number_results / this.regPerPg);
    this.calculateRegs();
  }

  private calculateRegs(){
    this.maxPerPg = (Number(this.actualPg) * Number(this.regPerPg)+ Number(this.regPerPg));
  }
  
  public crtOrder() {
    this.updateOrder.emit(new Operation);
  }

  public showOrder(pk_id_operation: number) {
    this.viewOrder.emit(pk_id_operation);
  }

  public searchOrder(){
    let filter = this.searchForm.value.filter;
    if(filter.length == 0){
      filter = 'none';
    }
    this.search.emit(filter);
  }

}
