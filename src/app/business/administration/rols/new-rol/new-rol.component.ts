import { OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges, Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Rol } from 'src/app/shared/models/rol';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { Option } from 'src/app/shared/models/option';
import { faPlusCircle, faMinusCircle, faAngleDoubleRight, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import { Module } from 'src/app/shared/models/module';
import { MComponent } from 'src/app/shared/models/m-component';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-new-rol',
  templateUrl: 'new-rol.component.html',
  styles: []
})
export class NewRolComponent implements OnInit, OnChanges {
  rolForm: FormGroup;
  public activeComponent:MComponent = new MComponent;
  
  faAngleDoubleRight = faAngleDoubleRight;
  faAngleDoubleLeft = faAngleDoubleLeft;

  @Input() public rol: Rol;
  @Input() public moduleList: Module[];
  
  @Output() public create = new EventEmitter<Rol>();
  @Output() public update = new EventEmitter<Rol>();
  @Output() public cancel = new EventEmitter<boolean>();
  @Output() public getRol = new EventEmitter<number>();
  
  constructor(
    private fb: FormBuilder,
    private formToolService: FormToolsService,
    private utilService: UtilsService
  ) {
     
   }

  ngOnInit() {
    this.initUpdForm();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.rol)
    {
      if(changes.rol.currentValue != changes.rol.previousValue)
      {
        this.initUpdForm();
      }
    }

    if(changes.moduleList)
    {
      if(changes.moduleList.currentValue != changes.moduleList.previousValue)
      {
        this.moduleList = changes.moduleList.currentValue;
      }
    }
  }

  public showOptions(component: MComponent){
    this.activeComponent = component;
  }

  /*
  * ------------------------------------------
  * Funciones propias del controlador
  * ------------------------------------------
  */
  private initUpdForm() {
    let options: Option[];
    if(this.rol.options){
      options = this.rol.options;  
    }
    else{
      options = [];
    }

    this.rolForm = this.fb.group({
      pk_id_rol: [this.rol.pk_id_rol],
      name: [this.rol.name, Validators.required],
      options: this.fb.array(options)
    });
  }

  get formData() { return <FormArray>this.rolForm.get('options'); }

  get optFormArray(): FormArray {
    return this.rolForm.get('options') as FormArray;
  }

  public addOption(option: Option, idx: number,id_view:string){
    option.viewRef = id_view;
    let opt = this.fb.group(option);
    this.optFormArray.push(opt);
    //lstOptions.splice(idx,1);

    const nameInput = document.getElementById(id_view) as HTMLInputElement;
    nameInput.style.display = 'none';
  }

  public delOption(option: Option, idx: number){
    this.optFormArray.removeAt(idx);
    const nameInput = document.getElementById(option.viewRef) as HTMLInputElement;
    nameInput.style.display = 'block';
  }

  public createrol() {
    let rol = new Rol;
    rol = this.rolForm.value;
    this.create.emit(rol);

    this.rol = new Rol;
    this.rolForm.reset();
    this.initUpdForm();
  }

  public updaterol()
  {
    let rol = new Rol;
    rol = this.rolForm.value;
    
    this.update.emit(rol);
    this.rolForm.reset();
  }

  /**
   * Funciones de validación de formularios.
   */

  public getClassBySelect(selected: string){
    return this.utilService.getClassBySelected(selected);
  }

  public getErrors(controlName: string): any {
    return this.formToolService.getErrors(this.rolForm, controlName);
  }

  public mustShowError(controlName: string) {
    return this.formToolService.mustShowError(this.rolForm, controlName);
  }

  public hasError(controlName: string, errorCode: string): any {
    return this.formToolService.hasError(this.rolForm, controlName, errorCode);
  }
}

