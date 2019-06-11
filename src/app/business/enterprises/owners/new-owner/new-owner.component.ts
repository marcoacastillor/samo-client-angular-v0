import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-new-owner',
  templateUrl: 'new-owner.component.html',
  styles: []
})
export class NewOwnerComponent implements OnInit {
  @Input() public registry: Enterprise;
  @Input() public lstTypes: any;
  
  enterpriseForm: FormGroup;
  
  @Output() public store = new EventEmitter<Enterprise>();
  @Output() public update = new EventEmitter<Enterprise>();

  constructor(
    private fb: FormBuilder,
    private formToolService: FormToolsService
  ) { }

  ngOnInit() {
    this.initUpdForm();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.registry)
    {
      if(changes.registry.currentValue != changes.registry.previousValue)
      {
        this.initUpdForm();
      }
    }
  }

  /*
  * ------------------------------------------
  * Funciones propias del controlador
  * ------------------------------------------
  */
 private initUpdForm() {
  this.enterpriseForm = this.fb.group({
    pk_id_enterprise: [this.registry.pk_id_enterprise], 
    type: [environment.enterprise_owner,Validators.required],
    nit: [this.registry.nit, Validators.required],
    name: [this.registry.name,Validators.required],
    address: [this.registry.address,Validators.required],
    phone: [this.registry.phone,Validators.required],
    external_reference: [' ',Validators.required],
    ubication_city: [this.registry.ubication_city,Validators.required],
   });
 }

 /**
   *  Funciones de creación y actualización
   */
  public createRegistry(){
    this.store.emit(this.enterpriseForm.value);
    this.enterpriseForm.reset();
  }

  public updateRegistry(){
    this.update.emit(this.enterpriseForm.value);
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
