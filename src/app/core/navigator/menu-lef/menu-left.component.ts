import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { StatusMessage } from 'src/app/shared/models/status-message';
import { faSignOutAlt, faTasks, faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';
import { GlobalStoreService } from '../../services/global-store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-lef',
  templateUrl: 'menu-left.component.html',
  styles: []
})
export class MenuLeftComponent implements OnInit {
  @Input() public user: User;
  @Input() public message: StatusMessage;

  faSignOutAlt = faSignOutAlt;
  faTasks = faTasks;
  faFileInvoiceDollar = faFileInvoiceDollar;
  
  constructor(
    private globalStore: GlobalStoreService,
    private router: Router,
  ) { }

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

  logout(){
    this.globalStore.clearSession();
    this.router.navigateByUrl('/');
  }
}
