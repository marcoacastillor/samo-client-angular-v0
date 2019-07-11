import { Component, OnInit } from '@angular/core';
import { Rol } from 'src/app/shared/models/rol';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { RolService } from 'src/app/shared/services/rol.service';
import { tap } from 'rxjs/operators';
import { ModuleService } from 'src/app/shared/services/module.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-main-rol',
  templateUrl: 'main-rol.component.html',
  styles: []
})
export class MainRolComponent implements OnInit {
  public rolList: Rol[] = [];
  public moduleList: any;
  public showRol = false;
  public newRol = false;
  public listRol = true;

  public rol: Rol = new Rol;
  
  constructor(
    private globalStoreService: GlobalStoreService,
    private rolService: RolService,
    private moduleService: ModuleService,
    private UtilService: UtilsService
  ) {
   }

  ngOnInit() { 
    this.loadRols();
    this.loadAllModulesByRol(null);
  }

  private loadRols() {
    this.rolService.getAll$().subscribe(
      rols => this.rolList = rols
    );
  }

  public onCreate(rol: Rol) {
    this.rolService.store$(rol).subscribe(this.onSuccess, this.onError);
    this.loadAllModulesByRol(null);
    this.rol = new Rol;
  }

  public onUpdate(rol: Rol) {
    this.rolService.update$(rol).subscribe(this.onSuccess, this.onError);
    this.loadAllModulesByRol(null);
    this.rol = new Rol;
  }

  public onDelete(id: number) {
    this.rolService.delete$(id).subscribe(this.onSuccess, this.onError);
    this.rol = new Rol;
    this.loadAllModulesByRol(null);
  }

  private loadAllModulesByRol(id_rol: number){
    this.moduleService.getAllDetailed$(id_rol).subscribe(
      modules => {
        this.moduleList = modules;
      }
    );
  }

  public onGetRol(id: number) {
    this.rolService.show$(id).subscribe(
      rol => this.rol = rol
    );
  }

  
  public onShow(id:number) {
    this.showRol = true;
    this.rolService.show$(id).pipe(
      tap(this.loadRol),
    ).subscribe(this.onSuccess, this.onError);
  }

  private loadRol = (rol: Rol): void => {
    this.rol = rol;
  }

  private getOptionRol(id_rol: number){
    this.rolService.getRolWithOptions$(id_rol).pipe(
      tap(this.loadRol),
    ).subscribe(this.onSuccess, this.onError);
  }



  public onNew(rol: Rol) {
    if(rol.pk_id_rol)
    {
      this.getOptionRol(rol.pk_id_rol);
      this.loadAllModulesByRol(rol.pk_id_rol);
    }
    else
    {
      this.rol = rol;
      this.loadAllModulesByRol(null);
    }
    this.showRol = false;
    this.listRol = false;
    this.newRol = true;
  }

  public onCancel(event: boolean) {
    this.showRol = false;
    this.newRol = false;
    this.listRol = event;
  }

  public onCancelShow(event: boolean) {
    this.showRol = false;
    this.listRol = event;
    this.newRol = false;
  }

  

  /*
  * ------------------------------------------
  * Funciones validación de resultado
  * ------------------------------------------
  */
  private onSuccess = () => {
  this.globalStoreService.dispatchUserMessage('200', ' Se ejecutó exitosamente, la operación ');
  this.loadRols();
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
    return this.UtilService.getClassNew(this.newRol);
  }

  public getClassList() {
    return this.UtilService.getClassList(this.listRol);
  }

  public getClassShow() {
    return this.UtilService.getClassShow(this.showRol);
  }

}
