import { Component, OnInit } from '@angular/core';
import { Option } from 'src/app/shared/models/option';
import { OptionService } from 'src/app/shared/services/option.service';
import { Results } from 'src/app/shared/models/results';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-main-option',
  templateUrl: 'main-option.component.html',
  styles: []
})
export class MainOptionComponent implements OnInit {
  public actualPg: number = 0;
  public regPerPg: number = 5;

  public option: Option = new Option;
  public optionList: Results = new Results;

  constructor(
    private optionService: OptionService,
    private globalStoreService: GlobalStoreService
  ) { }

  ngOnInit() {
    this.getAllOptions();
  }

  public getAllOptions(){
    this.optionService.getAll$().subscribe(
      lst => this.optionList = lst[0]
    );
  }

  public onCreate(option: Option){
    this.optionService.store$(option)
    .pipe(
      tap(() => { this.getAllOptions()})
    )
    .subscribe(this.onSuccess,this.onError)
  }

  public onUpdate(option: Option){
    this.optionService.update$(option)
    .pipe(
      tap(() => { this.getAllOptions()})
    )
    .subscribe(this.onSuccess,this.onError)
  }

  public onDelete(id: number){
    this.optionService.delete$(id)
    .pipe(
      tap(() => { this.getAllOptions()})
    )
    .subscribe(this.onSuccess,this.onError)
  }

  public onNew(option: Option){
    this.option = option;
  }
  

  /*
  * ------------------------------------------
  * Funciones validación de resultado
  * ------------------------------------------
  */
 private onSuccess = () => {
  this.globalStoreService.dispatchUserMessage('200', ' Se ejecutó exitosamente, la operación ');
  }

  private onError = (error: any) => {
    this.globalStoreService.dispatchUserMessage(error.status, error.statusText + ' : ' + error.error.error);
  }
}
