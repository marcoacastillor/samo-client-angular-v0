import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges, ChangeDetectorRef } from '@angular/core';
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
    private cd: ChangeDetectorRef
    
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

  public onFileSelected(event:any) {
    let reader = new FileReader();

    if(event.target.files && event.target.files.length){
      const [image] = event.target.files;
      reader.readAsDataURL(image);

      reader.onload = () => {
        this.enterpriseForm.patchValue({
          url_logo: reader.result
        });

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
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
      last_names: [this.enterprise.name],
      address: [this.enterprise.address],
      phone: [this.enterprise.phone],
      ubication_city: [this.enterprise.ubication_city, Validators.required],
      regimen: [this.enterprise.regimen],
      DIAN_billing_resolution: [this.enterprise.DIAN_billing_resolution],
      footer_billing: [this.enterprise.footer_billing],
      size: [this.enterprise.size],
      email:[this.enterprise.email],
      url_logo: [this.enterprise.url_logo],
      url_image: ['']
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
