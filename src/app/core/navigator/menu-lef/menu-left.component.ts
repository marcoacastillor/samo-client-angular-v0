import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { StatusMessage } from 'src/app/shared/models/status-message';
import { faSignOutAlt, faTasks, faFileInvoiceDollar, faSync } from '@fortawesome/free-solid-svg-icons';
import { GlobalStoreService } from '../../services/global-store.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu-lef',
  templateUrl: 'menu-left.component.html',
  styleUrls: ['menu-left.component.css']
})
export class MenuLeftComponent implements OnInit {
  @Input() public user: User;
  @Input() public message: StatusMessage;

  faSignOutAlt = faSignOutAlt;
  faTasks = faTasks;
  faFileInvoiceDollar = faFileInvoiceDollar;
  faSync = faSync;

  statusSales = '';
  statusUsers = '';

  url_storage = environment.url_sales_storage;
  
  constructor(
    private globalStore: GlobalStoreService,
    private router: Router,
    private authService: AuthenticationService
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

  //Ruta que actualiza sistema de usuarios
  updateAppsUser(){
    this.authService.refreshUsers().subscribe(
      () => this.statusUsers = 'actualizado'
    );

  }
  //Ruta que actualiza sistema de ventas
  updateAppsSales(){
    this.authService.refreshSales().subscribe(
      () => this.statusSales = 'actualizado'
    );
  }

}
