import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class UtilsService {

  constructor() { }

  /*
  * ------------------------------------------
  * Funciones visualización
  * ------------------------------------------
  */
 public getClassNew(createFlag: boolean): string {
    if (createFlag) {
      return 'visible col-sm-12';
    } else {
      return 'hidden';
    }
  }

  public getClassList(listFlag: boolean): string {
    if ( listFlag) {
      return 'visible col-sm-12';
    } else {
      return 'hidden';
    }
  }

  public getClassShow(showFlag: boolean): string {
    if ( showFlag) {
      return 'visible col-sm-12';
    } else {
      return 'hidden';
    }
  }

  public getClassReport(showFlag: boolean): string {
    if ( showFlag) {
      return 'visible col-sm-12';
    } else {
      return 'hidden';
    }
  }

  public getClassByUnits(units: number){
    let valMin = environment.min_products;
    let valMedium = environment.medium_products;

    if(units < valMin){
      return 'text-danger mb-2 mr-1';
    }

    if(units >= valMin && units <= valMedium){
      return 'text-warning mb-2 mr-1';
    }

    if(units > valMedium){
      return 'text-success mb-2 mr-1';
    }
  }


  public getClassBySelectedComponent(condition: boolean){
    if(condition){
      return 'tab-pane fade active';
    }
    else{
      return 'tab-pane fade';
    }
  }

  public getClassBySelected(condition: string){
    if(condition === 'true'){
      return 'hidden';
    }
    else{
      return 'visible';
    }
  }

  public getClassBySelectedObject(id_row:number, id_select: number)
  {
    if(id_row == id_select)
    {
      return 'bg-light text-white';
    }
    else{
      return 'bg-info text-white';
    }
  }

  public getClassHeaderTable(condition: string){
    if(condition == '0'){
      return 'myWidth font-weight-bold';
    }
    else{
      return 'myWidth';
    }
  }
}
