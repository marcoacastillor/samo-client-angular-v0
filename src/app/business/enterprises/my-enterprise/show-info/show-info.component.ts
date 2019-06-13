import { Component, OnInit } from '@angular/core';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { User } from 'src/app/shared/models/user';
import { PersonService } from 'src/app/shared/services/person.service';
import { Person } from 'src/app/shared/models/person';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { PositionService } from 'src/app/shared/services/position.service';
import { Position } from 'src/app/shared/models/position';

@Component({
  selector: 'app-show-info',
  templateUrl: 'show-info.component.html',
  styles: []
})
export class ShowInfoComponent implements OnInit {
  enterprise: Enterprise = new Enterprise();
  employeesList: Person[] = [];
  positionsList: Position[] = [];

  user: User = new User();

  constructor(
    private enterpriseService:EnterpriseService,
    private personService:PersonService,
    private globalStoreService: GlobalStoreService,
    private positionService: PositionService
  ) { }

  ngOnInit() {
    this.user = this.globalStoreService.getUser();
    this.getInfoEnterprise();
    this.getEmployees();
    this.getPositions();
  }

  getInfoEnterprise(){
    this.enterpriseService.getInfoEnterprise$().subscribe(
      enterprise => this.enterprise = enterprise
    )
  }

  getEmployees(){
    this.personService.getEmployeesByEnterprise$(this.user.fk_id_enterprise).subscribe(
      employees => this.employeesList = employees
    )
  }

  getPositions(){
    this.positionService.getByEnterpsie$(this.user.fk_id_enterprise).subscribe(
      positions => this.positionsList = positions
    );
  }
}
