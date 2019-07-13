import { Component, OnInit, Input, SimpleChanges, OnChanges, EventEmitter, Output } from '@angular/core';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { Position } from 'src/app/shared/models/position';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { PositionService } from 'src/app/shared/services/position.service';
import { faThList, faDiagnoses, faCogs, faPlus, faEdit, faArchway } from '@fortawesome/free-solid-svg-icons';
import { Parameter } from 'src/app/shared/models/parameter';
import { ParameterConfig } from 'src/app/shared/models/parameter-config';
import { ParameterConfigService } from 'src/app/shared/services/parameter-config.service';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-show-owner',
  templateUrl: 'show-owner.component.html',
  styles: []
})
export class ShowOwnerComponent implements OnInit, OnChanges {
  faThList = faThList;
  faDiagnoses = faDiagnoses;
  faCogs = faCogs;
  faPlus = faPlus;
  faEdit = faEdit;
  faArchway = faArchway;

  positionsList: Position[];
  parametersList: ParameterConfig[];

  position: Position = new Position;
  parameter: ParameterConfig = new ParameterConfig;

  @Input() public registry: Enterprise;
  @Output() public cancel = new EventEmitter<boolean>();
  @Output() public update = new EventEmitter<Enterprise>();

  constructor(
    private globalStoreService: GlobalStoreService,
    private positionService: PositionService,
    private parameterConfigService: ParameterConfigService
  ) { }

  ngOnInit() {
    this.getPositionByEnterprise(this.registry.pk_id_enterprise);
    this.getParamteresByEnterprise(this.registry.pk_id_enterprise);
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.registry)
    {
      if(changes.registry.currentValue != changes.registry.previousValue)
      {
        this.getPositionByEnterprise(this.registry.pk_id_enterprise);
        this.getParamteresByEnterprise(this.registry.pk_id_enterprise);
        this.registry = changes.registry.currentValue;
      }
    }
  }

  updateRegistry(registry: Enterprise)
  {
    this.update.emit(registry);
  }

  private getParamteresByEnterprise(id: number){
    this.parameterConfigService.getByEnterprise$(id).subscribe(
      lstParameters => this.parametersList = lstParameters
    )
  }

  private getPositionByEnterprise(id: number){
    this.positionService.getByEnterpsie$(id).subscribe(
      lstPositions => this.positionsList = lstPositions
    );
  }

  /** funciones para cargos */
  public onCreatePosition(position: Position){
    this.positionService.store$(position).subscribe(
      () => this.getPositionByEnterprise(this.registry.pk_id_enterprise)
    );
  }

  public onUpdatePosition(position: Position){
    this.positionService.update$(position).subscribe(
      () => this.getPositionByEnterprise(this.registry.pk_id_enterprise)
    );
  }

  public onDeletePosition(id: number){
    this.positionService.delete$(id).subscribe(
      () => this.getPositionByEnterprise(this.registry.pk_id_enterprise)
    );
  }

  public onSelectPosition(position: Position){
    this.position = position;
  }
  /** fin funciones para cargos */



  public onCreateParameter(parameter: ParameterConfig){

    this.parameterConfigService.store$(parameter).subscribe(
      () => this.getParamteresByEnterprise(parameter.fk_id_enterprise)
    );
  }

  public onUpdateParameter(parameter: ParameterConfig){
    this.parameterConfigService.update$(parameter).subscribe(
      () => this.getParamteresByEnterprise(parameter.fk_id_enterprise)
    );
  }

  public onDeleteParameter(id: number){
    this.parameterConfigService.delete$(id).subscribe(
      () => this.getParamteresByEnterprise(this.registry.pk_id_enterprise)
    );
  }

  public onSelectParameter(parameter: ParameterConfig){
    this.parameter = parameter;
  }

  public generateParameters(){
    this.parameterConfigService.createAllsParamsBytype$(environment.parameters_enterprises,this.registry.pk_id_enterprise).subscribe(
      () => this.getParamteresByEnterprise(this.registry.pk_id_enterprise)
    );
  }


  public cancelOwner()
  {
    this.cancel.emit(true);
  }

  /*
  * ------------------------------------------
  * Funciones validación de resultado
  * ------------------------------------------
  */
 private onSuccess = () => {
  this.globalStoreService.dispatchUserMessage('200', ' Se ejecutó exitosamente, la operación ');
    this.getPositionByEnterprise(this.registry.pk_id_enterprise);
  }

  private onError = (error: any) => {
    this.globalStoreService.dispatchUserMessage(error.status, error.statusText + ' : ' + error.error.error);
  }

}
