import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { faSearch, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import * as moment from 'moment';

@Component({
  selector: 'app-report-form',
  templateUrl: 'report-form.component.html',
  styles: []
})
export class ReportFormComponent implements OnInit {
  faSearch = faSearch;
  faCalendar = faCalendar;
  
  reportForm: FormGroup;

  public dateInit: string;
  public dateEnd: string;
  public consolidate_day: number = environment.consolidate_day;

  @Output() public findData = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private formToolService: FormToolsService,
  ) { }

  ngOnInit() {
    this.dateEnd = moment().add(+this.consolidate_day,'days').format('YYYY-MM-DD');
    this.dateInit = moment().add().format('YYYY-MM-DD');
    this.initUpdForm(this.dateInit,this.dateEnd);

  }

  private initUpdForm(dateInit: string, dateEnd: string) {
    this.reportForm = this.fb.group({
      from_date: [dateInit],
      to_date: [dateEnd],
    });
  }

  public getDataByPeriod(){
    this.findData.emit(this.reportForm.value);
  }

  public getErrors(controlName: string): any {
    return this.formToolService.getErrors(this.reportForm, controlName);
  }

  public mustShowError(controlName: string) {
    return this.formToolService.mustShowError(this.reportForm, controlName);
  }

  public hasError(controlName: string, errorCode: string): any {
    return this.formToolService.hasError(this.reportForm, controlName, errorCode);
  }

}
