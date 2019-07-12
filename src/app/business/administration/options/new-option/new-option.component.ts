import { Component, OnInit, Input, ChangeDetectorRef, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Option } from 'src/app/shared/models/option';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { faThList } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-new-option',
  templateUrl: 'new-option.component.html',
  styles: []
})
export class NewOptionComponent implements OnInit, OnChanges {
  faThList = faThList;
  optionForm: FormGroup;

  @Input() public option: Option;

  @Output() public create = new EventEmitter<Option>();
  @Output() public update = new EventEmitter<Option>();
  @Output() public cancelNew = new EventEmitter<Boolean>();
  
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
    if(changes.option)
    {
      if(changes.option.currentValue != changes.option.previousValue)
      {
        this.initUpdForm();
      }
    }
  }

  public createOption() {
    let opt = new Option;
    this.option = opt;
    opt = this.optionForm.value;
    this.create.emit(opt);
    this.optionForm.reset();

  }

  public updateOption()
  {
    let opt = new Option;
    opt = this.optionForm.value;
    this.update.emit(opt);
    this.optionForm.reset();
  }

  public cancel(){
    this.cancelNew.emit(true);
  }


  /*
  * ------------------------------------------
  * Funciones propias del controlador
  * ------------------------------------------
  */
  private setValuesForm()
  {
    this.optionForm.patchValue({
      code: '',
      description: ''
    });
  }
 
  private initUpdForm() {
    this.optionForm = this.fb.group({
    pk_id_option: [this.option.pk_id_option],
    fk_id_component: [this.option.fk_id_component],
    code: [this.option.code, Validators.required],
    description: [this.option.description, Validators.required],
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
