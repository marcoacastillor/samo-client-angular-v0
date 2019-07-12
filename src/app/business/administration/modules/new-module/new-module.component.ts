import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, SimpleChanges, OnChanges } from '@angular/core';
import { Module } from 'src/app/shared/models/module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { faThList } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-new-module',
  templateUrl: 'new-module.component.html',
  styles: []
})
export class NewModuleComponent implements OnInit, OnChanges {
  faThList = faThList;

  moduleForm: FormGroup;

  @Input() public module: Module;

  @Output() public create = new EventEmitter<Module>();
  @Output() public update = new EventEmitter<Module>();
  @Output() public cancel = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private formToolService: FormToolsService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.initUpdForm();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.module)
    {
      if(changes.module.currentValue != changes.module.previousValue)
      {
        this.initUpdForm();
      }
    }
  }

  public createModule() {
    let module = new Module;
    module = this.moduleForm.value;
    this.create.emit(module);

    this.module = new Module;
    this.moduleForm.reset();
    this.initUpdForm();
  }

  public updateModule() {

    let module = new Module;
    module = this.moduleForm.value;
    this.update.emit(module);
  }

  public cancelModule() {
    this.cancel.emit(true);
  }

  public onFileSelected(event) {
    let reader = new FileReader();

    if(event.target.files && event.target.files.length){
      const [image] = event.target.files;
      reader.readAsDataURL(image);

      reader.onload = () => {
        this.moduleForm.patchValue({
          file_image: reader.result
        });

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      }
    }
  }

  /*
  * ------------------------------------------
  * Funciones propias del controlador
  * ------------------------------------------
  */
 private initUpdForm() {
  this.moduleForm = this.fb.group({
    pk_id_module: [this.module.pk_id_module],
    name: [this.module.name, Validators.required],
    description: [this.module.description, Validators.required],
    url_image: [this.module.url_image, Validators.required],
    file_image: [null],
    url_angular_module: [this.module.url_angular_module, Validators.required],
    icon_name: [this.module.icon_name, Validators.required]
    });
  }

  public getErrors(controlName: string): any {
    return this.formToolService.getErrors(this.moduleForm, controlName);
  }

  public mustShowError(controlName: string) {
    return this.formToolService.mustShowError(this.moduleForm, controlName);
  }

  public hasError(controlName: string, errorCode: string): any {
    return this.formToolService.hasError(this.moduleForm, controlName, errorCode);
  }
}
