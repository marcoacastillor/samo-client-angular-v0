import { Component, OnInit } from '@angular/core';
import { TypeService } from 'src/app/shared/models/type-service';
import { TypeServiceService } from 'src/app/shared/services/type-service.service';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { Parameter } from 'src/app/shared/models/parameter';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { environment } from 'src/environments/environment';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-admin-type-service',
  templateUrl: 'admin-type-service.component.html',
  styles: []
})
export class AdminTypeServiceComponent implements OnInit {
  showTypeService: boolean = false;
  listTypeService: boolean = true;
  newTypeService: boolean = false;

  typeServiceList: TypeService[] = [];
  typeService: TypeService = new TypeService;

  modeServiceList: Parameter[] = [];
  typesServiceList: Parameter[] = [];
  sizesEnterpriseList: Parameter[] = [];
  
  constructor(
    private typeServiceService: TypeServiceService,
    private globalStoreService: GlobalStoreService,
    private parametersService: ParameterService,
    private utilService: UtilsService

  ) { }

  ngOnInit() {
    this.getAllTypesServices();
    this.getModeServiceList();
    this.getTypesServiceList();
    this.getSizesEnterpriseList();
  }

  public getModeServiceList(){
    this.parametersService.getByCodeCategory$(environment.mode_service).subscribe(
      lstModeTypes => this.modeServiceList = lstModeTypes
    )
  }

  public getTypesServiceList(){
    this.parametersService.getByCodeCategory$(environment.type_service).subscribe(
      lstTypes => this.typesServiceList = lstTypes
    )
  }

  public getSizesEnterpriseList(){
    this.parametersService.getByCodeCategory$(environment.size_enterprise).subscribe(
      lstSizesEnterprise => this.sizesEnterpriseList = lstSizesEnterprise
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
    this.listTypeService = false;
    this.newTypeService = true;
  }

  public onCancel(show: boolean){
    this.listTypeService = show;
    this.newTypeService = false;
    this.showTypeService = false;
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

  /*
  * ------------------------------------------
  * Funciones visualización
  * ------------------------------------------
  */
 public getClassNew() {
  return this.utilService.getClassNew(this.newTypeService);
  }

  public getClassList() {
    return this.utilService.getClassList(this.listTypeService);
  }

  public getClassShow() {
    return this.utilService.getClassShow(this.showTypeService);
  }
}
