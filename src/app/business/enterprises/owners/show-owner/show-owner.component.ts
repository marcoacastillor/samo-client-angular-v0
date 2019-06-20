import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { Position } from 'src/app/shared/models/position';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { PositionService } from 'src/app/shared/services/position.service';

@Component({
  selector: 'app-show-owner',
  templateUrl: 'show-owner.component.html',
  styles: []
})
export class ShowOwnerComponent implements OnInit, OnChanges {
  @Input() public registry: Enterprise;
  @Input() public positionsList: Position[];

  position: Position = new Position;

  constructor(
    private globalStoreService: GlobalStoreService,
    private positionService: PositionService
  ) { }

  ngOnInit() {
  }


  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.registry)
    {
      if(changes.registry.currentValue != changes.registry.previousValue)
      {
        this.getPositionByEnterprise(this.registry.pk_id_enterprise);
        this.registry = changes.registry.currentValue;
      }
    }
  }

  public getPositionByEnterprise(id: number){
    this.positionService.getByEnterpsie$(id).subscribe(
      lstPositions => this.positionsList = lstPositions
    );
  }

  public onCreate(position: Position){
    this.positionService.store$(position).subscribe(this.onSuccess, this.onError);
  }

  public onUpdate(position: Position){
    this.positionService.update$(position).subscribe(this.onSuccess, this.onError);
  }

  public onDelete(id: number){
    this.positionService.delete$(id).subscribe(this.onSuccess, this.onError);
  }

  public onSelect(position: Position){
    this.position = position;
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
