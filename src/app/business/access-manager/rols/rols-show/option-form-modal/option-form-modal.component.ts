import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { faArrowAltCircleRight, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { Option } from 'src/app/shared/models/option';
import { OptionService } from 'src/app/shared/services/option.service';
import { OptionRolService } from 'src/app/shared/services/option-rol.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-option-form-modal',
  templateUrl: 'option-form-modal.component.html',
  styles: []
})
export class OptionFormModalComponent implements OnInit {
  faArrowAltCircleRight = faArrowAltCircleRight;
  faArrowAltCircleLeft = faArrowAltCircleLeft;

  @Input() public lstAllObjects: Option[];
  @Input() public pk_id_rol: number;

  @Output() public refresh = new EventEmitter<number>();

  lstOptions: Option[] = [];
  lstSelectedOptions: Option[] = [];
  
  constructor(
    private optionService: OptionService,
    private optionRolService: OptionRolService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.lstAllObjects)
    {
      if(changes.lstAllObjects.currentValue != changes.lstAllObjects.previousValue)
      {
        this.lstAllObjects = changes.lstAllObjects.currentValue;
        this.lstSelectedOptions = [];
      }
    }
  }

  public loadActionsByBusinessObject(business_object: string){
    if(business_object != ''){
      this.optionService.getOptionsByBusinessObjectAndRol$(business_object,this.pk_id_rol).pipe(
        tap((lst_options:Option[]) => this.lstSelectedOptions = lst_options)
      ).subscribe();

      this.optionService.getNotOptionsByBusinessObjectAndRol$(business_object,this.pk_id_rol).pipe(
        tap((lst_options:Option[]) => this.lstOptions = lst_options)
      ).subscribe()
    }
  }


  public addOption(option: Option){
    this.optionRolService.create$(option.pk_id_option,this.pk_id_rol).subscribe(
      () => {
        this.loadActionsByBusinessObject(option.business_object);
        this.refresh.emit(this.pk_id_rol);
      }
    )
  }

  public delOption(id:number,business_object:string){
    this.optionRolService.delete$(id).subscribe(
      () => {
        this.loadActionsByBusinessObject(business_object);
        this.refresh.emit(this.pk_id_rol);
      }
    )
  }


}
