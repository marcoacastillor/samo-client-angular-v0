import { Component, OnInit } from '@angular/core';
import { faPlusCircle, faEye, faEdit, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Option } from 'src/app/shared/models/option';
import { OptionService } from 'src/app/shared/services/option.service';

@Component({
  selector: 'app-options-list',
  templateUrl: 'options-list.component.html',
  styles: []
})
export class OptionsListComponent implements OnInit {
  faPlusCircle = faPlusCircle;
  faEye = faEye;
  faEdit = faEdit;
  faTrash = faTrash;
  faSearch = faSearch;

  lstOptions: Option[] = [];
  selectedOption: Option = new Option;

  success = false;
  message = '';

  lastkeydown1 = 0;

  constructor(
    private optionService: OptionService
    ) { }

  ngOnInit() {
    this.loadAllOptions();
  }

  public loadAllOptions(){
    this.optionService.getAll$().subscribe(
      options => this.lstOptions = options
    )
  }

  onFindByBusinessObject(filter: any){
    let businessObject = (<HTMLInputElement>document.getElementById('businessObject')).value;
    this.lstOptions = [];

    if (businessObject.length > 0) {
      if (filter.timeStamp - this.lastkeydown1 > 200) {
        this.optionService.getByBusinessObject$(businessObject).subscribe(
          lst_options => {
            this.lstOptions = lst_options;
          }
        )
      }
    }
  }

  onFindByAction(filter: any){
    let action = (<HTMLInputElement>document.getElementById('action')).value;
    this.lstOptions = [];

    if (action.length > 0) {
      if (filter.timeStamp - this.lastkeydown1 > 200) {
        this.optionService.getByAction$(action).subscribe(
          lst_options => {
            this.lstOptions = lst_options;
          }
        )
      }
    }
  }

  public newOption(){
    this.selectedOption = new Option;
  }

  public selectOption(option:Option){
    this.selectedOption = option;
  }

  public deleteOption(){
    this.optionService.delete$(this.selectedOption.pk_id_option).subscribe(
      () => {
        this.loadAllOptions();
        this.success = true;
        this.message = 'Se elimina registro satisfactoriamente.';
      }
    )
  }

  public onCreate(option:Option){
    this.optionService.store$(option).subscribe(
      () => {
        this.loadAllOptions();
        this.success = true;
        this.message = 'Se crea registro satisfactoriamente.';
      }
    )
  }

  public onUpdate(option:Option){
    this.optionService.update$(option).subscribe(
      () => {
        this.loadAllOptions();
        this.success = true;
        this.message = 'Se actualiza registro satisfactoriamente.';
      }
    )
  }

}
