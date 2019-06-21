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
      return 'hidden';
    } else {
      return 'visible col-sm-12';
    }
  }

  public getClassShow(showFlag: boolean): string {
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
      return 'row text-ultra-small alert alert-danger';
    }

    if(units >= valMin && units <= valMedium){
      return 'row text-ultra-small alert alert-warning';
    }

    if(units > valMedium){
      return 'row text-ultra-small alert alert-success';
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

  public getClassHeaderTable(condition: string){
    if(condition == '0'){
      return 'myWidth font-weight-bold';
    }
    else{
      return 'myWidth';
    }
  }
}
