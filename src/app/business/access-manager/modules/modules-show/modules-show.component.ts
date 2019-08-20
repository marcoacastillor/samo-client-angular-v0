import { Component, OnInit } from '@angular/core';
import { faThList, faCartArrowDown, faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { ModuleService } from 'src/app/shared/services/module.service';
import { Module } from 'src/app/shared/models/module';
import { MComponent } from 'src/app/shared/models/m-component';
import { tap } from 'rxjs/operators';
import { ComponentService } from 'src/app/shared/services/component.service';

@Component({
  selector: 'app-modules-show',
  templateUrl: 'module-show.component.html',
  styles: []
})
export class ModulesShowComponent implements OnInit {
  faThList = faThList;
  faCartArrowDown = faCartArrowDown;
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;

  success = false;
  message = '';
  
  module: Module = new Module;
  lstComponent: MComponent[] = [];
  selectedComponet: MComponent = new MComponent;

  id_module = 0;

  constructor(
    private activateRoute: ActivatedRoute,
    private moduleService: ModuleService,
    private componenteService: ComponentService
  ) { }

  ngOnInit() {
    let id = this.activateRoute.snapshot.params['id'];
    this.id_module = id;
    this.getModuleById(id);
  }

  private getModuleById(id:number){
    this.moduleService.show$(id).pipe(
      tap((module:Module) => this.module = module ),
      tap((module:Module) => this.getComponentsByModule(module.pk_id_module)),
    ).subscribe()
  }

  private getComponentsByModule(id:number){
    this.componenteService.getComponentsByModule$(id).subscribe(
      lst_components => this.lstComponent = lst_components
    )
  }

  public newComponent(){
    this.selectedComponet = new MComponent;
    this.selectedComponet.fk_id_module = this.module.pk_id_module
  }

  public selectComponent(component:MComponent){
    this.selectedComponet = component
  }

  public onCreateComponent(component:MComponent){
    this.componenteService.store$(component).subscribe(
      component => {
        this.getComponentsByModule(component.fk_id_module);
        this.success = true;
        this.message = 'Se creó componente satisfactoriamente.';
      }
    )
  }

  public onUpdateComponent(component:MComponent){
    this.componenteService.update$(component).subscribe(
      component => {
        this.getComponentsByModule(component.fk_id_module);
        this.success = true;
        this.message = 'Se actualizó componente satisfactoriamente.';
      }
    )
  }

  public deleteComponent(){
    this.componenteService.delete$(this.selectedComponet.pk_id_component).subscribe(
      component => {
        this.getComponentsByModule(component.fk_id_module);
        this.success = true;
        this.message = 'Se eliminó componente satisfactoriamente.';
      }
    )
  }

}


