import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { environment } from 'src/environments/environment';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { Parameter } from 'src/app/shared/models/parameter';

@Component({
  selector: 'app-new-enterprise',
  templateUrl: 'new-enterprise.component.html',
  styles: []
})
export class NewEnterpriseComponent implements OnInit {
  enterpriseForm: FormGroup;
  typeEnterpriseList: Parameter[] = [];
  
  @Output() public create = new EventEmitter<Enterprise>();

  constructor(
    private fb: FormBuilder,
    private formToolService: FormToolsService,
    private paramsService: ParameterService
  ) { }

  ngOnInit() {
    this.initUpdForm();
    this.loadTypeEnterprise();
  }

  private loadTypeEnterprise(){
    this.paramsService.getByCodeCategory$(environment.type_enterprise).subscribe(
      typeEnterprise => this.typeEnterpriseList = typeEnterprise
    );
  }

  /*
  * ------------------------------------------
  * Funciones propias del controlador
  * ------------------------------------------
  */
 private initUpdForm() {
  this.enterpriseForm = this.fb.group({
    pk_id_enterprise: [''], 
    type: [environment.enterprise_provider,Validators.required],
    nit: ['', Validators.required],
    name: ['',Validators.required],
    address: ['',Validators.required],
    phone: ['',Validators.required],
    ubication_city: ['',Validators.required],
   });
 }

 /**
   *  Funciones de creación y actualización
   */
  public createEnterprise(){
    this.create.emit(this.enterpriseForm.value);
    //this.initUpdForm();
  }

  /**
   * Funciones para verificar si los formularios son obligatorios o no.
   */

  public getErrors(controlName: string): any {
    return this.formToolService.getErrors(this.enterpriseForm, controlName);
  }

  public mustShowError(controlName: string) {
    return this.formToolService.mustShowError(this.enterpriseForm, controlName);
  }

  public hasError(controlName: string, errorCode: string): any {
    return this.formToolService.hasError(this.enterpriseForm, controlName, errorCode);
  }

}
