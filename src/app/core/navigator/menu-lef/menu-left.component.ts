import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { StatusMessage } from 'src/app/shared/models/status-message';

@Component({
  selector: 'app-menu-lef',
  templateUrl: 'menu-left.component.html',
  styles: []
})
export class MenuLeftComponent implements OnInit {
  @Input() public user: User;
  @Input() public message: StatusMessage;
  
  constructor() { }

  ngOnInit() {
  }

  troggleSideBar(){
    const nameInput = document.getElementById('sidebar') as HTMLInputElement;
    if(nameInput.className == 'active'){
      nameInput.className = 'none';
    }else{
      nameInput.className = 'active';
    }
  }
}
