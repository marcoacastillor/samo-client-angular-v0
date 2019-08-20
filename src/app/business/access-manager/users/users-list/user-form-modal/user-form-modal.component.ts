import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/shared/models/user';
import { FormToolsService } from 'src/app/shared/services/form-tools.service';
import { Enterprise } from 'src/app/shared/models/enterprise';
import { Parameter } from 'src/app/shared/models/parameter';
import { Person } from 'src/app/shared/models/person';
import { Rol } from 'src/app/shared/models/rol';

@Component({
  selector: 'app-user-form-modal',
  templateUrl: 'user-form-modal.component.html',
  styles: []
})
export class UserFormModalComponent implements OnInit {
  userForm: FormGroup;
  faSave = faSave;

  @Input() public user: User;
  @Input() public lstRoles: Rol[];
  @Input() public lstPersons: Person[];
  @Input() public lstParameters: Parameter[];
  @Input() public lstEnterprise: Enterprise[];

  @Output() public create = new EventEmitter<User>();
  @Output() public update = new EventEmitter<User>();
  @Output() public getEmployees = new EventEmitter<number>();

  constructor(
    private fb: FormBuilder,
    private formToolService: FormToolsService,
  ) { }

  ngOnInit() {
    this.initUpdForm(this.user);
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if(changes.user)
    {
      if(changes.user.currentValue != changes.user.previousValue)
      {
        this.initUpdForm(changes.user.currentValue);
      }
    }
  }

  public getEmployeesByEnterprise(){
    this.getEmployees.emit(this.userForm.value.fk_id_enterprise);
  }

  public updateUser(){
    this.update.emit(this.userForm.value);
    this.userForm.reset();
  }

  public createUser(){
    this.create.emit(this.userForm.value);
    this.userForm.reset();
  }

  private initUpdForm(user:User) {
    this.userForm = this.fb.group({
      pk_id_user: [user.pk_id_user],
      fk_id_person: [user.fk_id_person,Validators.required],
      fk_id_enterprise: [user.fk_id_enterprise,Validators.required],
      fk_id_rol: [user.fk_id_rol,Validators.required],
      username: [user.username,Validators.required],
      email: [user.email,[Validators.required,Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      state_user: [user.state_user,Validators.required]
      });
  }
  
  public getErrors(controlName: string): any {
    return this.formToolService.getErrors(this.userForm, controlName);
  }

  public mustShowError(controlName: string) {
    return this.formToolService.mustShowError(this.userForm, controlName);
  }

  public hasError(controlName: string, errorCode: string): any {
    return this.formToolService.hasError(this.userForm, controlName, errorCode);
  }

}
