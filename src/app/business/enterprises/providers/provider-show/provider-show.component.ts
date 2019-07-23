import { Component, OnInit } from '@angular/core';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { ActivatedRoute } from '@angular/router';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { faThList, faEye } from '@fortawesome/free-solid-svg-icons';
import { Operation } from 'src/app/shared/models/operation';
import { OperationService } from 'src/app/shared/services/operation.service';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-provider-show',
  templateUrl:'provider-show.component.html',
  styles: []
})
export class ProviderShowComponent implements OnInit {
  faEye = faEye;
  faThList = faThList;
  
  id_enterprise: number;
  enterprise: Enterprise = new Enterprise;
  lstOperations: Operation[] = [];

  success = false;
  message = '';

  constructor(
    private activateRoute: ActivatedRoute,
    private enterpriseService:EnterpriseService,
    private operationService: OperationService
  ) { }

  ngOnInit() {
    this.id_enterprise = this.activateRoute.snapshot.params['id'];
    this.getInfo(this.id_enterprise);
  }

  private getInfo(id:number){
    this.enterpriseService.show$(id).pipe(
      tap((enterprise:Enterprise) => this.enterprise = enterprise),
      tap((enterprise:Enterprise) => {
        this.operationService.getOperationByProvider$(enterprise.pk_id_enterprise).subscribe(
          operations => this.lstOperations = operations
        )
      })
    ).subscribe()
  }

}
