import { Component, OnInit, Input, ChangeDetectorRef, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { Module } from 'src/app/shared/models/module';

@Component({
  selector: 'app-module-form-modal',
  templateUrl: 'module-form-modal.component.html',
  styles: []
})
export class ModuleFormModalComponent implements OnInit {
  moduleForm: FormGroup;
  faSave = faSave;

  @Input() public module: Module;

  @Output() public create = new EventEmitter<Module>();
  @Output() public update = new EventEmitter<Module>();

  constructor(
    private fb: FormBuilder,
    private formToolService: FormToolsService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.initUpdForm(this.module);
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.module)
    {
      if(changes.module.currentValue != changes.module.previousValue)
      {
        this.initUpdForm(changes.module.currentValue);
      }
    }
  }

  public updateModule(){
    this.update.emit(this.moduleForm.value);
    this.moduleForm.reset();
  }

  public createModule(){
    this.create.emit(this.moduleForm.value);
    this.moduleForm.reset();
  }

  public onFileSelected(event:any) {
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

  private initUpdForm(module:Module) {
    this.moduleForm = this.fb.group({
      pk_id_module: [module.pk_id_module],
      name: [module.name, Validators.required],
      description: [module.description, Validators.required],
      url_image: [module.url_image, Validators.required],
      file_image: [null],
      url_angular_module: [module.url_angular_module, Validators.required],
      icon_name: [module.icon_name, Validators.required],
      order_module: [module.order_module, Validators.required]
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
