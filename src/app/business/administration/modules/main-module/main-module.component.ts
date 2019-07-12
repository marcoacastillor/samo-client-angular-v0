import { Component, OnInit } from '@angular/core';
import { Module } from 'src/app/shared/models/module';
import { ModuleService } from 'src/app/shared/services/module.service';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { tap } from 'rxjs/operators';
import { MComponent } from 'src/app/shared/models/m-component';
import { ComponentService } from 'src/app/shared/services/component.service';
import { Option } from 'src/app/shared/models/option';
import { OptionService } from 'src/app/shared/services/option.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-main-module',
  templateUrl: 'main-module.component.html',
  styles: []
})
export class MainModuleComponent implements OnInit {
  public moduleList: Module[] = [];
  
  public module: Module = new Module;
  public cmp: MComponent = new MComponent;

  public showModule = false;
  public newModule = false;
  public listModule = true;
  
  constructor(
    private globalStoreService: GlobalStoreService,
    private moduleService: ModuleService,
    private compService: ComponentService,
    private utilService: UtilsService
  ){}

  ngOnInit() { 
    this.loadAllModules();
  }
  /*
  * funciones para Componente
  */

  public onGetComponent(id_component: number){
    this.compService.show$(id_component).subscribe(
      comp => this.cmp = comp
    )
  }

  public onLoadComponent(id: number){
    this.compService.show$(id).pipe(
      tap(this.loadComponent),
    ).subscribe(
      this.onSuccess,
      this.onError);
  }

  private loadComponent = (cmp: MComponent): void => {
    this.cmp = cmp;
  }

  public onCreateComp(comp: MComponent){
    this.compService.store$(comp).subscribe(
      comp => 
      {
        this.onShow(comp.fk_id_module);
      },
      this.onError);
  }

  public onUpdateComp(comp: MComponent){
    this.compService.update$(comp).subscribe(
      comp => 
      {
        this.onShow(comp.fk_id_module);
      },
      this.onError);
  }
  
  public onDeleteComp(comp: MComponent){
    this.compService.delete$(comp.pk_id_component).subscribe(
      comp => 
      {
        this.onShow(comp.fk_id_module);
      },
      this.onError);
  }

  public onAsignOption(options_component: any){
    this.compService.addOptionsByComponent$(options_component).subscribe(
      comp => {
        this.cmp = comp
      }
    )
  }

  public onCancel(event: boolean){
    this.newModule = false;
    this.listModule = event;
    this.showModule = false;
  }

  /*
  * Funciones para Modulos
  */

  private loadAllModules(){
    this.moduleService.getAll$().subscribe(
      modules => this.moduleList = modules
    );
  }

  public onShow(id:number) {
    this.moduleService.show$(id).pipe(
      tap(this.loadModule),
    ).subscribe(this.onSuccess, this.onError);
    this.showModule = true;
    this.newModule = false;
    this.listModule = false;
  }

  private loadModule = (module: Module): void => {
    this.module = module;
  }

  public onCreate(module: Module) {
    this.moduleService.store$(module).subscribe(this.onSuccess, this.onError);
    this.module = new Module;
  }

  public onUpdate(module: Module) {
    this.moduleService.update$(module).subscribe(this.onSuccess, this.onError);
    this.module = new Module;
  }

  public onNew(module: Module) {
    if(module.pk_id_module)
    {
      this.onShow(module.pk_id_module);
    }
    else
    {
      this.module = module;
    }
    this.showModule = false;
    this.listModule = false;
    this.newModule = true;
  }

  public onDelete(id: number) {
    this.moduleService.delete$(id).subscribe(this.onSuccess, this.onError);
    this.module = new Module;
    this.showModule = false;
  }

  /*
  * ------------------------------------------
  * Funciones validación de resultado
  * ------------------------------------------
  */
  private onSuccess = () => {
    this.globalStoreService.dispatchUserMessage('200', ' Se ejecutó exitosamente, la operación ');
    this.loadAllModules();
  }

  private onError = (error: any) => {
    this.globalStoreService.dispatchUserMessage(error.status, error.statusText + ' : ' + error.error.error);
  }

  /*
  * ------------------------------------------
  * Funciones visualización
  * ------------------------------------------
  */
 public getClassNew() {
  return this.utilService.getClassNew(this.newModule);
  }

  public getClassList() {
    return this.utilService.getClassList(this.listModule);
  }

  public getClassShow() {
    return this.utilService.getClassShow(this.showModule);
  }

}