import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { tap } from 'rxjs/operators';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { Person } from 'src/app/shared/models/person';
import { PersonService } from 'src/app/shared/services/person.service';
import { ParameterConfig } from 'src/app/shared/models/parameter-config';
import { ParameterConfigService } from 'src/app/shared/services/parameter-config.service';
import { PositionService } from 'src/app/shared/services/position.service';
import { Position } from 'src/app/shared/models/position';
import { faUserTag, faUserCheck, faCogs, faWrench, faEye, faEdit, faTrash, faIndustry } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-enterprise-show',
  templateUrl: 'enterprise-show.component.html',
  styles: []
})
export class EnterpriseShowComponent implements OnInit {
  faEye = faEye;
  faTrash= faTrash;
  faUserTag = faUserTag;
  faUserCheck = faUserCheck;
  faCogs = faCogs;
  faWrench = faWrench;
  faEdit = faEdit;
  faIndustry = faIndustry;

  user: User = new User;
  enterprise: Enterprise = new Enterprise;

  lstEmployee: Person[] = [];
  lstParametersConfig: ParameterConfig[] = [];
  lstPositions: Position[] = [];

  constructor(
    private globalStoreService: GlobalStoreService,
    private enterpriseService: EnterpriseService,
    private personService: PersonService,
    private parameterConfigService: ParameterConfigService,
    private positionService: PositionService
    ) { }

  ngOnInit() {
    this.user = this.globalStoreService.getUser();
    this.loadInfoByEnterprise(this.user.fk_id_enterprise);
  }

  private loadInfoByEnterprise(id_enterprise: number){
    this.enterpriseService.show$(id_enterprise).pipe(
      tap((enterprise: Enterprise) => { this.enterprise = enterprise}),
      tap((enterprise: Enterprise) => {
        this.personService.getActiveEmployeesByEnterprise$(enterprise.pk_id_enterprise).subscribe(
          persons => this.lstEmployee = persons
        )
      }),
      tap((enterprise:Enterprise) => {
        this.parameterConfigService.getByEnterprise$(enterprise.pk_id_enterprise).subscribe(
          parameters => this.lstParametersConfig = parameters
        )
      }),
      tap((enterprise:Enterprise) => {
        this.positionService.getByEnterpsie$(enterprise.pk_id_enterprise).subscribe(
          positions => this.lstPositions = positions
        )
      })
    ).subscribe()
  }
}
