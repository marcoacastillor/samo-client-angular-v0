import { Component, OnInit } from '@angular/core';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { Results } from 'src/app/shared/models/results';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { Position } from 'src/app/shared/models/position';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { Parameter } from 'src/app/shared/models/parameter';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-admin-owner',
  templateUrl:'admin-owner.component.html',
  styles: []
})
export class AdminOwnerComponent implements OnInit {
  public showRegistry: boolean = false;
  public newRegistry: boolean = false;
  public listRegistry: boolean = true;
  
  public registry: Enterprise = new Enterprise();
  public registryList: Enterprise[] = [];
  public sizesList: Parameter[] = [];

  constructor(
    private enterpriseService: EnterpriseService,
    private globalStoreService: GlobalStoreService,
    private parameterService: ParameterService,
    private utilService: UtilsService
  ) { }

  ngOnInit() {
    this.loadAllRegistries();
    this.loadDataByUser();
    this.loadSizesEnterprises();
  }

  private loadSizesEnterprises(){
    this.parameterService.getByCodeCategory$(environment.size_enterprise).subscribe(
      sizes => this.sizesList = sizes
    );
  }

  private loadDataByUser(){
    //let user = this.globalStoreService.getUser();
    this.registry.type                = environment.enterprise_owner;
  }

  private loadAllRegistries(){
    this.enterpriseService.getAllByType$(environment.enterprise_owner).pipe(
      tap(this.loadRegistries)
    ).subscribe(this.onSuccess, this.onError)
  }

  private loadRegistries = (result: any): void => {
    this.registryList = result;
  }

  public onStore(registry: Enterprise){
    this.enterpriseService.store$(registry).subscribe(
      () => this.loadAllRegistries()
    );
  }

  public onCancel(show: boolean){
    this.listRegistry = show;
    this.newRegistry = false;
    this.showRegistry = false;
  }

  public onUpdate(registry: Enterprise){
    this.enterpriseService.update$(registry).subscribe(
      () => this.loadAllRegistries()
    );
  }

  public onCreate(registry: Enterprise){
    this.showRegistry = false;
    this.newRegistry = true;
    this.listRegistry = false;

    this.registry = registry;
  }

  public onSelect(id:number){
    this.showRegistry = true;
    this.newRegistry = false;
    this.listRegistry = false;

    this.enterpriseService.show$(id).pipe(
     tap(this.loadRegistry) 
    ).subscribe(this.onSuccess,this.onError)
  }

  public onSelectUpd(registry: Enterprise){
    this.showRegistry = false;
    this.newRegistry = true;
    this.listRegistry = false;

    this.registry = registry;
  }

  private loadRegistry = (registry:Enterprise): void => {
    this.registry = registry;
  }

  /*
  * ------------------------------------------
  * Funciones validación de resultado
  * ------------------------------------------
  */
  private onSuccess = () => {
    this.globalStoreService.dispatchUserMessage('200', ' Se ejecutó exitosamente, la operación ');
  }

  private onError = (error: any) => {
    this.globalStoreService.dispatchUserMessage(error.status, error.statusText + ' : ' + error.error);
  }

  /*
  * ------------------------------------------
  * Funciones visualización
  * ------------------------------------------
  */
 public getClassNew() {
  return this.utilService.getClassNew(this.newRegistry);
}

public getClassList() {
  return this.utilService.getClassList(this.listRegistry);
}

public getClassShow() {
  return this.utilService.getClassShow(this.showRegistry);
}

}
