import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { faThList } from '@fortawesome/free-solid-svg-icons';
import { Operation } from 'src/app/shared/models/operation';
import { ActivatedRoute } from '@angular/router';
import { OperationService } from 'src/app/shared/services/operation.service';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { OperationProductService } from 'src/app/shared/services/operation-product.service';
import { OperationProduct } from 'src/app/shared/models/operation-product';
import { Payment } from 'src/app/shared/models/payment';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { Notes } from 'src/app/shared/models/notes';
import { NotesService } from 'src/app/shared/services/notes.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-show-order-detail',
  templateUrl:'show-order-detail.component.html',
  styles: []
})
export class ShowOrderDetailComponent implements OnInit {
  faThList = faThList;
  id_operation = '';

  lstProducts: OperationProduct[] = [];
  lstNotes: Notes[] = [];
  lstPayments: Payment[] = [];
  operation: Operation = new Operation();
  enterprise: Enterprise = new Enterprise();
  
  constructor(
    private activateRoute: ActivatedRoute,
    private operationService: OperationService,
    private enterpriseService: EnterpriseService,
    private operationProductService: OperationProductService,
    private paymentService: PaymentService,
    private noteService: NotesService
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
        this.enterpriseService.showByExternalReference$(operation.external_reference).subscribe(
          enterprise => this.enterprise = enterprise
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
}