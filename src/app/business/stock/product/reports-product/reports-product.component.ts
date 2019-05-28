import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import { Chart } from 'chart.js';
import { GlobalStoreService } from 'src/app/core/services/global-store.service';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder } from '@angular/forms';

//https://danielykpan.github.io/date-time-picker/
// ejemplos: DatePicker

@Component({
  selector: 'app-reports-product',
  templateUrl: 'reports-product.component.html',
  styles: []
})
export class ReportsProductComponent implements OnInit, OnChanges {
  public reportForm: FormGroup;
  public faCalendar = faCalendar;
  chart:any = [];
  
  @Input() public dataSets: any[];
  @Input() public dateInit: string;
  @Input() public dateEnd: string;
  @Input() public days_sold: number;
  @Input() public valueStock: number;
  
  @Output() public loadData = new EventEmitter<any>();
  
  constructor(
    private globalStoreService: GlobalStoreService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.initUpdForm();
    //this.createChar();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.dataSets)
    {
      if(changes.dataSets.currentValue != changes.dataSets.previousValue)
      {
        this.createChar();
      }
    }
  }

  public loadDataCharset(){
    this.chart.destroy();
    this.loadData.emit(this.reportForm.value);
  }

  /*
  * ------------------------------------------
  * Funciones propias del controlador
  * ------------------------------------------
  */
  private initUpdForm() {
    this.reportForm = this.fb.group({
      from_date: [this.dateInit],
      to_date: [this.dateEnd],
    });
  }
  
  
  private createChar(){
    this.chart = new Chart('canvas',
    {
      type: 'bar',
			data: {
        labels:  [
          "Productos más vendidos"
      ],
        datasets: this.dataSets
			},
			options: {
				responsive: true,
				legend: {
          position: 'bottom',
          fullWidth: true,
          boxWidth: 60,
          padding: 20,
          fontSize: 20
				},
				title: {
					display: true,
					text: 'Reporte de Ventas'
        },
        tooltips: {
          mode: 'dataset'
        }
			}
    });
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
