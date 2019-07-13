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

  @Input() public registryList: Enterprise[];
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
      }
    }
  }

  public searchRegistries(){
    this.enterpriseService.getByFilter$(this.searchForm.value,environment.enterprise_owner).pipe(
      tap(this.loadRegistries)
    ).subscribe();
  }

  private loadRegistries = (enterprises: Enterprise[]): void => {
    this.registryList = enterprises;
  }

  public selectRegistry(id:number){
    this.select.emit(id);
  }

  public updateRegistry(registry: Enterprise){
    this.update.emit(registry);
  }

  public crtRegistry(){
    this.create.emit(new Enterprise);
  }

}
