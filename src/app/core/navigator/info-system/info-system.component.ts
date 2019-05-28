import { Component, OnInit, Input } from '@angular/core';
import { StatusMessage } from '../../../shared/models/status-message';

@Component({
  selector: 'app-info-system',
  templateUrl: 'info-system.component.html',
  styles: []
})
export class InfoSystemComponent implements OnInit {
  @Input() public message: StatusMessage;
  constructor() { }

  ngOnInit() {
  }
}
