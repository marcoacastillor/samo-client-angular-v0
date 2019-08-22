import { Component, OnInit, Input, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { Module } from 'src/app/shared/models/module';
import { ComponentService } from 'src/app/shared/services/component.service';
import { MComponent } from 'src/app/shared/models/m-component';
import { tap } from 'rxjs/operators';
import { faArrowAltCircleRight, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { VisualizationRolService } from 'src/app/shared/services/visualization-rol.service';

@Component({
  selector: 'app-component-form-modal',
  templateUrl: 'component-form-modal.component.html',
  styles: []
})
export class ComponentFormModalComponent implements OnInit {
  faArrowAltCircleRight = faArrowAltCircleRight;
  faArrowAltCircleLeft = faArrowAltCircleLeft;

  @Input() public lstAllModules: Module[];
  @Input() public pk_id_rol: number;

  @Output() public refresh = new EventEmitter<number>();

  lstComponents: MComponent[] = [];
  lstSelectedComponents: MComponent[] = [];

  constructor(
    private componentService:ComponentService,
    private visualizationRolService: VisualizationRolService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.lstAllModules)
    {
      if(changes.lstAllModules.currentValue != changes.lstAllModules.previousValue)
      {
        this.lstAllModules = changes.lstAllModules.currentValue;
      }
    }
  }

  public loadComponentsByModule(id_module: string){
    if(id_module != ''){
      this.componentService.getComponentsByModuleAndRol$(parseInt(id_module),this.pk_id_rol).pipe(
        tap((lst_components:MComponent[]) => this.lstSelectedComponents = lst_components)
      ).subscribe();

      this.componentService.getNotComponentsByModuleAndRol$(parseInt(id_module),this.pk_id_rol).pipe(
        tap((lst_components:MComponent[]) => this.lstComponents = lst_components)
      ).subscribe()
    }
  }

  public addComponent(component:MComponent){
    this.visualizationRolService.create$(component.fk_id_module,component.pk_id_component,this.pk_id_rol).subscribe(
      () => {
        this.loadComponentsByModule(component.fk_id_module.toString());
        this.refresh.emit(this.pk_id_rol);
      }
    )
  }

  public delComponent(id:number){
    this.visualizationRolService.delete$(id).subscribe(
      visualization => {
        this.loadComponentsByModule(visualization.fk_id_module.toString());
        this.refresh.emit(this.pk_id_rol);
      }
    )
  }
  
}
