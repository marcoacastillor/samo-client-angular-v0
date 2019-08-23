import { Component, OnInit } from '@angular/core';
import { Rol } from 'src/app/shared/models/rol';
import { ActivatedRoute } from '@angular/router';
import { RolService } from 'src/app/shared/services/rol.service';
import { ModuleService } from 'src/app/shared/services/module.service';
import { tap } from 'rxjs/operators';
import { Module } from 'src/app/shared/models/module';
import { faThList, faCartArrowDown, faPlus, faFolderOpen, faTasks, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { OptionService } from 'src/app/shared/services/option.service';
import { Option } from 'src/app/shared/models/option';
import { VisualizationRolService } from 'src/app/shared/services/visualization-rol.service';
import { OptionRolService } from 'src/app/shared/services/option-rol.service';

@Component({
  selector: 'app-rols-show',
  templateUrl: 'rols-show.component.html',
  styles: []
})
export class RolsShowComponent implements OnInit {
  faThList = faThList;
  faFolderOpen = faFolderOpen;
  faTasks = faTasks;
  faPlus = faPlus;
  faArrowAltCircleLeft = faArrowAltCircleLeft;

  success = false;
  message = '';
  
  id_rol = 0;
  rol:Rol = new Rol;
  lstModules: Module[] = [];
  lstOptions: Option[] = [];
  lstAllModules: Module[] = [];
  lstAllObjects: Option[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private rolService: RolService,
    private moduleService: ModuleService,
    private optionService: OptionService,
    private visualizationRolService: VisualizationRolService,
    private optionRolService: OptionRolService
  ) { }

  ngOnInit() {
    let id = this.activateRoute.snapshot.params['id'];
    this.id_rol = id;
    this.getDetailById(id);
  }

  public getAllModels(){
    this.moduleService.getAll$().subscribe(
      lst_modules => this.lstAllModules = lst_modules
    )
  }

  public getAllObjects(){
    this.optionService.getBusinessObject$().subscribe(
      lst_options => this.lstAllObjects = lst_options
    )
  }

  private getDetailById(id:number){
    this.rolService.show$(id).pipe(
      tap((rol:Rol) => this.rol = rol ),
      tap((rol:Rol) => this.getVisualizationByRol(rol.pk_id_rol)),
      tap((rol:Rol) => this.getOptionsByRol(rol.pk_id_rol))
    ).subscribe()
  }

  private getVisualizationByRol(id:number){
    this.moduleService.getModulesByRol$(id.toString()).subscribe(
      modules => this.lstModules = modules
    )
  }

  private getOptionsByRol(id:number){
    this.optionService.getByRol$(id).subscribe(
      lst_options => this.lstOptions = lst_options
    )
  }

  public onRefresh(id_rol:number){
    this.getVisualizationByRol(id_rol);
  }

  public onRefreshOptions(id_rol:number){
    this.getOptionsByRol(id_rol);
  }

  public delComponent(id:number){
    this.visualizationRolService.delete$(id).subscribe(
      visualization => {
        this.getVisualizationByRol(visualization.fk_id_rol);
      }
    )
  }
}
