import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { MComponent } from 'src/app/shared/models/m-component';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';

@Component({
  selector: 'app-component-form-modal',
  templateUrl: 'component-form-modal.component.html',
  styles: []
})
export class ComponentFormModalComponent implements OnInit {
  componentForm: FormGroup;
  faSave = faSave;

  @Input() public component: MComponent;

  @Output() public create = new EventEmitter<MComponent>();
  @Output() public update = new EventEmitter<MComponent>();

  constructor(
    private fb: FormBuilder,
    private formToolService: FormToolsService,
  ) { }

  ngOnInit() {
    this.initUpdForm(this.component); 
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.component)
    {
      if(changes.component.currentValue != changes.component.previousValue)
      {
        this.initUpdForm(changes.component.currentValue);
      }
    }
  }

  public updateModule(){
    this.update.emit(this.componentForm.value);
    this.componentForm.reset();
  }
  
  public createModule(){
    this.create.emit(this.componentForm.value);
    this.componentForm.reset();
  }

  private initUpdForm(component:MComponent) {
  this.componentForm = this.fb.group({
    pk_id_component: [component.pk_id_component],
    fk_id_module: [component.fk_id_module,Validators.required],
    name: [component.name,Validators.required],
    url_angular_component: [component.url_angular_component,Validators.required],
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
