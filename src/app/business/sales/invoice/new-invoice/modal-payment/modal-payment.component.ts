import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-payment',
  templateUrl: 'modal-payment.component.html',
  styles: []
})
export class ModalPaymentComponent implements OnInit {
  @Input() public total_payment: number;

  @Output() public saveInvoice = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  public onSaveInvoice(onEvent: boolean){
    this.saveInvoice.emit(onEvent);
  }

}
