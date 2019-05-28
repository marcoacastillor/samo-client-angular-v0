import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { faEye, faTrashAlt, faEdit, faBan, faPlusCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Results } from 'src/app/shared/models/results';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-list-employee',
  templateUrl: 'list-employee.component.html',
  styles: []
})
export class ListEmployeeComponent implements OnInit {
  searchForm: FormGroup;
  
  faEye = faEye;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  fasFaBan = faBan;
  faPlusCircle = faPlusCircle;
  faSearch = faSearch;

  public active = environment.state_rol_person_active;

  public totalPgs: any[] = [];

  @Input() public clientList: Results;
  @Input() public actualPg: number;
  @Input() public regPerPg: number;

  @Output() public search = new EventEmitter<string>();
  @Output() public selectShow = new EventEmitter<number>();
  @Output() public selectUpdate = new EventEmitter<number>();
  @Output() public inactivate = new EventEmitter<number>();
  
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

  public inactivarEmployee(id:number){
    this.inactivate.emit(id);
  }

}
