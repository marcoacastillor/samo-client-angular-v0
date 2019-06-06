import { Component, OnInit } from '@angular/core';
import { TypeService } from 'src/app/shared/models/type-service';
import { TypeServiceService } from 'src/app/shared/services/type-service.service';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { Parameter } from 'src/app/shared/models/parameter';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-type-service',
  templateUrl: 'admin-type-service.component.html',
  styles: []
})
export class AdminTypeServiceComponent implements OnInit {
  showTypeService: boolean = false;
  typeServiceList: TypeService[] = [];
  typeService: TypeService = new TypeService;

  modeServiceList: Parameter[] = [];
  
  constructor(
    private typeServiceService: TypeServiceService,
    private globalStoreService: GlobalStoreService,
    private parametersService: ParameterService

  ) { }

  ngOnInit() {
    this.getAllTypesServices();
    this.getModeServiceList();
  }

  public getModeServiceList(){
    this.parametersService.getByCodeCategory$(environment.mode_service).subscribe(
      lstModeTypes => this.modeServiceList = lstModeTypes
    )
  }

  public getAllTypesServices(){
    this.typeServiceService.getAll$().subscribe(
      lstTypes => this.typeServiceList = lstTypes
    )
  }

  public onCreate(typeService: TypeService){
    this.typeServiceService.store$(typeService).subscribe(this.onSuccess, this.onError);
  }

  public onUpdate(typeService: TypeService){
    this.typeServiceService.update$(typeService).subscribe(this.onSuccess, this.onError);
  }

  public onDelete(id: number){
    this.typeServiceService.delete$(id).subscribe(this.onSuccess, this.onError);
  }

  public onLoad(typeService: TypeService){
    this.typeService = typeService;
  }



  /*
  * ------------------------------------------
  * Funciones validación de resultado
  * ------------------------------------------
  */
  private onSuccess = () => {
  this.globalStoreService.dispatchUserMessage('200', ' Se ejecutó exitosamente, la operación ');
    this.getAllTypesServices();
  }

  private onError = (error: any) => {
    this.globalStoreService.dispatchUserMessage(error.status, error.statusText + ' : ' + error.error.error);
  }
}
