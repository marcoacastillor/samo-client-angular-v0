import { Component, OnInit } from '@angular/core';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { Results } from 'src/app/shared/models/results';
import { Parameter } from 'src/app/shared/models/parameter';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-provider',
  templateUrl: 'admin-provider.component.html',
  styles: []
})
export class AdminProviderComponent implements OnInit {
  public showRegistry: boolean = false;
  
  public actualPg: number = 0;
  public regPerPg: number = 5;
  
  public registry: Enterprise = new Enterprise();
  public registryList: Results = new Results();
  
  constructor(
    private enterpriseService: EnterpriseService,
    private globalStoreService: GlobalStoreService
  ) { }

  ngOnInit() {
    this.loadAllRegistries();
    this.loadDataByUser();
  }

  private loadDataByUser(){
    let user = this.globalStoreService.getUser();
    this.registry.external_reference  = 'E:'+user.fk_id_enterprise;
    this.registry.type                = environment.enterprise_provider;
  }

  private loadAllRegistries(){
    this.enterpriseService.getAllByType$(environment.enterprise_provider).pipe(
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

  public onUpdate(registry: Enterprise){
    this.enterpriseService.update$(registry).subscribe(
      () => this.loadAllRegistries()
    );
  }

  public onCreate(registry: Enterprise){
    this.showRegistry = false;
    this.registry = registry;
  }

  public onSelect(id:number){
    this.showRegistry = true;
    this.enterpriseService.show$(id).pipe(
     tap(this.loadRegistry) 
    ).subscribe(this.onSuccess,this.onError)
  }

  public onSelectUpd(registry: Enterprise){
    this.showRegistry = false;
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

}
