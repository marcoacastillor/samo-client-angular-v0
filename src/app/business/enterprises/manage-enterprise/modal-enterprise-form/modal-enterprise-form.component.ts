import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { environment } from 'src/environments/environment';
import { Parameter } from 'src/app/shared/models/parameter';

@Component({
  selector: 'app-modal-enterprise-form',
  templateUrl: 'modal-enterprise-form.component.html',
  styles: []
})
export class ModalEnterpriseFormComponent implements OnInit {
  faSave = faSave;
  enterpriseForm: FormGroup;

  regimen    = environment.regimen;
  size       = environment.size_enterprise;

  @Input() public enterprise: Enterprise;
  @Input() public fk_id_enterprise: Number;
  @Input() public lstParametersEnterprise: Parameter[];
  
  
  @Output() public update = new EventEmitter<Enterprise>();

  constructor(
    private fb: FormBuilder,
    private formToolService: FormToolsService,
    
  ) { }

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.enterprise)
    {
      if(changes.enterprise.currentValue != changes.enterprise.previousValue)
      {
        this.initForm();
      }
    }
  }

  private initForm(){
    this.enterpriseForm = this.fb.group({
      pk_id_enterprise: [this.enterprise.pk_id_enterprise],
      type: [this.enterprise.type],
      external_reference: ['E:'+this.fk_id_enterprise],
      nit: [this.enterprise.nit,Validators.required],
      name: [this.enterprise.name,Validators.required],
      address: [this.enterprise.address],
      phone: [this.enterprise.phone],
      ubication_city: [this.enterprise.ubication_city, Validators.required],
      regimen: [this.enterprise.regimen],
      DIAN_billing_resolution: [this.enterprise.DIAN_billing_resolution],
      footer_billing: [this.enterprise.footer_billing],
      size: [this.enterprise.size],
    })
  }

  updateEnterprise(){
    this.update.emit(this.enterpriseForm.value);
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
