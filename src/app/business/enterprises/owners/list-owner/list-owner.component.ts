import { Component, OnInit, Input, ElementRef, ViewChild, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faPlusCircle, faEye, faEdit, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Results } from 'src/app/shared/models/results';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { EnterpriseService } from 'src/app/shared/services/enterprise.service';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-list-owner',
  templateUrl: 'list-owner.component.html',
  styles: []
})
export class ListOwnerComponent implements OnInit {
  searchForm: FormGroup;
  
  faPlusCircle = faPlusCircle;
  faEye = faEye;
  faEdit = faEdit;
  faSearch = faSearch;

  @Input() public registryList: Results;
  @Input() public actualPg: number;
  @Input() public regPerPg: number;

  @ViewChild('filterRef') filter : ElementRef;

  public totalPgs: number = 0;
  public maxPerPg: number = 0;

  @Output() public create = new EventEmitter<Enterprise>();
  @Output() public update = new EventEmitter<Enterprise>();
  @Output() public select = new EventEmitter<number>();

  constructor(
    private enterpriseService: EnterpriseService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.calculateRegs();
    this.initUpdForm();
  }

  private initUpdForm() {
    this.searchForm = this.fb.group({
      filter: ['',Validators.required],
     });
   }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.registryList)
    {
      if(changes.registryList.currentValue)
      {
        this.registryList = changes.registryList.currentValue;
        this.totalPgs = Math.ceil(this.registryList.number_results / this.regPerPg);
        this.actualPg = 0;
      }
    }
  }

  public searchRegistries(){
    this.enterpriseService.getByFilter$(this.searchForm.value,environment.enterprise_owner).pipe(
      tap(this.loadRegistries)
    ).subscribe();
  }

  private loadRegistries = (options: Results): void => {
    this.registryList = options[0];
  }

  public selectRegistry(id:number){
    this.select.emit(id);
  }

  public updateRegistry(registry: Enterprise){
    this.update.emit(registry);
  }

  public addActualPg(){
    this.actualPg = this.actualPg + 1;
    this.calculateRegs();
  }

  public delActualPg(){
    this.actualPg = this.actualPg - 1;
    this.calculateRegs();
  }

  public setRegPerPg(value: any){
    this.regPerPg = value;
    this.totalPgs = Math.ceil(this.registryList.number_results / this.regPerPg);
    this.calculateRegs();
  }

  private calculateRegs(){
    this.maxPerPg = (Number(this.actualPg) * Number(this.regPerPg)+ Number(this.regPerPg));
  }

  public crtRegistry(){
    this.create.emit(new Enterprise);
  }

}
