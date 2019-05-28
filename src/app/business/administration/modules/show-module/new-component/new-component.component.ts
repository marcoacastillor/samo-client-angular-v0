import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MComponent } from 'src/app/shared/models/m-component';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';

@Component({
  selector: 'app-new-component',
  templateUrl: 'new-component.component.html',
  styles: []
})
export class NewComponentComponent implements OnInit, OnChanges {
  componentForm: FormGroup;

  @Input() public comp: MComponent;
  
  @Output() public create = new EventEmitter<MComponent>();
  @Output() public update = new EventEmitter<MComponent>();
  
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
    if(changes.comp)
    {
      if(changes.comp.currentValue != changes.comp.previousValue)
      {
        this.initUpdForm();
      }
    }
  }
  
  public createComponent() {
    let cmp = new MComponent;
    this.comp = cmp;
    cmp = this.componentForm.value;
    this.create.emit(cmp);
    this.initUpdForm();
  }

  public updateComponent()
  {
    let cmp = new MComponent;
    cmp = this.componentForm.value;
    this.update.emit(cmp);
  }

  public onFileSelected(event){
    let reader = new FileReader();

    if(event.target.files && event.target.files.length){
      const [image] = event.target.files;
      reader.readAsDataURL(image);

      reader.onload = () => {
        this.componentForm.patchValue({
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
  this.componentForm = this.fb.group({
    pk_id_component: [this.comp.pk_id_component],
    fk_id_module: [this.comp.fk_id_module],
    name: [this.comp.name, Validators.required],
    url_image: [''],
    file_image: [null],
    url_angular_component: [this.comp.url_angular_component],
    display_user: [this.comp.display_user]
    });
  }

  public getErrors(controlName: string): any {
    return this.formToolService.getErrors(this.componentForm, controlName);
  }

  public mustShowError(controlName: string) {
    return this.formToolService.mustShowError(this.componentForm, controlName);
  }

  public hasError(controlName: string, errorCode: string): any {
    return this.formToolService.hasError(this.componentForm, controlName, errorCode);
  }

}
