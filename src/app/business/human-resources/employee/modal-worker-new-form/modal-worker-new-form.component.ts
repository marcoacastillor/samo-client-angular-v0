import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WorkerNews } from 'src/app/shared/models/worker-news';
import { Parameter } from 'src/app/shared/models/parameter';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-worker-new-form',
  templateUrl: 'modal-worker-new-form.component.html',
  styles: []
})
export class ModalWorkerNewFormComponent implements OnInit {
  faSave = faSave;
  workerNewForm: FormGroup;

  type_worker_new   = environment.type_worker_new;

  @Input() public fk_id_enterprise_person: WorkerNews;
  @Input() public workerNewsParameterList: Parameter[];
  @Input() public selectedWorkerNew: WorkerNews;
  
  @Output() public create = new EventEmitter<WorkerNews>();
  @Output() public update = new EventEmitter<WorkerNews>();

  constructor(
    private fb: FormBuilder,
    private formToolService: FormToolsService,
    
  ) { }

  ngOnInit() {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.fk_id_enterprise_person)
    {
      if(changes.fk_id_enterprise_person.currentValue != changes.fk_id_enterprise_person.previousValue)
      {
        this.initForm();
      }
    }

    if(changes.selectedWorkerNew)
    {
      if(changes.selectedWorkerNew.currentValue != changes.selectedWorkerNew.previousValue)
      {
        this.selectedWorkerNew = changes.selectedWorkerNew.currentValue;
        this.initForm();
      }
    }
  }

  private initForm(){
    this.workerNewForm = this.fb.group({
      pk_id_worker_news: [this.selectedWorkerNew.pk_id_worker_news],
      fk_id_enterprise_person: [this.fk_id_enterprise_person,Validators.required],
      type_new: [this.selectedWorkerNew.type_new,Validators.required],
      description_new: [this.selectedWorkerNew.description_new,Validators.required],
      date_new: [],
      value_new: [this.selectedWorkerNew.value_new,Validators.required]
    })
  }

  createNorkerNew(){
    this.create.emit(this.workerNewForm.value);
  }

  updateNorkerNew(){
    this.update.emit(this.workerNewForm.value);
  }

  /**
  * Funciones para verificar si los formularios son obligatorios o no.
  */

  public getErrors(controlName: string): any {
    return this.formToolService.getErrors(this.workerNewForm, controlName);
  }

  public mustShowError(controlName: string) {
    return this.formToolService.mustShowError(this.workerNewForm, controlName);
  }

  public hasError(controlName: string, errorCode: string): any {
    return this.formToolService.hasError(this.workerNewForm, controlName, errorCode);
  }

}