import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Module } from 'src/app/shared/models/module';
import { MComponent } from 'src/app/shared/models/m-component';
import { faTrashAlt, faEdit, faPlusCircle, faAirFreshener } from '@fortawesome/free-solid-svg-icons';
import { Option } from 'src/app/shared/models/option';
import { environment } from 'src/environments/environment';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-show-module',
  templateUrl:'show-module.component.html',
  styles: []
})
export class ShowModuleComponent implements OnInit, OnChanges {
  public url_storage:string = environment.url_storage;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  faPlusCircle = faPlusCircle;
  faAirFreshener = faAirFreshener

  @Input() public module: Module;
  @Input() public cmp: MComponent = new MComponent;
  @Output() public onCreateComp = new EventEmitter<MComponent>();
  @Output() public asignOption = new EventEmitter<any>();
  
  @Output() public onGetComponent = new EventEmitter<number>();
  @Output() public onUpdateComp = new EventEmitter<MComponent>();
  @Output() public onDeleteComp = new EventEmitter<MComponent>();
  @Output() public onNewComp = new EventEmitter<MComponent>();

  public opt: Option = new Option;
  
  constructor(
    private utilService: UtilsService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.cmp)
    {
      if(changes.cmp.currentValue != changes.cmp.previousValue)
      { 
        this.cmp =  changes.cmp.currentValue;
      }
    }
  }

  public createCmp(cmp: MComponent){
    cmp.fk_id_module = this.module.pk_id_module;
    this.onCreateComp.emit(cmp);
  }

  public updateCmp(cmp: MComponent){
    this.onUpdateComp.emit(cmp);
  }

  public deleteCmp(cmp: MComponent){
    this.onDeleteComp.emit(cmp);
  }

  /*
  Actualizar y crear componentes
  */
  public newCmp(){
    let cmp:MComponent = new MComponent;
    this.cmp = cmp;
  }

  public addCmp()
  {
    this.cmp = new MComponent;
  }

  public getInfoComponent(pk_id_component){
    this.onGetComponent.emit(pk_id_component);
  }

  /*
  Actualizar y crear opciones
  */
 
  public updOpt(opt:Option){
    this.opt = opt;
  }

  public newOpt(id_component: number){
    let opt:Option = new Option;
    opt.fk_id_component = id_component;
    this.opt = opt;
  }

  public onAsignOption(option_component: any){
    this.asignOption.emit(option_component)
  }
}