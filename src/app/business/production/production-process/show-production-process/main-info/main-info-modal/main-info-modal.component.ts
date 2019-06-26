import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductionProcess } from 'src/app/shared/models/production-process';
import { Parameter } from 'src/app/shared/models/parameter';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';

@Component({
  selector: 'app-main-info-modal',
  templateUrl: 'main-info-modal.component.html',
  styles: []
})
export class MainInfoModalComponent implements OnInit, OnChanges{
  productionProcessForm: FormGroup;
  public faCalendar = faCalendar;
  
  @Input() public definedPeriodList: Parameter[];
  @Input() public productionProcess: ProductionProcess;

  @Output() public onUpdate = new EventEmitter<ProductionProcess>();

  constructor(
    private fb: FormBuilder,
    private formToolService: FormToolsService
  ) { }

  ngOnInit() {
    this.initUpdForm();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.productionProcess)
    {
      if(changes.productionProcess.currentValue)
      {
        this.initUpdForm();
      }
    }
  }

  update(){
    this.onUpdate.emit(this.productionProcessForm.value);
  }

  /*
  * ------------------------------------------
  * Funciones propias del controlador
  * ------------------------------------------
  */
 private initUpdForm() {
    this.productionProcessForm = this.fb.group({
      pk_id_production_process: [this.productionProcess.pk_id_production_process], 
      defined_period: [this.productionProcess.defined_period, Validators.required], 
      reference: [this.productionProcess.reference, Validators.required], 
      date_init: [this.productionProcess.date_init, Validators.required], 
      date_end: [null], 
      state: [this.productionProcess.state, Validators.required], 
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
