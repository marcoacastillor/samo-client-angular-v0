import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Parameter } from 'src/app/shared/models/parameter';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-barcode-form',
  templateUrl: 'barcode-form.component.html',
  styles: []
})
export class BarcodeFormComponent implements OnInit {
   
  @Input() public parametersBarCode: Parameter[];
  @Input() public enterprise: string;
  @Input() public consecutive: number;
  
  @Output() public setCodeBar = new EventEmitter<string>();

  category: string = '';
  nameCategory: string = '';
  size: string = '';

  category_clothes = environment.category_clothes;
  sizes_clothes = environment.sizes_clothes;

  constructor() { }

  ngOnInit() {
  }

  public setCategory(code:string,name:string){
    this.category = code;
    this.nameCategory = name;
  }

  public setSize(size:string){
    this.size = size
  }

  public selectBarCode(){
    this.setCodeBar.emit(this.enterprise+':'+this.category+':'+this.size+':00'+(this.consecutive+1)+':'+this.nameCategory)
  }

}
