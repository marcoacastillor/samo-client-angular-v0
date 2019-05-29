import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Option } from 'src/app/shared/models/option';
import { OptionService } from 'src/app/shared/services/option.service';
import { fromEvent, Observable } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { Results } from 'src/app/shared/models/results';
import { MComponent } from 'src/app/shared/models/m-component';

@Component({
  selector: 'app-asign-option',
  templateUrl:'asign-option.component.html',
  styles: []
})
export class AsignOptionComponent implements OnInit, OnChanges {
  searchForm: FormGroup;
  public optionsList: Option[] = [];

  @Input() public cmp: MComponent;
  @Output() public select = new EventEmitter<string>();
  @Output() public asignOption = new EventEmitter<any>();
  @ViewChild('filterRef') userNameRef : ElementRef;

  constructor(
    private fb: FormBuilder,
    private optionService: OptionService,

  ) { }

  ngOnInit() {
    this.initUpdForm();
    this.filterOption();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.cmp)
    {
      if(changes.cmp.currentValue != changes.cmp.previousValue)
      {
        this.initUpdForm();
      }
    }
  }

  public filterOption(){
    fromEvent(this.userNameRef.nativeElement,"keyup").pipe(
      debounceTime(1000),
      switchMap((filter: any): Observable<Results> => this.optionService.getByFilter$(filter.target.value)),
      tap(this.loadOptions)
    ).subscribe();
  }

  private loadOptions = (options: Results): void => {
    this.optionsList = options[0].data_results;
  }

  private initUpdForm() {
    let options: Option[];
    if(this.cmp.options){
      options = this.cmp.options;  
    }
    else{
      options = [];
    }

    this.searchForm = this.fb.group({
      fk_id_component: [this.cmp.pk_id_component],
      filter: [''],
      options: this.fb.array(options)
    });
  }

  get optFormArray(): FormArray {
    return this.searchForm.get('options') as FormArray;
  }

  get formData() { return <FormArray>this.searchForm.get('options'); }

  public addOption(option: Option, idx: number, lstOptions: Option[]){
    let opt = this.fb.group(option);
    this.optFormArray.push(opt);
    lstOptions.splice(idx,1);
  }

  public delOption(option: Option, idx: number, lstOptions: Option[]){
    this.optFormArray.removeAt(idx);
    lstOptions.push(option);
  }

  public asignOptionByComponent(){
    this.asignOption.emit(this.searchForm.value);
    this.searchForm.reset();
    this.initUpdForm();
  }

}
