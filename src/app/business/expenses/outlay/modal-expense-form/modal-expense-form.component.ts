import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { faSave, faCalendar, faClone, faDonate, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Expense } from 'src/app/shared/models/expense';
import { Parameter } from 'src/app/shared/models/parameter';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { ParameterConfig } from 'src/app/shared/models/parameter-config';
import { environment } from 'src/environments/environment';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';

@Component({
  selector: 'app-modal-expense-form',
  templateUrl: 'modal-expense-form.component.html',
  styles: []
})
export class ModalExpenseFormComponent implements OnInit {
  faSave = faSave;
  faCalendar = faCalendar;
  faClone = faClone;
  faDonate = faDonate;
  faSearch = faSearch;

  expenseForm: FormGroup;

  @Input() public expense: Expense;
  @Input() public parameterList: Parameter[];
  @Input() public parameterEnterprise: ParameterConfig[];
  @Input() public fk_id_enterprise: number;
  
  public enterprise: Enterprise = new Enterprise;

  lstProviders: Enterprise[] = [];
  
  @Output() public update = new EventEmitter<Expense>();
  @Output() public create = new EventEmitter<Expense>();

  lastkeydown1 = 0;
  emptyProv = false;

  constructor(
    private fb: FormBuilder,
    private formToolService: FormToolsService,
    private enterpriseService: EnterpriseService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.expense)
    {
      if(changes.expense.currentValue != changes.expense.previousValue)
      {
        this.expense = changes.expense.currentValue;
        this.initForm();
      }
    }
  }

  onFindProvider(filter: any){
    let nameProvider = (<HTMLInputElement>document.getElementById('filterProvider')).value;
    this.lstProviders = [];

    if (nameProvider.length > 0) {
      if (filter.timeStamp - this.lastkeydown1 > 200) {
        this.enterpriseService.getByNameFilter$(nameProvider,environment.enterprise_provider).subscribe(
          lstProviders => {
            this.lstProviders = lstProviders;
            this.emptyProv = false;
          },
          () => {
            this.emptyProv = true;
          }
        )
      }
    }
  }

  selectProvider(enterprise: Enterprise){
    this.emptyProv = false;
    this.enterprise = enterprise;
    this.lstProviders = [];
    this.expenseForm.patchValue({
      fk_id_provider: enterprise.pk_id_enterprise,
      name_provider: '('+ enterprise.nit +') ' + enterprise.name + ' ' + enterprise.last_names
    })
  }

  public selectNumberPurchase(){
    let number_purchase     = '0';
    let enterprise_purchase = this.getParameters(environment.enterprise_purchase_fact);
    let prefix_purchase     = this.getParameters(environment.prefix_purchase);
    let current_purchase    = this.getParameters(environment.current_purchase);

    if(enterprise_purchase){
      if(prefix_purchase){
        if(current_purchase)
          number_purchase = prefix_purchase + (parseInt(current_purchase) + 1);
        else
        {
          current_purchase = '1';
          number_purchase = prefix_purchase + parseInt(current_purchase);
        }
      }
      else if(current_purchase)
          number_purchase = (parseInt(current_purchase) + 1).toString();
        else
          current_purchase = '1';
      }
    else
      number_purchase = '1';
    
    this.expenseForm.patchValue({
      number_voucher: number_purchase,
      actual_value: parseInt(current_purchase) + 1,
      type_expense: 'Factura Equivalente'
    });
  }

  public selectNumberVoucher(){
    let number_voucher = '';
    let current_voucher = this.getParameters(environment.current_voucher);
    
    if(current_voucher)
      number_voucher = (Number(current_voucher) + 1).toString();
    else
      number_voucher = '1';
    
  
    this.expenseForm.patchValue({
      number_voucher: number_voucher,
      actual_value: Number(current_voucher) + 1,
      type_expense: 'Comprobante de egreso'
    });
  }

  private getParameters(code: string){
    console.log(JSON.stringify(this.parameterEnterprise));

    if(this.parameterEnterprise)
    {
      const resultado = this.parameterEnterprise.filter( parameter => parameter.code === code );
      if(resultado[0].value != code)
        return resultado[0].value;
      else
        return null;
    }else{
      return null;
    }
  }

  private initForm(){
    this.expenseForm = this.fb.group({
      pk_id_expense: [this.expense.pk_id_expense],
      fk_id_enterprise: [this.fk_id_enterprise],
      name_provider: [this.expense.name_provider],
      fk_id_provider: [this.expense.fk_id_provider, Validators.required],
      number_voucher: [this.expense.number_voucher, Validators.required],
      actual_value: [],
      date_expense: [this.expense.date_expense],
      type_expense: [this.expense.type_expense,Validators.required],
      concept_expense: [this.expense.concept_expense, Validators.required],
      description: [this.expense.description, Validators.required],
      value: [this.expense.value, Validators.required]
    })
  }



  updateExpense(){
    this.update.emit(this.expenseForm.value);
  }

  createExpense(){
    this.create.emit(this.expenseForm.value);
  }

  /**
  * Funciones para verificar si los formularios son obligatorios o no.
  */

  public getErrors(controlName: string): any {
      return this.formToolService.getErrors(this.expenseForm, controlName);
    }

    public mustShowError(controlName: string) {
      return this.formToolService.mustShowError(this.expenseForm, controlName);
    }

    public hasError(controlName: string, errorCode: string): any {
      return this.formToolService.hasError(this.expenseForm, controlName, errorCode);
    }

}
