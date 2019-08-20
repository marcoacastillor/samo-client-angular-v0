import { Component, OnInit } from '@angular/core';
import { faPlusCircle, faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Module } from 'src/app/shared/models/module';
import { ModuleService } from 'src/app/shared/services/module.service';

@Component({
  selector: 'app-modules-list',
  templateUrl: 'module-list.component.html',
  styles: []
})
export class ModulesListComponent implements OnInit {
  faPlusCircle = faPlusCircle;
  faEye = faEye;
  faEdit = faEdit;
  faTrash = faTrash;

  lstModules: Module[] = [];
  selectedModule: Module = new Module;

  success = false;
  message = '';

  constructor(
    private moduleService: ModuleService
    ) { }

  ngOnInit() {
    this.loadAllModules();
  }

  private loadAllModules(){
    this.moduleService.getAll$().subscribe(
      modules => this.lstModules = modules
    )
  }

  public newModule(){
    this.selectedModule = new Module;
  }

  public selectModule(module:Module){
    this.selectedModule = module;
  }

  public deleteModule(){
    this.moduleService.delete$(this.selectedModule.pk_id_module).subscribe(
      () => {
        this.loadAllModules();
        this.success = true;
        this.message = 'Se elimina registro satisfactoriamente.';
      }
    )
  }

  public onCreate(module:Module){
    this.moduleService.store$(module).subscribe(
      () => {
        this.loadAllModules();
        this.success = true;
        this.message = 'Se crea registro satisfactoriamente.';
      }
    )
  }

  public onUpdate(module:Module){
    this.moduleService.update$(module).subscribe(
      () => {
        this.loadAllModules();
        this.success = true;
        this.message = 'Se actualiza registro satisfactoriamente.';
      }
    )
  }

}
