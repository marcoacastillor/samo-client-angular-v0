import { Component, Input, OnInit } from '@angular/core';
import { StatusMessage } from '../models/status-message';

@Component({
  selector: 'app-card',
  templateUrl: 'card.component.html',
  styles: []
})
export class CardComponent implements OnInit {
  @Input() public caption: string;
  @Input() public value: string;
  @Input() public status: StatusMessage;
  constructor() { }

  ngOnInit() {
  }

}
