import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Parameter } from 'src/app/shared/models/parameter';
import { ProductionProcess } from 'src/app/shared/models/production-process';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';

@Component({
  selector: 'app-process-form-modal',
  templateUrl: 'process-form-modal-component.html',
  styles: []
})
export class ProcessFormModalComponent implements OnInit {
  productionProcessForm: FormGroup;
  public faCalendar = faCalendar;


  productionProcess: ProductionProcess = new ProductionProcess;
  
  @Input() public definedPeriodList: Parameter[];
  @Input() public fk_id_enterprise: number;
  
  @Output() public onCreate = new EventEmitter<ProductionProcess>();

  constructor(
    private fb: FormBuilder,
    private formToolService: FormToolsService
  ) { }

  ngOnInit() {
    this.initUpdForm();
  }

  create(){
    this.onCreate.emit(this.productionProcessForm.value);
  }

  /*
  * ------------------------------------------
  * Funciones propias del controlador
  * ------------------------------------------
  */
 private initUpdForm() {
    this.productionProcessForm = this.fb.group({
      fk_id_enterprise: [this.fk_id_enterprise],
      defined_period: ['', Validators.required], 
      reference: ['', Validators.required], 
      date_init: ['', Validators.required], 
      date_end: [null], 
      state: ['Activo', Validators.required], 
  });
  }

/**
   * Funciones para verificar si los formularios son obligatorios o no.
   */

  public getErrors(controlName: string): any {
    return this.formToolService.getErrors(this.productionProcessForm, controlName);
  }

  public mustShowError(controlName: string) {
    return this.formToolService.mustShowError(this.productionProcessForm, controlName);
  }

  public hasError(controlName: string, errorCode: string): any {
    return this.formToolService.hasError(this.productionProcessForm, controlName, errorCode);
  }

}
