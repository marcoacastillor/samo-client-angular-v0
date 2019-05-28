import { Component, OnInit, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { Results } from 'src/app/shared/models/results';
import { faPlusCircle, faBan, faEdit, faTrashAlt, faEye, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-list-clients',
  templateUrl: 'list-clients.component.html',
  styles: []
})
export class ListClientsComponent implements OnInit, OnChanges {
  searchForm: FormGroup;
  
  faEye = faEye;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  fasFaBan = faBan;
  faPlusCircle = faPlusCircle;
  faSearch = faSearch;

  public totalPgs: any[] = [];

  @Input() public clientList: Results;
  @Input() public actualPg: number;
  @Input() public regPerPg: number;

  @Output() public search = new EventEmitter<string>();
  @Output() public selectShow = new EventEmitter<number>();
  @Output() public selectUpdate = new EventEmitter<number>();

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.initUpdForm();
  }

  private initUpdForm() {
    this.searchForm = this.fb.group({
      filter: [''],
     });
   }
  
  
  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.clientList)
    {
      if(changes.clientList.currentValue)
      {
        this.clientList = changes.clientList.currentValue;
        this.totalPgs = [];
        let tpags = Math.ceil(this.clientList.number_results / this.regPerPg);
        this.createArrayTotalPags(tpags);
      }
    }
  }

  private createArrayTotalPags(total: number){
    for(let i = 0; i < total; i++){
      this.totalPgs.push(i);
    }
  }

  public setActualPg(pg: number){
    this.actualPg = pg;
  }
  
  public searchPerson(){
    let filter = this.searchForm.value.filter;
    if(filter.length == 0){
      filter = 'none';
    }
    this.search.emit(filter);
  }


  public showClient(pk_id_person: number){
    this.selectShow.emit(pk_id_person);
  }

  public updateClient(pk_id_person: number){
    this.selectUpdate.emit(pk_id_person);
  }

  public createClient(){
    this.selectUpdate.emit(-1);
  }

}
