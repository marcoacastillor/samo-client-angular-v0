import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CuttingPeriod } from 'src/app/shared/models/cutting-period';
import { faAlignJustify, faArchive, faPlusCircle, faTrash, faArrowCircleRight, faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { ProductionProcess } from 'src/app/shared/models/production-process';
import { DetailProductInput } from 'src/app/shared/models/detail-product-input';
import { DetailProductInputService } from 'src/app/shared/services/detail-product-input.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-periods-info',
  templateUrl: 'periods-info.component.html',
  styles: []
})
export class PeriodsInfoComponent implements OnInit {
  faAlignJustify = faAlignJustify;
  faArrowCircleRight = faArrowCircleRight;
  faPlusCircle =  faPlusCircle;
  faTrash = faTrash;
  faFolderPlus = faFolderPlus;

  cuttingPeriod: CuttingPeriod = new CuttingPeriod;
  detailProductInput: DetailProductInput = new DetailProductInput;

  @Input() public cuttingPeriodList: CuttingPeriod[];
  @Input() public productionProcess: ProductionProcess;
  
  @Output() public getData = new EventEmitter<Number>();
  @Output() public onCreatePeriod = new EventEmitter<CuttingPeriod>();
  @Output() public onDeletePeriod = new EventEmitter<Number>();
  
  constructor(
    private detailProductInputService: DetailProductInputService,
    private UtilService: UtilsService,
  ) { }

  ngOnInit() {
  }

  getDataByCuttingPeriod(id_cutting_period: number){
    this.getData.emit(id_cutting_period);

    if(this.cuttingPeriod.pk_id_cutting_period)
    {
      const nameInputSelected = document.getElementById(this.cuttingPeriod.pk_id_cutting_period.toString()) as HTMLInputElement;
      if(nameInputSelected)
        nameInputSelected.className = 'node';

      const nameInputNew = document.getElementById(id_cutting_period.toString()) as HTMLInputElement;
      nameInputNew.className = 'bg-light';
    }
    else
    {
      const nameInputNew = document.getElementById(id_cutting_period.toString()) as HTMLInputElement;
      nameInputNew.className = 'bg-light';
    }
    
  }

  createPeriod(){
    let cuttingPeriod = new CuttingPeriod;
    cuttingPeriod.fk_id_production_process  = this.productionProcess.pk_id_production_process;
    cuttingPeriod.defined_period            = this.productionProcess.defined_period;

    this.onCreatePeriod.emit(cuttingPeriod);
  }

  selectPeriod(cuttingPeriod: CuttingPeriod){
    this.cuttingPeriod = cuttingPeriod;
  }

  deletePeriod(){
    this.onDeletePeriod.emit(this.cuttingPeriod.pk_id_cutting_period)
  }

  onCreateDetailProduct(detailProduct: DetailProductInput){
    console.log(detailProduct);
    
    this.detailProductInputService.store$(detailProduct).subscribe(
      detailPrdInput => {
        this.getDataByCuttingPeriod(detailPrdInput.fk_id_cutting_period)
      }
    )    
  }

  /*
  * ------------------------------------------
  * Funciones visualización
  * ------------------------------------------
  */
  getClassSelected(row: number, selected: number){
    return this.UtilService.getClassBySelectedObject(row, selected);
  }
}
