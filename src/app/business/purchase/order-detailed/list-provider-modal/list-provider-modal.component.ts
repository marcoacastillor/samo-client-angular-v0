import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list-provider-modal',
  templateUrl: 'list-provider-modal.component.html',
  styles: []
})
export class ListProviderModalComponent implements OnInit {
  @Input() public lstProviders: Enterprise[];
  @Output() public selectProvider = new EventEmitter<Enterprise>();

  faCheckCircle = faCheckCircle;
  constructor() { }

  ngOnInit() {
  }

  onSelectProvider(provider: Enterprise){
    this.selectProvider.emit(provider);
  }

}
