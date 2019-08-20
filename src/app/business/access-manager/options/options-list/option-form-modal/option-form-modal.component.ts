import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { Option } from 'src/app/shared/models/option';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';

@Component({
  selector: 'app-option-form-modal',
  templateUrl: 'option-form-modal.component.html',
  styles: []
})
export class OptionFormModalComponent implements OnInit {
  optionForm: FormGroup;
  faSave = faSave;

  @Input() public option: Option;

  @Output() public create = new EventEmitter<Option>();
  @Output() public update = new EventEmitter<Option>();

  constructor(
    private fb: FormBuilder,
    private formToolService: FormToolsService
  ) { }

  ngOnInit() {
    this.initUpdForm(this.option);
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.option)
    {
      if(changes.option.currentValue != changes.option.previousValue)
      {
        this.initUpdForm(changes.option.currentValue);
      }
    }
  }

  public updateOption(){
    this.update.emit(this.optionForm.value);
    this.optionForm.reset();
  }

  public createOption(){
    this.create.emit(this.optionForm.value);
    this.optionForm.reset();
  }

  private initUpdForm(option:Option) {
    this.optionForm = this.fb.group({
      pk_id_option: [option.pk_id_option],
      business_object: [option.business_object,Validators.required],
      action: [option.action,Validators.required],
      description: [option.description, Validators.required],
      });
  }
  
  public getErrors(controlName: string): any {
    return this.formToolService.getErrors(this.optionForm, controlName);
  }

  public mustShowError(controlName: string) {
    return this.formToolService.mustShowError(this.optionForm, controlName);
  }

  public hasError(controlName: string, errorCode: string): any {
    return this.formToolService.hasError(this.optionForm, controlName, errorCode);
  }

}
