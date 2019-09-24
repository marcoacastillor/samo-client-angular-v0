import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { AssociatedInfo } from 'src/app/shared/models/associated-info';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { AssociatedContribution } from 'src/app/shared/models/associated-contribution';
import { faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-associated-contribution-modal',
  templateUrl: 'associated-contribution-modal.component.html',
  styles: []
})
export class AssociatedContributionModalComponent implements OnInit {
  faSave = faSave;
  
  contributionForm: FormGroup;

  @Input() public associatedSelected: AssociatedInfo;
  @Output() public create = new EventEmitter<AssociatedContribution>();

  constructor(
    private formToolService: FormToolsService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.initForm()
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.associatedSelected)
    {
      if(changes.associatedSelected.currentValue != changes.associatedSelected.previousValue)
      {
        this.initForm()
      }  
    }
  }

  private initForm(){
    this.contributionForm = this.fb.group({
      fk_id_associated_info: [this.associatedSelected.pk_id_associated_info],
      value_contribution: [this.associatedSelected.min_contribution + 2000,Validators.required]
    })
  }

  public createContrubution(){
    this.create.emit(this.contributionForm.value);
  }

    /**
  * Funciones para verificar si los formularios son obligatorios o no.
  */

 public getErrors(controlName: string): any {
  return this.formToolService.getErrors(this.contributionForm, controlName);
  }

  public mustShowError(controlName: string) {
    return this.formToolService.mustShowError(this.contributionForm, controlName);
  }

  public hasError(controlName: string, errorCode: string): any {
    return this.formToolService.hasError(this.contributionForm, controlName, errorCode);
  }


}
