import { Component, OnInit } from '@angular/core';
import { faThList, faFileInvoiceDollar, faCartArrowDown, faDonate, faEdit, faLock, faPrint, faPlus, faDollarSign, faUndo, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { OperationProduct } from 'src/app/shared/models/operation-product';
import { Notes } from 'src/app/shared/models/notes';
import { Payment } from 'src/app/shared/models/payment';
import { Operation } from 'src/app/shared/models/operation';
import { Parameter } from 'src/app/shared/models/parameter';
import { environment } from 'src/environments/environment.prod';
import { ActivatedRoute } from '@angular/router';
import { OperationService } from 'src/app/shared/services/operation.service';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { OperationProductService } from 'src/app/shared/services/operation-product.service';
import { NotesService } from 'src/app/shared/services/notes.service';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { tap } from 'rxjs/operators';
import { PersonService } from 'src/app/shared/services/person.service';
import { Person } from 'src/app/shared/models/person';

@Component({
  selector: 'app-show-sale-detail',
  templateUrl:'show-sale-detail.component.html',
  styles: []
})
export class ShowSaleDetailComponent implements OnInit {
  id_operation = '';
  
  faThList = faThList;
  faFileInvoiceDollar = faFileInvoiceDollar;
  faCartArrowDown = faCartArrowDown;
  faDonate = faDonate;
  faEdit = faEdit;
  faLock = faLock;
  faPrint = faPrint;
  faPlus = faPlus;
  faDollarSign = faDollarSign;
  faUndo = faUndo;
  faTrashAlt = faTrashAlt;

  lstProducts: OperationProduct[] = [];
  lstNotes: Notes[] = [];
  lstPayments: Payment[] = [];
  operation: Operation = new Operation();
  person: Person = new Person();

  lstParams: Parameter[] = [];
  individual      = environment.individual;
  type_payment    = environment.type_payment;
  taxes           = environment.tax_purchase;
  block           = environment.state_block;
  categories      = {'categories' : [this.type_payment,this.taxes]};
  
  success = false;
  message = '';

  constructor(
    private activateRoute: ActivatedRoute,
    private operationService: OperationService,
    private personService: PersonService,
    private operationProductService: OperationProductService,
    private paymentService: PaymentService,
    private noteService: NotesService,
    private parameterService: ParameterService
  ) { }

  ngOnInit() {
    this.id_operation = this.activateRoute.snapshot.params['id'];
    this.getOperationDetail(this.id_operation);
  }
  
  private getOperationDetail(id: string){
    this.operationService.getDetailOperation$(Number(id)).pipe(
      tap((operation: Operation) => { 
        this.operation = operation
      }),
      tap((operation: Operation) => { 
        this.personService.showByExternalReference$(operation.external_reference).subscribe(
          person => this.person = person
        )
      }),
      tap((operation: Operation) => { 
        this.operationProductService.getProductsByOperation$(operation.pk_id_operation).subscribe(
          lstProducts => this.lstProducts = lstProducts
        )
      }),
      tap((operation: Operation) => { 
        this.paymentService.getPaymentsByOperation$(operation.pk_id_operation).subscribe(
          lstPayments => this.lstPayments = lstPayments
        )
      }),
      tap((operation: Operation) => { 
        this.noteService.getNotesByOperation$(operation.pk_id_operation).subscribe(
          lstNotes => this.lstNotes = lstNotes
        )
      }),
    ).subscribe()
  }

  getMultipleParams(){
    this.parameterService.getByMultipleCodeCategory$(this.categories).subscribe(
      lstParams => this.lstParams = lstParams
    )
  }

  onUpdateOperation(operation:Operation){
    this.operationService.updateOperation$(operation).subscribe(
      operation => { 
        this.getOperationDetail(operation.pk_id_operation.toString());
        this.success = true;
        this.message = 'Se actualizó la operación correctamente.';
      }
    )
  }

  onAddProduct(product: any){
    this.operationProductService.store$(product).subscribe(
      operationProduct => {
        this.getOperationDetail(operationProduct.fk_id_operation.toString());
        this.success = true;
        this.message = 'Se agregó producto correctamente.';
      }
    )
  }

  delProduct(id: number){
    this.operationProductService.delete$(id).subscribe(
      operationProduct => {
        this.getOperationDetail(operationProduct.fk_id_operation.toString());
        this.success = true;
        this.message = 'Se eliminó producto correctamente.';
      }
    )
  }

  onAddPayment(payment:Payment){
    this.paymentService.store$(payment).subscribe(
      payment => {
        this.getOperationDetail(payment.fk_id_operation.toString());
        this.success = true;
        this.message = 'Se agregó un pago correctamente.';
      }
    )
  }

  delPayment(id:number){
    this.paymentService.delete$(id).subscribe(
      payment => {
        this.getOperationDetail(payment.fk_id_operation.toString());
        this.success = true;
        this.message = 'Se eliminó un pago correctamente.';
      }
    )
  }

  blockInvoice()
  {
    this.operationService.changeState$(this.operation.pk_id_operation,environment.state_block).subscribe(
      operation => {
        this.getOperationDetail(operation.pk_id_operation.toString());
        this.success = true;
        this.message = 'Se bloquea la factura.';
      }
    )
  }
}
