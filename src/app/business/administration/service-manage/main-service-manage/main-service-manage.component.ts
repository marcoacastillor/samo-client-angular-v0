import { Component, OnInit } from '@angular/core';
import { ServiceEnterprise } from 'src/app/shared/models/service-enterprise';
import { ServiceEnterpriseService } from 'src/app/shared/services/service-enterprise.service';

@Component({
  selector: 'app-main-service-manage',
  templateUrl: 'main-service-manage.component.html',
  styles: []
})
export class MainServiceManageComponent implements OnInit {
  public showService: boolean = false;
  public serviceEnterpriseList: ServiceEnterprise[] = [];

  constructor(
    private serviceEnterpriseService: ServiceEnterpriseService
  ) { }

  ngOnInit() {
    this.serviceEnterpriseService.getAll$().subscribe(
      serviceList => this.serviceEnterpriseList = serviceList
    );
  }

}
