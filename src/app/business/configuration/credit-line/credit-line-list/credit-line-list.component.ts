import { Component, OnInit } from '@angular/core';
import { faPlusCircle, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { CreditLine } from 'src/app/shared/models/credit-line';
import { CreditLineService } from 'src/app/shared/services/credit-line.service';
import { ResultOperation } from 'src/app/shared/models/result-operation';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { Parameter } from 'src/app/shared/models/parameter';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-credit-line-list',
  templateUrl: 'credit-line-list.component.html',
  styles: []
})
export class CreditLineListComponent implements OnInit {
  faPlusCircle = faPlusCircle;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;

  lstCreditLine: CreditLine[] = [];
  lstParameters: Parameter[] = [];
  creditLine: CreditLine = new CreditLine;
  resultOperation: ResultOperation = new ResultOperation;

  constructor(
    private creditLineService:CreditLineService,
    private parametersService: ParameterService
  ) {}

  ngOnInit() {
    this.getAllCreditLine();
  }

  getAllCreditLine(){
    this.creditLineService.getAll$().subscribe(
      lst_credit_line => this.lstCreditLine = lst_credit_line
    )
  }

  loadParameters(){
    this.parametersService.getByCodeCategory$(environment.term_interest).subscribe(
      lst_parameters => this.lstParameters = lst_parameters
    )
  }

  public createCreditLine(){
    this.creditLine = new CreditLine;
  }

  public selectCreditLine(creditLine:CreditLine){
    this.creditLine = creditLine;
  }

  public deleteCreditLine(){
    this.creditLineService.delete$(this.creditLine.pk_id_credit_line).subscribe(
      result => 
      {
        this.resultOperation = result;
        this.getAllCreditLine();
      }
    )
  }

  public onCreate(creditLine:CreditLine){
    this.creditLineService.create$(creditLine).subscribe(
      result => 
      {
        this.resultOperation = result;
        this.getAllCreditLine();
      }
    )
  }

  public onUpdate(creditLine:CreditLine){
    this.creditLineService.update$(creditLine).subscribe(
      result => 
      {
        this.resultOperation = result;
        this.creditLine = result.response;
        this.getAllCreditLine();
      }
    )
  }


}
