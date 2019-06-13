import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Parameter } from 'src/app/shared/models/parameter';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { ParameterService } from 'src/app/shared/services/parameter.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-enterprise',
  templateUrl:'new-enterprise.component.html',
  styles: []
})
export class NewEnterpriseComponent implements OnInit {
  enterpriseForm: FormGroup;
  sizeList: Parameter[] = [];

  @Output() public create = new EventEmitter<Enterprise>();

  constructor(
    private fb: FormBuilder,
    private formToolService: FormToolsService,
    private paramsService: ParameterService
  ) { }

  ngOnInit() {
    this.initUpdForm();

  }

  getSizes(){
    this.paramsService.getByCodeCategory$(environment.size_enterprise).subscribe(
      sizes => this.sizeList = sizes
    )
  }

  /*
  * ------------------------------------------
  * Funciones propias del controlador
  * ------------------------------------------
  */
 private initUpdForm() {
  this.enterpriseForm = this.fb.group({
    pk_id_enterprise: [''], 
    type: [environment.enterprise_owner,Validators.required],
    nit: ['', Validators.required],
    name: ['',Validators.required],
    address: ['',Validators.required],
    phone: ['',Validators.required],
    ubication_city: ['',Validators.required],
    size: ['',Validators.required]
   });
 }

 /**
   *  Funciones de creación y actualización
   */
  public createEnterprise(){
    this.create.emit(this.enterpriseForm.value);
    this.enterpriseForm.reset();
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
