import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import * as XLSX from 'xlsx';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { Operation } from 'src/app/shared/models/operation';
import { environment } from 'src/environments/environment';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { Parameter } from 'src/app/shared/models/parameter';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { OperationService } from 'src/app/shared/services/operation.service';
import { StatusMessage } from 'src/app/shared/models/status-message';

@Component({
  selector: 'app-new-order-file',
  templateUrl: 'new-order-file.component.html',
  styles: []
})
export class NewOrderFileComponent implements OnInit {
  public purchaseFileForm: FormGroup;
  public data: any;
  public lstParams: Parameter[] = [];
  public lstMessages: StatusMessage[] = [];

  public operation: Operation = new Operation;
  
  constructor(
    private fb: FormBuilder,
    private formToolService: FormToolsService,
    private utilService: UtilsService,
    private globalStoreService: GlobalStoreService,
    private parameterService: ParameterService,
    private operationService: OperationService
  ) { }

  ngOnInit() {
    this.operation.products_list = [];
    this.loadDataPurchase()
    this.initUpdForm();
    this.loadParamsOrders();
  }

  private loadParamsOrders(){
    this.parameterService.getByCodeCategory$(environment.type_payment).subscribe(
      params => this.lstParams = params
    );
  }

  public onCreate(operation: Operation){
    this.operationService.store_purchase_file$(operation).subscribe(
      responseMsg => {
        this.lstMessages = responseMsg;
        this.data        = [];
      }
    )
  }

  private loadDataPurchase(){
    let user = this.globalStoreService.getUser();
    this.operation.fk_id_person    = user.fk_id_person;
    this.operation.operation_type  = environment.type_operation_purchase; 
    this.operation.state_operation = environment.state_payment_purchase;
    this.operation.total_operation = 0;
    this.operation.total_tax       = 0;
    this.operation.total_discounts = 0;
    this.operation.total_discounts = 0;
  }

  private initUpdForm() {
  this.purchaseFileForm = this.fb.group({
    file_ref_purchase: ['', Validators.required],
    file_purchase: [null],
    });
  }

  public onFileSelected(event){
    let reader = new FileReader();

    if(event.target.files && event.target.files.length){
      /* wire up file reader */
      const target: DataTransfer = <DataTransfer>(event.target);
      if (target.files.length !== 1) throw new Error('Cannot use multiple files');
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        /* read workbook */
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */
        this.data = (XLSX.utils.sheet_to_json(ws, {header: 1}));
      };
      reader.readAsBinaryString(target.files[0]);
    }
  }

  public getClassHeaderTable(selected: string){
    return this.utilService.getClassHeaderTable(selected);
  }

  public getErrors(controlName: string): any {
    return this.formToolService.getErrors(this.purchaseFileForm, controlName);
  }

  public mustShowError(controlName: string) {
    return this.formToolService.mustShowError(this.purchaseFileForm, controlName);
  }

  public hasError(controlName: string, errorCode: string): any {
    return this.formToolService.hasError(this.purchaseFileForm, controlName, errorCode);
  }
}